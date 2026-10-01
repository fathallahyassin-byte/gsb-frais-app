import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import loginStyles from "../styles/loginStyles";

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
        <View style={loginStyles.container}>
            <Text style={loginStyles.title}>Connexion</Text>
            <View style={loginStyles.form}>
                <Text style={loginStyles.label}>Login :</Text>
                <TextInput
                    value={login}
                    onChangeText={setLogin}
                    autoCapitalize="none"
                    style={loginStyles.input}
                />
                <Text style={loginStyles.label}>Mot de passe :</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={loginStyles.input}
                />
            </View>
            <Pressable onPress={handleSubmit} style={loginStyles.button}>
                <Text style={loginStyles.buttonText}>Se connecter</Text>
            </Pressable>
        </View>
    );
}
