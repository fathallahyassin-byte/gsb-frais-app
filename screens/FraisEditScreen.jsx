import { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import Navbar from "../components/NavBar";
import FraisForm from "../components/FraisForm";
import { useAuth } from "../context/AuthContext";
import { getFrais, updateFrais } from "../services/fraisService";

// Charge la note de frais à modifier puis fournit handleUpdate au formulaire
export default function FraisEditScreen({ navigation, route }) {
    const { id } = route.params; // id passé en paramètre de navigate()
    const { token } = useAuth();
    const [frais, setFrais] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Récupération du frais à modifier
    useEffect(() => {
        const fetchFrais = async () => {
            try {
                setFrais(await getFrais(id, token));
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFrais();
    }, [id, token]);

    // Appelée par FraisForm avec les valeurs saisies : on les fusionne
    // avec les champs non modifiables du frais d'origine
    async function handleUpdate(values) {
        await updateFrais(
            {
                id_frais: frais.id_frais,
                id_visiteur: frais.id_visiteur,
                id_etat: frais.id_etat, // Conserver l'état actuel
                montantvalide: frais.montantvalide,
                ...values,
            },
            token
        );
        navigation.navigate("Dashboard");
    }

    let content;
    if (loading) {
        content = <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
    } else if (!frais) {
        content = <Text style={styles.notFound}>{error || "Frais non trouvé"}</Text>;
    } else {
        content = <FraisForm frais={frais} onSubmit={handleUpdate} />;
    }

    return (
        <ScrollView style={styles.screen}>
            <Navbar />
            {content}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F4F5F9",
    },
    notFound: {
        textAlign: "center",
        marginTop: 40,
    },
});
