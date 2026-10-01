import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/NavBar";

export default function HomeScreen({ navigation }) {
    return (
        <View>
            <Navbar />
            <Text>Bienvenue</Text>
        </View>
    );
}