import { View, Text, StyleSheet } from 'react-native';

const LIMITE = 200;

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((total, despesa) => {
    return total + despesa.valor;
  }, 0);

  // Desafio extra: valor em vermelho se ultrapassar R$ 200,00
  const estourou = somaDespesas > LIMITE;

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, estourou && styles.somaAlerta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#a9a9a9',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  periodo: { color: 'white', fontWeight: 'bold' },
  soma: { color: 'white', fontWeight: 'bold' },
  somaAlerta: { color: 'red' },
});
