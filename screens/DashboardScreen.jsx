import { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Switch,
	FlatList,
	ActivityIndicator,
	StyleSheet,
} from "react-native";
import Navbar from "../components/NavBar";
import FraisCard from "../components/FraisCard";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/authService.js";

export default function DashboardScreen() {
	const { user, token } = useAuth();

	const [fraisList, setFraisList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterNonNull, setFilterNonNull] = useState(true);
	const [montantMin, setMontantMin] = useState("");

useEffect(() => {
	let active = true;

	async function fetchFrais() {
		if (!user?.id_visiteur || !token) {
			setLoading(false);
			return;
		}

		try {
			const response = await fetch(`${API_URL}frais/liste/${user.id_visiteur}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || `Erreur HTTP ${response.status}`);
			}

			const frais = Array.isArray(data) ? data : data.frais ?? data.data ?? [];
			if (active) setFraisList(frais);
		} catch (error) {
			console.error("Impossible de charger les notes de frais :", error);
		} finally {
			if (active) setLoading(false);
		}
	}

	fetchFrais();
	return () => {
		active = false;
	};
}, [user?.id_visiteur, token]);
	// Accepte "150,5" comme "150.5" ; champ vide ou invalide = pas de filtre
	const seuil = parseFloat(montantMin.replace(",", "."));

	const filteredFrais = fraisList
		.filter((f) => !filterNonNull || f.montantvalide !== null)
		.filter(
			(f) =>
				f.anneemois.includes(searchTerm) ||
				String(f.id_visiteur).includes(searchTerm)
		)
		.filter(
			(f) => isNaN(seuil) || (f.montantvalide !== null && f.montantvalide > seuil)
		);

	if (!user) return null;

	return (
		<View style={styles.screen}>
			<Navbar />
			{/*
				Question 14 : avantage d'ActivityIndicator par rapport à <Text>Chargement...</Text>
				- C'est un composant natif : il affiche le symbole de chargement d'Android ou d'iOS,
				  que l'utilisateur reconnaît tout de suite.
				- Il est animé : on voit que l'application travaille et n'est pas figée.
				- Il se personnalise avec les props size et color, et animating permet de le masquer.
				- Il est reconnu par les lecteurs d'écran (accessibilité) et n'a pas de texte à traduire.
			*/}
			{loading ? (
				<ActivityIndicator size="large" style={{ marginTop: 40 }} />
			) : (
				<View style={styles.content}>
					<TextInput
						placeholder="Rechercher par année-mois ou ID visiteur..."
						value={searchTerm}
						onChangeText={setSearchTerm}
						style={styles.searchInput}
					/>
					<View style={styles.filterRow}>
						<Switch value={filterNonNull} onValueChange={setFilterNonNull} />
						<Text style={styles.filterLabel}>
							Afficher seulement les frais avec un montant validé
						</Text>
					</View>
					<TextInput
						placeholder="Montant validé minimum (€)"
						value={montantMin}
						onChangeText={setMontantMin}
						keyboardType="numeric"
						style={styles.searchInput}
					/>
					{/*
						Question 7 : informations affichées sur la carte FraisCard
						Un écran de téléphone fait environ 360 points de large : les 8 informations
						ne tiennent pas sur une ligne, je les ai donc classées par priorité.
						- En priorité (titre) : année-mois, ID visiteur et ID de la note. Le mois est le
						  premier repère du visiteur, l'ID visiteur sert à la recherche, et l'ID de la note
						  permet de citer une note précise.
						- Mis en avant (gras, vert) : montant validé, car c'est ce qui sera remboursé.
						  S'il vaut null, on affiche « non validé ».
						- Normal : nombre de justificatifs et montant saisi. Ils expliquent le montant
						  validé et permettent de le comparer à ce qui a été demandé.
						- Second plan (petit, gris) : date de modification, utile mais secondaire.
						- Masqué : ID état, identifiant technique sans sens pour le visiteur
						  (un libellé comme « Validée » serait préférable).
					*/}
					<FlatList
						data={filteredFrais}
						keyExtractor={(item) => item.id_frais.toString()}
						renderItem={({ item }) => <FraisCard frais={item} />}
						ListEmptyComponent={
							<Text style={styles.empty}>Aucune note de frais trouvée</Text>
						}
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#F4F5F9",
	},
	content: {
		flex: 1,
		padding: 16,
	},
	searchInput: {
		backgroundColor: "#FFFFFF",
		borderColor: "#D5D8DE",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
		marginBottom: 12,
	},
	filterRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 12,
	},
	filterLabel: {
		flex: 1,
		fontSize: 14,
		color: "#333333",
	},
	empty: {
		textAlign: "center",
		color: "#5B6270",
		marginTop: 24,
	},
});
