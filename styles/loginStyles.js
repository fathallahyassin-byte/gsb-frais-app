import { StyleSheet } from "react-native";
const loginStyles = StyleSheet.create({
 container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    title: {
        color: "#3a3a3a",
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
    },
    form: {
        marginBottom: 10,
    },
    label: {
        color: "#333",
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#fff",
        borderColor: "#d5d5d5",
        borderRadius: 4,
        borderWidth: 1,
        fontSize: 16,
        height: 44,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#333",
        borderRadius: 5,
        height: 44,
        justifyContent: "center",
        marginTop: 4,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default loginStyles;