import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  inputFlex: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
  },

  header: {
    paddingTop: 40,
    paddingBottom: 8,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  topSection: {
    backgroundColor: "#4f6f6a",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 50,
    justifyContent: "center",
  },

  topText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  card: {
    marginHorizontal: 16,
    marginTop: -28,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  label: {
    color: "#555",
    marginBottom: 4,
    marginTop: 6,
    fontSize: 12,
  },

  input: {
    backgroundColor: "#0000",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    borderWidth: 1,
    borderColor: "#e2e2e2",
  },

  button: {
    backgroundColor: "#2d8a4e",
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 14,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  linkText: {
    color: "#3d5a4e",
    textAlign: "center",
    marginTop: 12,
    fontSize: 13,
  },

  erro: {
    color: "#c0392b",
    marginTop: 8,
    fontSize: 13,
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  col: {
    flex: 1,
  },
});
