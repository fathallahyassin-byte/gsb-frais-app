import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

export default function DashboardScreen() {
	const { user } = useAuth();
	const navigation = useNavigation();

	useEffect(() => {
		if (!user) {
			navigation.replace("Login");
		}
	}, [user, navigation]);

	return (
		<View>
			<Navbar />
			<Text>Tableau de bord de {user}</Text>
		</View>
	);
}
