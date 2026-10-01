import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import loginStyles from "../styles/loginStyles";

export default function LoginScreen() {
// 1. États locaux pour les champs du formulaire
const [login, setLogin] = useState("");
const [password, setPassword] = useState("")
const { user, loginUser, logoutUser } = useAuth();
const navigation = useNavigation();
const handleSubmit = async () => {
    try {
        const isAuthenticated = await loginUser(login, password);
        if (isAuthenticated) {
            navigation.navigate("Dashboard");
            return;
        }

        Alert.alert("Erreur", "Identifiants/MDP incorrects");
    } catch (error) {
        Alert.alert("Erreur", "Identifiants/MDP incorrects");
    }
};

// 5. Rend le formulaire
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
</View>
<Text style={loginStyles.label}>Mot de passe :</Text>
<TextInput
value={password}
onChangeText={setPassword}
secureTextEntry
style={loginStyles.input}
/>
<Pressable onPress={handleSubmit} style={loginStyles.button}>
<Text style={loginStyles.buttonText}>Se connecter</Text>
</Pressable>
</View>
);
}

    