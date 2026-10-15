import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";

export async function signIn(login, pwd) {
    const response = await fetch(`${API_URL}visiteur/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, pwd }),
    });

    let data;
    try {
        data = await response.json();
    } catch {
        throw new Error("L’API a renvoyé une réponse illisible.");
    }

    if (!response.ok) {
        throw new Error(data.error || `Erreur de connexion (${response.status}).`);
    }

    const token = data.token ?? data.access_token;
    if (!data.visiteur || !token) {
        throw new Error(`Réponse d’authentification incomplète (champs reçus : ${Object.keys(data).join(", ")}).`);
    }

    await AsyncStorage.setItem("user", JSON.stringify(data.visiteur));
    await AsyncStorage.setItem("token", token);
    return { ...data, token };
}