import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginStyles as styles } from "../styles/loginStyles.js";

export default function LoginScreen() {
    // 1. États locaux pour les champs du formulaire
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { loginUser } = useAuth();

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const data = await loginUser(login, password);
            if (!data?.visiteur || !data?.token) {
                Alert.alert("Connexion échouée", data?.message || "Vérifiez votre login et votre mot de passe.");
                return;
            }
        } catch (error) {
            Alert.alert("Connexion impossible", error.message || "Vérifiez votre connexion et réessayez.");
        } finally {
            setSubmitting(false);
        }
    };
    // 2. Rend le formulaire
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Login :</Text>
                <TextInput
                    value={login}
                    onChangeText={setLogin}
                    autoCapitalize="none"
                    style={styles.input}
                />
                <Text style={styles.label}>Mot de passe :</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
            </View>
            <Pressable onPress={handleSubmit} style={styles.button} disabled={submitting}>
                <Text style={styles.buttonText}>{submitting ? "Connexion..." : "Se connecter"}</Text>
            </Pressable>
        </View>
    );
}
