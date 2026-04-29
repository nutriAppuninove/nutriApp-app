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
    flex: 1,
    textAlign: "center",
  },

  logoutBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    position: "absolute",
    right: 16,
    top: 38,
  },

  logoutText: {
    color: "#c0392b",
    fontSize: 13,
    fontWeight: "500",
  },

  guestBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  guestEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },

  guestTitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3d5a4e",
    marginBottom: 8,
    textAlign: "center",
  },

  guestTexto: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 18,
  },

  guestBtnPrimary: {
    backgroundColor: "#2d8a4e",
    paddingVertical: 11,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignSelf: "stretch",
    alignItems: "center",
    marginBottom: 8,
  },

  guestBtnPrimaryText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  guestBtnSecondary: {
    paddingVertical: 11,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignSelf: "stretch",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3d5a4e",
  },

  guestBtnSecondaryText: {
    color: "#3d5a4e",
    fontWeight: "600",
    fontSize: 14,
  },

  topSection: {
    backgroundColor: "#4f6f6a",
    paddingTop: 16,
    paddingBottom: 50,
    alignItems: "center",
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#6f9188",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },

  avatarText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 0,
    paddingBottom: 24,
  },

  card: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  cardTitulo: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3d5a4e",
    marginBottom: 10,
  },

  label: {
    fontSize: 11,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  valor: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },

  linhaDupla: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },

  colDupla: {
    flex: 1,
  },

  semDados: {
    color: "#777",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 4,
  },
});
