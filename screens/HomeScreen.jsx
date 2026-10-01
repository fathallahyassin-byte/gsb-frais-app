import { View, Text } from "react-native";
import Navbar from "../components/NavBar";

export default function HomeScreen() {
    return (
        <View>
            <Navbar />
            <Text>Bienvenue</Text>
        </View>
    );
}
