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
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/NavBar";
import FraisCard from "../components/FraisCard";
import fraisData from "../data/frais.json";
import { useAuth } from "../context/AuthContext";

export default function DashboardScreen() {
	const { user } = useAuth();
	const navigation = useNavigation();

	const [fraisList, setFraisList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterNonNull, setFilterNonNull] = useState(true);
	const [montantMin, setMontantMin] = useState("");

	useEffect(() => {
		if (!user) {
			navigation.replace("Login");
		}
	}, [user, navigation]);

	useEffect(() => {
		// Simulation d'un appel API avec un délai de 500 ms
		const timer = setTimeout(() => {
			setFraisList(fraisData);
			setLoading(false);
		}, 500);
		// Annule le timer si l'écran est quitté avant la fin du chargement
		return () => clearTimeout(timer);
	}, []);

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
