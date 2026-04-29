import { Slot, usePathname } from "expo-router";
import { View, StyleSheet } from "react-native";
import Rodape from "../components/Rodape";
import { AuthProvider } from "./context/AuthContext";

const HIDE_RODAPE_PATHS = ["/", "/login", "/register"];

export default function Layout() {
  const pathname = usePathname();
  const hideRodape = HIDE_RODAPE_PATHS.includes(pathname);

  return (
    <AuthProvider>
      <View style={styles.container}>
        <View style={styles.content}>
          <Slot />
        </View>
        {!hideRodape && <Rodape />}
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
  },
});
