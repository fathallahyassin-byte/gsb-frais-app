import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    View,
    Text,
    FlatList,
    Pressable,
    ActivityIndicator,
    Alert,
    Platform,
    StyleSheet,
} from "react-native";
import Navbar from "../components/NavBar";
import FraisHorsForfaitCard from "../components/FraisHorsForfaitCard";
import { useAuth } from "../context/AuthContext";
import { getFraisHorsForfaitList, deleteFraisHorsForfait } from "../services/fraisService";

// Liste des frais hors forfait d'une note de frais, avec le total
export default function FraisHorsForfaitScreen({ navigation, route }) {
    const { id } = route.params; // id de la note de frais
    const { token } = useAuth();
    const [fraisHorsForfaitList, setFraisHorsForfaitList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchFraisHorsForfaitList = useCallback(async () => {
        try {
            const data = await getFraisHorsForfaitList(id, token);
            setFraisHorsForfaitList(Array.isArray(data) ? data : []);
            setError("");
        } catch (err) {
            console.error("Erreur lors de la récupération des frais hors forfait :", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [id, token]);

    // Rechargé à chaque retour sur l'écran (après un ajout ou une modification)
    useFocusEffect(
        useCallback(() => {
            fetchFraisHorsForfaitList();
        }, [fetchFraisHorsForfaitList])
    );

    // Le total se déduit de la liste à chaque rendu
    let total = 0;
    fraisHorsForfaitList.forEach((f) => {
        total += parseFloat(f.montant_fraishorsforfait);
    });

    function handleEdit(idFraisHF) {
        navigation.navigate("FraisHorsForfaitEdit", { id: idFraisHF });
    }

    // Nom différent de deleteFraisHorsForfait, la fonction importée du service
    async function removeFraisHorsForfait(idFraisHF) {
        try {
            await deleteFraisHorsForfait(idFraisHF, token);
            setFraisHorsForfaitList((prev) => prev.filter((f) => f.id_fraishorsforfait !== idFraisHF));
        } catch (err) {
            if (Platform.OS === "web") window.alert(`Erreur lors de la suppression : ${err.message}`);
            else Alert.alert("Erreur lors de la suppression :", err.message);
        }
    }

    const handleDelete = (idFraisHF) => {
        const message = "Êtes-vous sûr de vouloir supprimer ce frais hors forfait ?";
        // Alert.alert n'affiche pas de boutons dans l'aperçu web : on y utilise window.confirm
        if (Platform.OS === "web") {
            if (window.confirm(message)) removeFraisHorsForfait(idFraisHF);
            return;
        }
        Alert.alert("Confirmation", message, [
            { text: "Annuler", style: "cancel" },
            { text: "Supprimer", style: "destructive", onPress: () => removeFraisHorsForfait(idFraisHF) },
        ]);
    };

    return (
        <View style={styles.screen}>
            <Navbar />
            <View style={styles.content}>
                <Text style={styles.title}>Frais hors forfait de la note n°{id}</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                {loading ? (
                    <ActivityIndicator size="large" style={{ marginTop: 40 }} />
                ) : (
                    <FlatList
                        data={fraisHorsForfaitList}
                        keyExtractor={(item) => item.id_fraishorsforfait.toString()}
                        renderItem={({ item }) => (
                            <FraisHorsForfaitCard
                                fraisHorsForfait={item}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        )}
                        ListEmptyComponent={
                            <Text style={styles.empty}>Aucun frais hors forfait pour cette note</Text>
                        }
                        ListFooterComponent={
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>Total hors forfait</Text>
                                <Text style={styles.totalValue}>{total.toFixed(2)} €</Text>
                            </View>
                        }
                    />
                )}
                <View style={styles.buttons}>
                    <Pressable
                        style={[styles.button, styles.addButton]}
                        onPress={() => navigation.navigate("FraisHorsForfaitAdd", { id })}
                    >
                        <Text style={styles.buttonText}>Ajouter</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Retour</Text>
                    </Pressable>
                </View>
            </View>
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
    title: {
        color: "#161B33",
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 16,
        textAlign: "center",
    },
    error: {
        color: "red",
        marginBottom: 12,
    },
    empty: {
        textAlign: "center",
        color: "#5B6270",
        marginVertical: 24,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#D5D8DE",
        paddingTop: 12,
        marginTop: 4,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#161B33",
    },
    totalValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0E8C7C",
    },
    buttons: {
        flexDirection: "row",
        gap: 10,
        marginTop: 16,
    },
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5B6270",
        borderRadius: 6,
        height: 44,
    },
    addButton: {
        backgroundColor: "#333",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
