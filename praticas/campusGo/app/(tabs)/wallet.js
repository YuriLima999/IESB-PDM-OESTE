import { useState } from 'react';
import { View, Text, TextInput, Share, Alert, StyleSheet } from 'react-native';
import AppButton from '../../components/AppButton';
import { useExpenses } from '../../store/expenses-context';

export default function WalletScreen() {
  const { expenses, addExpense } = useExpenses();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const total = expenses.reduce((soma, item) => soma + item.amount, 0);

  function handleChangeAmount(text) {
    const clean = text.replace(',', '.');
    if (clean.match(/^\d*\.?\d{0,2}$/)) setAmount(clean);
  }

  function adicionar() {
    const value = parseFloat(amount);
    if (description.trim().length < 3 || isNaN(value) || value <= 0) {
      Alert.alert('Dados inválidos', 'Informe uma descrição (mín. 3 letras) e um valor maior que zero.');
      return;
    }
    addExpense({ description: description.trim(), amount: value, date: new Date(), category: 'Outros' });
    setDescription('');
    setAmount('');
  }

  async function compartilhar() {
    try {
      await Share.share({ message: `Gastei R$ ${total.toFixed(2)} neste semestre.` });
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível compartilhar.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total gasto</Text>
      <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
      <Text style={styles.muted}>
        {expenses.length} {expenses.length === 1 ? 'despesa' : 'despesas'}
      </Text>

      <AppButton title="Compartilhar resumo" onPress={compartilhar} />

      <Text style={[styles.label, { marginTop: 24 }]}>Adicionar despesa</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        maxLength={20}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={handleChangeAmount}
        maxLength={10}
      />
      <AppButton title="Adicionar" variant="secondary" onPress={adicionar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 14, color: '#555' },
  total: { fontSize: 36, fontWeight: 'bold', marginVertical: 4 },
  muted: { color: '#777', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginTop: 8 },
});
