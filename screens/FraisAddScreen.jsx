import { ScrollView, StyleSheet } from "react-native";
import Navbar from "../components/NavBar";
import FraisForm from "../components/FraisForm";
import { useAuth } from "../context/AuthContext";
import { addFrais } from "../services/fraisService";

export default function FraisAddScreen({ navigation }) {
    const { user, token } = useAuth();

    // Appelée par FraisForm avec les valeurs saisies.
    // En cas d'erreur, l'exception remonte au formulaire qui l'affiche.
    async function handleAdd(values) {
        await addFrais({ ...values, id_visiteur: user.id_visiteur }, token);
        navigation.navigate("Dashboard");
    }

    return (
        <ScrollView style={styles.screen}>
            <Navbar />
            <FraisForm onSubmit={handleAdd} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F4F5F9",
    },
});
