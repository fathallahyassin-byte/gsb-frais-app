import { View, Text, Pressable, StyleSheet } from "react-native";

// Une ligne de la liste : affichage seulement, les actions remontent à l'écran
export default function FraisHorsForfaitCard({ fraisHorsForfait, onEdit, onDelete }) {
    // L'API renvoie le montant sous forme de texte ("48.50")
    const montant = parseFloat(fraisHorsForfait.montant_fraishorsforfait).toFixed(2);

    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.libelle}>{fraisHorsForfait.lib_fraishorsforfait}</Text>
                <Text style={styles.montant}>{montant} €</Text>
            </View>
            <Text style={styles.date}>Le {fraisHorsForfait.date_fraishorsforfait}</Text>

            <View style={styles.actions}>
                <Pressable onPress={() => onEdit(fraisHorsForfait.id_fraishorsforfait)} style={styles.editButton}>
                    <Text style={styles.editText}>Modifier</Text>
                </Pressable>
                <Pressable onPress={() => onDelete(fraisHorsForfait.id_fraishorsforfait)} style={styles.deleteButton}>
                    <Text style={styles.deleteText}>Supprimer</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 14,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        marginBottom: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    libelle: {
        flex: 1,
        fontSize: 16,
        fontWeight: "600",
        color: "#161B33",
    },
    montant: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0E8C7C",
    },
    date: {
        fontSize: 13,
        color: "#5B6270",
        marginTop: 4,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 8,
        marginTop: 10,
    },
    editButton: {
        borderWidth: 1,
        borderColor: "#5B6270",
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    editText: {
        color: "#161B33",
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: "#D9534F",
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    deleteText: {
        color: "#D9534F",
    },
});
