import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { fraisFormStyles as styles } from "../styles/fraisFormStyles.js";

// Formulaire partagé ajout / modification d'un frais hors forfait :
// il remonte les valeurs à l'écran via onSubmit, sans appel à l'API
export default function FraisHorsForfaitForm({ fraisHorsForfait = null, onSubmit }) {
    const [date, setDate] = useState("");
    const [libelle, setLibelle] = useState("");
    const [montant, setMontant] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // En modification, on préremplit avec le frais reçu (les noms de l'API diffèrent des états)
    useEffect(() => {
        if (fraisHorsForfait) {
            setDate(fraisHorsForfait.date_fraishorsforfait || "");
            setLibelle(fraisHorsForfait.lib_fraishorsforfait || "");
            setMontant(String(fraisHorsForfait.montant_fraishorsforfait ?? ""));
        }
    }, [fraisHorsForfait]);

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        try {
            await onSubmit({
                date,
                libelle,
                // Le clavier français propose la virgule : "48,50" donnerait NaN
                montant: parseFloat(montant.replace(",", ".")),
            });
        } catch (err) {
            console.error("Erreur:", err);
            setError(err.message || "Erreur lors de l'enregistrement");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {fraisHorsForfait ? "Modifier le frais hors forfait" : "Ajouter un frais hors forfait"}
            </Text>

            <View>
                <Text style={styles.label}>Date :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="AAAA-MM-JJ"
                    value={date}
                    onChangeText={setDate}
                />
            </View>

            <View>
                <Text style={styles.label}>Libellé :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex : repas client"
                    value={libelle}
                    onChangeText={setLibelle}
                />
            </View>

            <View>
                <Text style={styles.label}>Montant (€) :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex : 48,50"
                    keyboardType="decimal-pad"
                    value={montant}
                    onChangeText={setMontant}
                />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Enregistrement..." : fraisHorsForfait ? "Mettre à jour" : "Ajouter"}
                </Text>
            </Pressable>
        </View>
    );
}
