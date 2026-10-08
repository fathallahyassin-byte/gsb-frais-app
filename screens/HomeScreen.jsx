import { View, Text } from "react-native";
import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
    const { user } = useAuth();

    return (
        <View>
            <Navbar />
            <Text>Bonjour {user?.prenom_visiteur} !</Text>
        </View>
    );
}
