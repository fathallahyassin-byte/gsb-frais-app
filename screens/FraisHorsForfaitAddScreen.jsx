import { ScrollView, StyleSheet } from "react-native";
import Navbar from "../components/NavBar";
import FraisHorsForfaitForm from "../components/FraisHorsForfaitForm";
import { useAuth } from "../context/AuthContext";
import { addFraisHorsForfait } from "../services/fraisService";

export default function FraisHorsForfaitAddScreen({ navigation, route }) {
    const { id } = route.params; // id de la note de frais
    const { token } = useAuth();

    // Appelée par le formulaire. En cas d'erreur, l'exception remonte au formulaire qui l'affiche.
    async function handleAdd(values) {
        await addFraisHorsForfait({ ...values, id_frais: id }, token);
        navigation.goBack();
    }

    return (
        <ScrollView style={styles.screen}>
            <Navbar />
            <FraisHorsForfaitForm onSubmit={handleAdd} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F4F5F9",
    },
});
