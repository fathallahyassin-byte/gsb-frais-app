import { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import Navbar from "../components/NavBar";
import FraisForm from "../components/FraisForm";

// Récupère la note de frais à modifier puis la transmet à FraisForm
export default function FraisEditScreen() {
    const route = useRoute();
    const { id } = route.params; // id passé en paramètre de navigate()
    const [frais, setFrais] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFrais = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const response = await fetch(`${API_URL}frais/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!response.ok) {
                    const data = await response.json().catch(() => ({}));
                    throw new Error(data.error || `Erreur HTTP ${response.status}`);
                }
                setFrais(await response.json());
            } catch (error) {
                console.error("Erreur:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFrais();
    }, [id]);

    return (
        <ScrollView style={styles.screen}>
            <Navbar />
            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 40 }} />
            ) : !frais ? (
                <Text style={styles.notFound}>Frais non trouvé</Text>
            ) : (
                <FraisForm frais={frais} />
            )}
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
