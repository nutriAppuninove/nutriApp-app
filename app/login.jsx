import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";
import { styles } from "./style/auth.style";
import { Ionicons } from "@expo/vector-icons";

const VALID_DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [showSenha, setShowSenha] = useState(false);

  const [emailErro, setEmailErro] = useState(null);

  useEffect(() => {
    if (!email) {
      setEmailErro(null);
      return;
    }

    const parts = email.trim().split("@");
    if (parts.length !== 2 || !parts[1]) {
      setEmailErro(null);
      return;
    }

    const domain = parts[1].toLowerCase();
    if (!VALID_DOMAINS.includes(domain)) {
      setEmailErro("Domínio de email inválido");
    } else {
      setEmailErro(null);
    }
  }, [email]);

  const handleLogin = async () => {
    setErro(null);
    setLoading(true);
    try {
      if (emailErro || !email) {
        setErro("Informe um email válido");
        return;
      }
      await login(email.trim(), senha);
      router.replace("/home");
    } catch (e) {
      setErro(e.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Entrar</Text>
          </View>

          <View style={styles.topSection}>
            <Text style={styles.topText}>
              Bem-vindo de volta! Acesse sua conta para acompanhar suas
              análises.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, emailErro && { borderColor: "#ef4444" }]}
              placeholder="seu@email.com"
              placeholderTextColor="#000000"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
            {emailErro && <Text style={styles.erro}>{emailErro}</Text>}

            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputFlex}
                placeholder="••••••••"
                placeholderTextColor="#000000"
                secureTextEntry={!showSenha}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity
                onPress={() => setShowSenha(!showSenha)}
                style={{ padding: 4 }}
              >
                <Ionicons
                  name={showSenha ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>

            {erro && <Text style={styles.erro}>{erro}</Text>}

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace("/register")}>
              <Text style={styles.linkText}>
                Não tem conta? Criar uma agora
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace("/home")}>
              <Text style={styles.linkText}>Voltar para Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
