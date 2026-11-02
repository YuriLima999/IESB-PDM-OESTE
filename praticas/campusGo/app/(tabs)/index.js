import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import FadeIn from '../../components/FadeIn';
import AppButton from '../../components/AppButton';
import useNotices from '../../hooks/useNotices';
import { api } from '../../services/api';

export default function MuralScreen() {
  const { notices, isLoading, error, reload } = useNotices();

  // Bônus: criar aviso (o JSONPlaceholder responde, mas não grava de verdade)
  async function criarAviso() {
    try {
      const created = await api.create('posts', {
        title: 'Aviso de teste',
        body: 'Criado pelo CampusGo',
        userId: 1,
      });
      Alert.alert('Aviso criado', `O servidor devolveu o id ${created.id}.`);
    } catch (e) {
      Alert.alert('Erro', e.message);
    }
  }

  // 1) Carregando (primeira busca)
  if (isLoading && notices.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.muted}>Carregando avisos...</Text>
      </View>
    );
  }

  // 2) Erro
  if (error && notices.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <AppButton title="Tentar novamente" onPress={reload} />
      </View>
    );
  }

  // 3) Sucesso
  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => String(item.id)}
      refreshing={isLoading}
      onRefresh={reload}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<AppButton title="Criar aviso" variant="secondary" onPress={criarAviso} />}
      ListEmptyComponent={<Text style={styles.empty}>Nenhum aviso no momento.</Text>}
      renderItem={({ item }) => (
        <FadeIn style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  muted: { marginTop: 8, color: '#666' },
  error: { color: '#d32f2f', textAlign: 'center', marginBottom: 8 },
  list: { padding: 12, flexGrow: 1 },
  empty: { textAlign: 'center', marginTop: 32, color: '#666' },
  card: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontWeight: 'bold', marginBottom: 4, textTransform: 'capitalize' },
  body: { color: '#444' },
});
