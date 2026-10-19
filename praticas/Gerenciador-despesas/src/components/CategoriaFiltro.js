import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CATEGORIAS } from '../util/despesas';

const OPCOES = ['Todas', ...CATEGORIAS];

function CategoriaFiltro({ selecionada, onSelecionar }) {
  return (
    <View style={styles.linha}>
      {OPCOES.map((cat) => {
        const ativa = cat === selecionada;
        return (
          <Pressable
            key={cat}
            onPress={() => onSelecionar(cat)}
            style={[styles.chip, ativa && styles.chipAtivo]}
          >
            <Text style={[styles.chipText, ativa && styles.chipTextAtivo]}>{cat}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default CategoriaFiltro;

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', flexWrap: 'wrap', padding: 6 },
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    margin: 3,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#f0f0f0',
  },
  chipAtivo: { backgroundColor: '#3b6fd4', borderColor: '#3b6fd4' },
  chipText: { fontSize: 12, color: '#333' },
  chipTextAtivo: { color: 'white' },
});
