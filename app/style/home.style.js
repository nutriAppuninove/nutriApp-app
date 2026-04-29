import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  headerUser: {
    fontSize: 12,
    color: "#555",
    maxWidth: 110,
  },

  headerLink: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  headerLinkPrimary: {
    backgroundColor: "#2d8a4e",
  },

  headerLinkText: {
    color: "#3d5a4e",
    fontSize: 13,
    fontWeight: "500",
  },

  headerLinkTextPrimary: {
    color: "#fff",
  },

  topSection: {
    backgroundColor: "#4f6f6a",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
    justifyContent: "center",
  },

  topText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  card: {
    backgroundColor: "#6f9188",
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 14,
    marginTop: 5,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  col: {
    flex: 1,
  },

  label: {
    color: "#eaeaea",
    marginBottom: 2,
    fontSize: 11,
  },

  input: {
    backgroundColor: "#ffffffcc",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 8,
    fontSize: 13,
  },

  button: {
    backgroundColor: "#2d8a4e",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  resultado: {
    textAlign: "center",
    marginTop: 12,
    color: "#555",
    paddingHorizontal: 16,
  },

  resultadoBox: {
    marginTop: 14,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  resultadoTitulo: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3d5a4e",
    marginBottom: 6,
    textAlign: "center",
  },

  resultadoLinha: {
    fontSize: 13,
    color: "#444",
    marginVertical: 1,
    textAlign: "center",
  },

  resultadoValor: {
    fontWeight: "700",
    color: "#2d8a4e",
  },
});
