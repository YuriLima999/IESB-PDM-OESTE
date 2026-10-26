import { FlatList, View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';
import { getColors } from '../../constants/theme';

function DespesaLista({
  despesas,
  numColumns = 1,
  emptyTitle = 'Nenhuma despesa',
  emptyHint = 'Toque em + para adicionar.',
}) {
  const colors = getColors(useColorScheme());

  return (
    <FlatList
      key={`colunas-${numColumns}`}
      data={despesas}
      numColumns={numColumns}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ flex: 1 / numColumns }}>
          <DespesaItem item={item} />
        </View>
      )}
      contentContainerStyle={styles.content}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="wallet-outline" size={56} color={colors.textSecondary} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>{emptyTitle}</Text>
          <Text style={{ color: colors.textSecondary, textAlign: 'center' }}>{emptyHint}</Text>
        </View>
      }
    />
  );
}

export default DespesaLista;

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingVertical: 6 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
});
