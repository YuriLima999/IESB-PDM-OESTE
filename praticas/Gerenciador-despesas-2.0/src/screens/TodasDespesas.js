import { useMemo, useState } from 'react';
import {View, Text, TextInput, Pressable, ScrollView, Alert, StyleSheet,useColorScheme, useWindowDimensions,} from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';
import useDebounce from '../hooks/useDebounce';
import { CATEGORIES } from '../constants/categories';
import { getColors } from '../constants/theme';

const FILTROS = ['Todas', ...CATEGORIES];

function TodasDespesas() {
  const { expenses, clearExpenses } = useExpenses();
  const colors = getColors(useColorScheme());
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 2 : 1;

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const debouncedSearch = useDebounce(search, 300);

  const filtradas = useMemo(() => {
    const termo = debouncedSearch.trim().toLowerCase();
    return expenses.filter(
      (e) =>
        (category === 'Todas' || e.category === category) &&
        e.description.toLowerCase().includes(termo)
    );
  }, [expenses, debouncedSearch, category]);

  function confirmarLimpar() {
    Alert.alert('Limpar tudo', 'Todas as despesas serão apagadas. Deseja continuar?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Apagar tudo', style: 'destructive', onPress: clearExpenses },
    ]);
  }

  const semDados = expenses.length === 0;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TextInput
        style={[
          styles.busca,
          { backgroundColor: colors.card, borderColor: colors.border, color: colors.text },
        ]}
        placeholder="Buscar por descrição"
        placeholderTextColor={colors.textSecondary}
        value={search}
        onChangeText={setSearch}
        autoCorrect={false}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsScroll}
        contentContainerStyle={styles.chips}
      >
        {FILTROS.map((cat) => {
          const ativa = cat === category;
          return (
            <Pressable
              key={cat}
              onPress={() => setCategory(cat)}
              style={[
                styles.chip,
                { borderColor: colors.border, backgroundColor: colors.card },
                ativa && { backgroundColor: colors.primary, borderColor: colors.primary },
              ]}
            >
              <Text style={{ color: ativa ? colors.onPrimary : colors.text, fontSize: 12 }}>
                {cat}
              </Text>
            </Pressable>
          );
        })}
        {!semDados && (
          <Pressable onPress={confirmarLimpar} style={styles.limpar}>
            <Text style={{ color: colors.danger, fontSize: 12 }}>Limpar tudo</Text>
          </Pressable>
        )}
      </ScrollView>

      <DespesaSaida
        despesas={filtradas}
        periodo={category === 'Todas' ? 'Total' : category}
        numColumns={numColumns}
        emptyTitle={semDados ? 'Nenhuma despesa' : 'Nenhum resultado'}
        emptyHint={
          semDados
            ? 'Toque em + para adicionar.'
            : 'Tente outro termo de busca ou outra categoria.'
        }
      />
    </View>
  );
}

export default TodasDespesas;

const styles = StyleSheet.create({
  busca: {
    margin: 8,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  chipsScroll: { flexGrow: 0 },
  chips: { paddingHorizontal: 8, paddingBottom: 8, alignItems: 'center' },
  chip: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 6,
    borderRadius: 14,
    borderWidth: 1,
  },
  limpar: { paddingVertical: 5, paddingHorizontal: 12 },
});
