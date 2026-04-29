import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Rodape() {
  return (
    <View style={styles.footer}>
      {/* Botão Início */}
      <TouchableOpacity 
        style={styles.tabItem} 
        activeOpacity={0.7}
        onPress={() => console.log('Navegar para Home')}
      >
        <Ionicons name="home-outline" size={22} color="#fff" />
        <Text style={styles.tabText}>Início</Text>
      </TouchableOpacity>

      {/* Botão Histórico (Nova Especificação) */}
      <TouchableOpacity 
        style={styles.tabItem} 
        activeOpacity={0.7}
        onPress={() => console.log('Navegar para Histórico')}
      >
        <Ionicons name="time-outline" size={22} color="#fff" />
        <Text style={styles.tabText}>Histórico</Text>
      </TouchableOpacity>

      {/* Botão Perfil */}
      <TouchableOpacity 
        style={styles.tabItem} 
        activeOpacity={0.7}
        onPress={() => console.log('Navegar para Perfil')}
      >
        <Ionicons name="person-outline" size={22} color="#fff" />
        <Text style={styles.tabText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: '#3d5a4e', // Tom de verde baseado no seu layout
    // Altura condicional: iOS precisa de mais espaço devido à barra de gestos
    height: Platform.OS === 'ios' ? 85 : 65, 
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    
    // Especificação de Sombra (Elevated Design)
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.2)',
    elevation: 20, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Divide o espaço igualmente entre os 3 botões
  },
  tabText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
    textTransform: 'uppercase', // Estética mais profissional
    letterSpacing: 0.5,
  },
});