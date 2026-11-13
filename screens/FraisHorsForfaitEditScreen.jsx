import { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import Navbar from "../components/NavBar";
import FraisHorsForfaitForm from "../components/FraisHorsForfaitForm";
import { useAuth } from "../context/AuthContext";
import { getFraisHorsForfait, updateFraisHorsForfait } from "../services/fraisService";

// Charge le frais hors forfait à modifier puis fournit handleUpdate au formulaire
export default function FraisHorsForfaitEditScreen({ navigation, route }) {
    const { id } = route.params; // id du frais hors forfait
    const { token } = useAuth();
    const [fraisHorsForfait, setFraisHorsForfait] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFraisHorsForfait = async () => {
            try {
                setFraisHorsForfait(await getFraisHorsForfait(id, token));
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFraisHorsForfait();
    }, [id, token]);

    // L'API attend id_fraisHF en plus des valeurs saisies
    async function handleUpdate(values) {
        await updateFraisHorsForfait({ id_fraisHF: id, ...values }, token);
        navigation.goBack();
    }

    let content;
    if (loading) {
        content = <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
    } else if (!fraisHorsForfait) {
        content = <Text style={styles.notFound}>{error || "Frais hors forfait non trouvé"}</Text>;
    } else {
        content = <FraisHorsForfaitForm fraisHorsForfait={fraisHorsForfait} onSubmit={handleUpdate} />;
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
