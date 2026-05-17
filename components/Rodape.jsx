import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { styles } from "../app/style/rodape.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Rodape() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const isActive = (route) => pathname === route;

  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
      {/* Início */}
      <TouchableOpacity
        style={styles.tabItem}
        activeOpacity={0.7}
        onPress={() => router.push("/home")}
      >
        <Ionicons
          name={isActive("/home") ? "home" : "home-outline"}
          size={22}
          color={isActive("/home") ? "#00ffcc" : "#fff"}
        />
        <Text style={[styles.tabText, isActive("/home") && styles.activeText]}>
          Início
        </Text>
      </TouchableOpacity>

      {/* Histórico */}
      <TouchableOpacity
        style={styles.tabItem}
        activeOpacity={0.7}
        onPress={() => router.push("/historico")}
      >
        <Ionicons
          name={isActive("/historico") ? "time" : "time-outline"}
          size={22}
          color={isActive("/historico") ? "#00ffcc" : "#fff"}
        />
        <Text
          style={[styles.tabText, isActive("/historico") && styles.activeText]}
        >
          Histórico
        </Text>
      </TouchableOpacity>

      {/* Perfil */}
      <TouchableOpacity
        style={styles.tabItem}
        activeOpacity={0.7}
        onPress={() => router.push("/perfil")}
      >
        <Ionicons
          name={isActive("/perfil") ? "person" : "person-outline"}
          size={22}
          color={isActive("/perfil") ? "#00ffcc" : "#fff"}
        />
        <Text
          style={[styles.tabText, isActive("/perfil") && styles.activeText]}
        >
          Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
}
