import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import navbarStyles from "../styles/navbarStyles";

function Navbar() {
    const navigation = useNavigation();
    const { user, logoutUser } = useAuth();

    const handleAuthPress = () => {
        if (user) {
            logoutUser();
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
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
                    <Pressable onPress={() => navigation.navigate("Dashboard")}>
                        <Text style={navbarStyles.link}>Tableau de bord</Text>
                    </Pressable>
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