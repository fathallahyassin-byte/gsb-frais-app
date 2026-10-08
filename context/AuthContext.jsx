import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn } from "../services/authService.js";
// 1. Création du contexte
const AuthContext = createContext();
// 2. Fournisseur du contexte (AuthProvider)
export function AuthProvider({ children }) {
const [token, setToken] = useState(null);
const [sessionLoading, setSessionLoading] = useState(true);
// État local pour stocker l’utilisateur (null = non connecté)
const [user, setUser] = useState(null);

async function restoreSession() {
try {
const storedUser = await AsyncStorage.getItem("user");
const storedToken = await AsyncStorage.getItem("token");
if (storedUser && storedToken) {
setUser(JSON.parse(storedUser));
setToken(storedToken);
}
} catch {
setUser(null);
setToken(null);
} finally {
setSessionLoading(false);
}
}

useEffect(() => {
restoreSession();
}, []);

// 3. Fonction de connexion
async function loginUser(login, password){
const data = await signIn(login, password);
setUser(data.visiteur);
setToken(data.token);
return data;
};
// 4. Fonction de déconnexion
const logoutUser = async () => {
// ToDo : réinitialiser la valeur de l’état à null
setUser(null);
setToken(null);
await AsyncStorage.multiRemove(["user", "token"]);
};
// 5. Valeurs exposées aux composants enfants et rendu des composants enfants avec {children}
return (
<AuthContext.Provider value={{ user, token, sessionLoading, loginUser, logoutUser}}>
{children}
</AuthContext.Provider>
);
}
// 6. Hook personnalisé pour utiliser le contexte facilement
export function useAuth() {
return useContext(AuthContext);
}