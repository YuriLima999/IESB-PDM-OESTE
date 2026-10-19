import { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DespesasContext } from '../store/despesas-context';
import { CATEGORIAS } from '../util/despesas';

function GerenciarDespesa({ navigation }) {
  const { addDespesa } = useContext(DespesasContext);

  const [data, setData] = useState(new Date());
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
  };

  const handleChangeValor = (text) => {
    const cleanText = text.replace(',', '.');
    // Apenas números com até 2 casas decimais
    const match = cleanText.match(/^\d*\.?\d{0,2}$/);
    if (match) {
      setValor(cleanText);
    }
  };

  function confirmar() {
    const valorNumerico = parseFloat(valor);
    if (!descricao.trim() || !valor || isNaN(valorNumerico) || valorNumerico <= 0 || !categoria) {
      Alert.alert('Dados inválidos', 'Preencha descrição, valor (maior que zero) e categoria.');
      return;
    }
    addDespesa({
      id: Date.now().toString(),
      descricao: descricao.trim(),
      valor: valorNumerico,
      data,
      categoria,
    });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          maxLength={20}
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor da Despesa</Text>
        <TextInput
          style={styles.input}
          keyboardType={'decimal-pad'}
          maxLength={10}
          value={valor}
          onChangeText={handleChangeValor}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data da Despesa</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
          <Text>{data.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker value={data} mode="date" display="default" onChange={onChange} />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categorias}>
          {CATEGORIAS.map((cat) => {
            const ativa = cat === categoria;
            return (
              <Pressable
                key={cat}
                onPress={() => setCategoria(cat)}
                style={[styles.chip, ativa && styles.chipAtivo]}
              >
                <Text style={[styles.chipText, ativa && styles.chipTextAtivo]}>{cat}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Pressable style={styles.botao} onPress={confirmar}>
        <Text style={styles.botaoText}>Adicionar</Text>
      </Pressable>
    </View>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  container: { flex: 1, margin: 20 },
  inputContainer: { marginHorizontal: 4, marginVertical: 16 },
  label: { fontSize: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8 },
  categorias: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#f0f0f0',
  },
  chipAtivo: { backgroundColor: '#3b6fd4', borderColor: '#3b6fd4' },
  chipText: { fontSize: 13, color: '#333' },
  chipTextAtivo: { color: 'white' },
  botao: { backgroundColor: '#3b6fd4', padding: 12, alignItems: 'center', borderRadius: 6 },
  botaoText: { color: 'white', fontWeight: 'bold' },
});
