import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AppButton from '../components/AppButton';

export default function NewTaskModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova tarefa</Text>
      <Text style={styles.text}>Esta tela abre como modal. Toque em Fechar para voltar.</Text>
      <AppButton title="Fechar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  text: { marginBottom: 16, color: '#555' },
});
