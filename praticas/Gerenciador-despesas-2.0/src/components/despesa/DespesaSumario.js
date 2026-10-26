import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { getColors } from '../../constants/theme';

function DespesaSumario({ despesas, periodo }) {
  const colors = getColors(useColorScheme());

  const somaDespesas = despesas.reduce((acumulador, item) => {
    return acumulador + item.amount;
  }, 0);

  const quantidade = despesas.length;

  return (
    <View style={[styles.container, { backgroundColor: colors.summary }]}>
      <View>
        <Text style={styles.periodo}>{periodo}</Text>
        <Text style={styles.quantidade}>
          {quantidade} {quantidade === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text style={styles.soma}>R$ {somaDespesas.toFixed(2)}</Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodo: { color: 'white', fontWeight: 'bold' },
  quantidade: { color: 'white', fontSize: 12 },
  soma: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
