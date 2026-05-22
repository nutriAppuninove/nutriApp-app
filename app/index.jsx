import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";

export default function Splash() {
  const router = useRouter();

  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineY = useRef(new Animated.Value(12)).current;
  const exitOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(taglineY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          Animated.timing(exitOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }).start(() => {
            router.replace("/home");
          });
        }, 1200);
      });
    });
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <Animated.View style={[styles.container, { opacity: exitOpacity }]}>
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />

        <Animated.View
          style={[
            styles.logoWrapper,
            { opacity: logoOpacity, transform: [{ scale: logoScale }] },
          ]}
        >
          {/* Icon */}
          <View style={styles.iconCircle}>
            <Text style={styles.iconEmoji}>🥗</Text>
          </View>

          <Text style={styles.appName}>NutriApp</Text>
        </Animated.View>

        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: taglineOpacity,
              transform: [{ translateY: taglineY }],
            },
          ]}
        >
          Seu guia de nutrição pessoal
        </Animated.Text>

        <Animated.Text
          style={[styles.aboutProject, { opacity: taglineOpacity }]}
        >
          Projeto sem fins lucrativos e acadêmico
        </Animated.Text>

        <Animated.Text style={[styles.version, { opacity: taglineOpacity }]}>
          v1.0
        </Animated.Text>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4f6f6a",
    alignItems: "center",
    justifyContent: "center",
  },

  circleTopRight: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#6f9188",
    opacity: 0.5,
  },
  circleBottomLeft: {
    position: "absolute",
    bottom: -80,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#3a5550",
    opacity: 0.5,
  },

  logoWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },

  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ffffffcc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },

  iconEmoji: {
    fontSize: 48,
  },

  appName: {
    fontSize: 42,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 1.5,
  },

  tagline: {
    fontSize: 15,
    color: "#c8dbd8",
    letterSpacing: 0.5,
    marginTop: 4,
  },

  version: {
    position: "absolute",
    bottom: 40,
    fontSize: 12,
    color: "#a0bbb8",
  },
  aboutProject: {
    color: "#a0bbb8",
    fontWeight: "900",
  },
});
