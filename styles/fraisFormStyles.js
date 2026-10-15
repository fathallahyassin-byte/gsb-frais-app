import { StyleSheet } from "react-native";

export const fraisFormStyles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        color: "#161B33",
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        color: "#333",
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#fff",
        borderColor: "#d5d5d5",
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 16,
        height: 44,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    smallButtonRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 12,
    },
    smallbutton: {
        alignItems: "center",
        backgroundColor: "#5B6270",
        borderRadius: 6,
        flex: 1,
        justifyContent: "center",
        paddingVertical: 10,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#333",
        borderRadius: 6,
        height: 44,
        justifyContent: "center",
        marginTop: 4,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    error: {
        color: "red",
        marginBottom: 8,
        textAlign: "center",
    },
});

export default fraisFormStyles;
