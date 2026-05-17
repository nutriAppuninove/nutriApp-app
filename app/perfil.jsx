import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";
import { styles } from "./style/perfil.style";
import { API_URL } from "./constants/env";

export default function Perfil() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const carregarPerfil = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/user/profile?userId=${user.id}`);

        if (!res.ok) throw new Error("Falha ao carregar perfil");

        const data = await res.json();

        console.log("API data:", data);

        setPerfil({
          nome: data.nome,
          idade: data.idade,
          ultimaAnalise: data.ultimaAnalise,
        });
      } catch (e) {
        console.log("Erro:", e);

        setPerfil({
          nome: user.nome,
          idade: user.idade ?? null,
          ultimaAnalise: null,
        });
      } finally {
        setLoading(false);
      }
    };

    carregarPerfil();
  }, [user]);

  if (!user) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Perfil</Text>
          </View>

          <View style={styles.guestBox}>
            <Text style={styles.guestEmoji}>🔒</Text>
            <Text style={styles.guestTitulo}>Você não está logado</Text>
            <Text style={styles.guestTexto}>
              Faça login ou crie uma conta para visualizar seu perfil.
            </Text>

            <TouchableOpacity
              style={styles.guestBtnPrimary}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.guestBtnPrimaryText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.guestBtnSecondary}
              onPress={() => router.push("/register")}
            >
              <Text style={styles.guestBtnSecondaryText}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  // LOGADO
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Perfil</Text>
          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.topSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(perfil?.nome ?? "U").charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {loading || !perfil ? (
            <ActivityIndicator
              color="#3d5a4e"
              size="large"
              style={{ marginTop: 24 }}
            />
          ) : (
            <>
              <View style={styles.card}>
                <Text style={styles.label}>Nome</Text>
                <Text style={styles.valor}>{perfil.nome}</Text>

                <View style={styles.divider} />

                <Text style={styles.label}>Idade</Text>
                <Text style={styles.valor}>
                  {perfil.idade ? `${perfil.idade} anos` : "—"}
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitulo}>Última análise</Text>

                {perfil.ultimaAnalise ? (
                  <>
                    <View style={styles.linhaDupla}>
                      <View style={styles.colDupla}>
                        <Text style={styles.label}>Peso</Text>
                        <Text style={styles.valor}>
                          {perfil.ultimaAnalise.peso} kg
                        </Text>
                      </View>
                      <View style={styles.colDupla}>
                        <Text style={styles.label}>Altura</Text>
                        <Text style={styles.valor}>
                          {perfil.ultimaAnalise.altura} m
                        </Text>
                      </View>
                    </View>

                    <View style={styles.linhaDupla}>
                      <View style={styles.colDupla}>
                        <Text style={styles.label}>Idade (análise)</Text>
                        <Text style={styles.valor}>
                          {perfil.ultimaAnalise.idade}
                        </Text>
                      </View>
                      <View style={styles.colDupla}>
                        <Text style={styles.label}>Frequência</Text>
                        <Text style={styles.valor}>
                          {perfil.ultimaAnalise.frequencia ?? "—"}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  <Text style={styles.semDados}>
                    Nenhuma análise registrada ainda.
                  </Text>
                )}
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
}
