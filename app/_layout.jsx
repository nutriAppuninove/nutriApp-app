import { Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Rodape from '../components/Rodape';

export default function Layout() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Slot /> 
      </View>
      <Rodape />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
});