import { StyleSheet } from "react-native";

const navbarStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#333",
    },
    group: {
        flexDirection: "row",
        gap: 16,
    },
    link: {
        color: "white",
    },
});

export default navbarStyles;