import { StyleSheet } from "react-native";

const navbarStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 8,
        padding: 16,
        backgroundColor: "#333",
    },
    group: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        rowGap: 8,
    },
    link: {
        color: "white",
    },
});

export default navbarStyles;
