import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    backgroundColor: "#3d5a4e",
    minHeight: Platform.OS === "ios" ? 85 : 65,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",

    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.2)",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "500",
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
