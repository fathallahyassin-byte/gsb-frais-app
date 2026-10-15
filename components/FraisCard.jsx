import { View, Text, Pressable, StyleSheet } from "react-native";

// La carte ne fait qu'afficher : les actions sont fournies par le parent Dashboard
export default function FraisCard({ frais, onEdit, onDelete }) {
    const montantValide =
        frais.montantvalide !== null ? `${frais.montantvalide} €` : "non validé";

    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                Note [{frais.id_frais}] Visiteur n°{frais.id_visiteur} - {frais.anneemois}
            </Text>
            <Text style={styles.meta}>Nombre de justificatifs : {frais.nbjustificatifs}</Text>
            <Text style={styles.montant}>Montant validé : {montantValide}</Text>
            <Text style={styles.meta}>Montant saisi : — €</Text>
            {frais.lib_etat ? <Text style={styles.meta}>État : {frais.lib_etat}</Text> : null}
            <Text style={styles.secondary}>Modifiée le {frais.datemodification}</Text>

            <View style={styles.actions}>
                <Pressable onPress={() => onEdit(frais.id_frais)} style={styles.editButton}>
                    <Text style={styles.editText}>Modifier</Text>
                </Pressable>
                <Pressable onPress={() => onDelete(frais.id_frais)} style={styles.deleteButton}>
                    <Text style={styles.deleteText}>Supprimer</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        marginBottom: 12,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#161B33",
    },
    meta: {
        fontSize: 14,
        color: "#5B6270",
        marginTop: 4,
    },
    montant: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#0E8C7C",
        marginTop: 4,
    },
    secondary: {
        fontSize: 12,
        color: "#9AA0AA",
        marginTop: 6,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 8,
        marginTop: 12,
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
