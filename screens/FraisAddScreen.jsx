import { ScrollView, StyleSheet } from "react-native";
import Navbar from "../components/NavBar";
import FraisForm from "../components/FraisForm";

export default function FraisAddScreen() {
    return (
        <ScrollView style={styles.screen}>
            <Navbar />
            <FraisForm />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F4F5F9",
    },
});
