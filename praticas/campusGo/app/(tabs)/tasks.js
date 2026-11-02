import { useState } from 'react';
import { ScrollView, Text, Alert, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import AppButton from '../../components/AppButton';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function TasksScreen() {
  const [place, setPlace] = useState(null);

  async function estudeiAqui() {
    try {
      const found = await getCurrentPlace();
      if (!found) {
        Alert.alert('Permissão negada', 'Precisamos da localização para registrar o check-in.');
        return;
      }
      setPlace(found);
    } catch (e) {
      Alert.alert('Localização indisponível', 'Verifique se o GPS está ligado e tente de novo.');
    }
  }

  async function lembrar() {
    try {
      const id = await scheduleReminder('Hora de estudar!', 10);
      if (!id) {
        Alert.alert('Permissão negada', 'Ative as notificações do app nos ajustes do aparelho.');
        return;
      }
      Alert.alert('Lembrete agendado', 'Você será avisado em 10 segundos.');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível agendar o lembrete.');
    }
  }

  async function concluir() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {
      // sem vibração (ex.: emulador): segue normalmente
    }
    Alert.alert('Tarefa concluída');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <Link href="/new-task" asChild>
        <AppButton title="Nova tarefa" />
      </Link>
      <AppButton title="Abrir tarefa 42" variant="secondary" onPress={() => router.push('/task/42')} />

      <AppButton title="Estudei aqui" onPress={estudeiAqui} />
      {place && <Text style={styles.place}>Você estudou em: {place.label}</Text>}

      <AppButton title="Lembrar em 10 s" onPress={lembrar} />
      <AppButton title="Concluir" onPress={concluir} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  place: { marginVertical: 6, color: '#333' },
});
