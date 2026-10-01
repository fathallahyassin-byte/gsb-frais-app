import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { loginStyles as styles } from "../styles/loginStyles.js";

export default function LoginScreen() {
    // 1. États locaux pour les champs du formulaire
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useAuth();
    const navigation = useNavigation();

    const handleSubmit = () => {
        if (loginUser(login, password)) {
            navigation.navigate("Dashboard");
            return;
        }

        Alert.alert("Erreur", "Identifiants/MDP incorrects");
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
            <Pressable onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </Pressable>
        </View>
    );
}
