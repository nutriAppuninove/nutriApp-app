import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";
import { styles } from "./style/auth.style";

const VALID_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
];

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    idade: "",
    pesoAlvo: "",
    pesoAtual: "",
  });
  const [inputErros, setInputErros] = useState({});
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const validarCampo = (campo, valor) => {
    if (!valor || !valor.trim()) return "Campo obrigatório";

    if (campo === "nome") {
      if (valor.trim().length < 2) return "Nome muito curto";
      return null;
    }

    if (campo === "email") {
      const parts = valor.trim().split("@");
      if (parts.length !== 2 || !parts[1]) return "Email inválido";
      const domain = parts[1].toLowerCase();
      if (!VALID_DOMAINS.includes(domain)) return "Domínio de email inválido";
      return null;
    }

    if (campo === "senha") {
      if (valor.length < 6) return "Senha deve ter ao menos 6 caracteres";
      return null;
    }

    const normalizado = String(valor).replace(",", ".");
    const n = Number(normalizado);
    if (isNaN(n) || n <= 0) return "Valor inválido";

    if (campo === "idade") {
      if (n < 1 || n > 120) return "Idade entre 1 e 120 anos";
      return null;
    }

    if (campo === "pesoAlvo" || campo === "pesoAtual") {
      if (n < 10 || n > 300) return "Peso entre 10 e 300 kg";
      return null;
    }

    return null;
  };

  const handleChange = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setInputErros((prev) => ({ ...prev, [campo]: validarCampo(campo, valor) }));
  };

  const handleRegister = async () => {
    // valida todos os campos antes de submeter
    const camposObrigatorios = ["nome", "email", "senha"];
    const novosErros = {};

    camposObrigatorios.forEach((campo) => {
      const erro = validarCampo(campo, form[campo]);
      if (erro) novosErros[campo] = erro;
    });

    ["idade", "pesoAlvo", "pesoAtual"].forEach((campo) => {
      if (form[campo]) {
        const erro = validarCampo(campo, form[campo]);
        if (erro) novosErros[campo] = erro;
      }
    });

    if (Object.keys(novosErros).length > 0) {
      setInputErros(novosErros);
      setErro("Corrija os campos inválidos antes de continuar.");
      return;
    }

    setErro(null);
    setLoading(true);

    try {
      await register({
        nome: form.nome.trim(),
        email: form.email.trim(),
        senha: form.senha,
        idade: form.idade ? Number(form.idade) : undefined,
        pesoAlvo: form.pesoAlvo
          ? Number(form.pesoAlvo.replace(",", "."))
          : undefined,
        pesoAtual: form.pesoAtual
          ? Number(form.pesoAtual.replace(",", "."))
          : undefined,
      });
      router.replace("/home");
    } catch (e) {
      setErro(e.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  const campo = (label, key, props = {}) => (
    <View style={{ marginBottom: 2 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, inputErros[key] && localStyles.inputError]}
        placeholderTextColor="#9ca3af"
        value={form[key]}
        onChangeText={(v) => handleChange(key, v)}
        {...props}
      />
      {inputErros[key] && (
        <Text style={localStyles.erroInput}>{inputErros[key]}</Text>
      )}
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Criar conta</Text>
          </View>

          <View style={styles.topSection}>
            <Text style={styles.topText}>
              Crie sua conta para salvar suas análises e acompanhar seu
              progresso.
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{ paddingBottom: 24 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.card, { marginTop: 16 }]}>
              {campo("Nome", "nome", { placeholder: "Seu nome" })}
              {campo("Email", "email", {
                placeholder: "seu@email.com",
                keyboardType: "email-address",
                autoCapitalize: "none",
                autoCorrect: false,
              })}
              {campo("Senha", "senha", {
                placeholder: "••••••••",
                secureTextEntry: true,
              })}

              <View style={styles.row}>
                <View style={styles.col}>
                  {campo("Idade", "idade", {
                    placeholder: "Ex: 25",
                    keyboardType: "numeric",
                  })}
                </View>
                <View style={styles.col}>
                  {campo("Peso Alvo", "pesoAlvo", {
                    placeholder: "Ex: 70",
                    keyboardType: "numeric",
                  })}
                </View>
                <View style={styles.col}>
                  {campo("Peso Atual", "pesoAtual", {
                    placeholder: "Ex: 75",
                    keyboardType: "numeric",
                  })}
                </View>
              </View>

              {erro && <Text style={styles.erro}>{erro}</Text>}

              <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Criar conta</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.replace("/login")}>
                <Text style={styles.linkText}>Já tem conta? Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.replace("/home")}>
                <Text style={styles.linkText}>Voltar para Home</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const localStyles = StyleSheet.create({
  inputError: {
    borderColor: "#ef4444",
    borderWidth: 1,
  },
  erroInput: {
    color: "#ef4444",
    fontSize: 11,
    marginTop: 2,
    marginBottom: 4,
  },
});
