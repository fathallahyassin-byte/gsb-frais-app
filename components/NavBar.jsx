import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import navbarStyles from "../styles/navbarStyles";

function Navbar() {
    const navigation = useNavigation();
    const { user, logoutUser } = useAuth();

    const handleAuthPress = () => {
        // À la déconnexion, AppNavigator passe sur le groupe "invite" et affiche Home
        if (user) {
            logoutUser();
            return;
        }

        navigation.navigate("Login");
    };

    return (
        <View style={navbarStyles.container}>
            <View style={navbarStyles.group}>
                <Pressable onPress={() => navigation.navigate("Home")}>
                    <Text style={navbarStyles.link}>Accueil</Text>
                </Pressable>
                {user && (
                    <>
                        <Pressable onPress={() => navigation.navigate("Dashboard")}>
                            <Text style={navbarStyles.link}>Tableau de bord</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate("FraisAdd")}>
                            <Text style={navbarStyles.link}>Proposer un frais</Text>
                        </Pressable>
                    </>
                )}
            </View>
            <View style={navbarStyles.group}>
                <Pressable onPress={handleAuthPress}>
                    <Text style={navbarStyles.link}>
                        {user ? "Déconnexion" : "Connexion"}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
export default Navbar;