import { useLayoutEffect, useState } from 'react';
import {View, Text, TextInput, Pressable, ScrollView, Modal, Alert, StyleSheet, KeyboardAvoidingView, Platform, useColorScheme,} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useExpenses } from '../store/expenses-context';
import { CATEGORIES } from '../constants/categories';
import { getColors } from '../constants/theme';

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }

  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  if (startOfDay(values.date) > startOfDay(new Date())) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }

  return errors;
}

function GerenciarDespesa({ navigation, route }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const colors = getColors(useColorScheme());

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const [form, setForm] = useState(() => {
    const existing = isEditing ? expenses.find((e) => e.id === expenseId) : null;
    return existing
      ? {
          description: existing.description,
          amount: String(existing.amount),
          date: existing.date,
          category: existing.category,
        }
      : { description: '', amount: '', date: new Date(), category: '' };
  });
  const [submitted, setSubmitted] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const errors = submitted ? validate(form) : {};

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Editar despesa' : 'Nova despesa' });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    setForm((atual) => ({ ...atual, [field]: value }));
  }

  function handleChangeAmount(text) {
    const cleanText = text.replace(',', '.');
    if (cleanText.match(/^\d*\.?\d{0,2}$/)) {
      handleChange('amount', cleanText);
    }
  }

  function onChangeDate(event, selectedDate) {
    setShowPicker(false);
    if (selectedDate) {
      handleChange('date', selectedDate);
    }
  }

  function handleSave() {
    setSubmitted(true);
    if (Object.keys(validate(form)).length > 0) {
      return;
    }
    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };
    if (isEditing) {
      updateExpense(expenseId, data);
    } else {
      addExpense(data);
    }
    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert('Excluir despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  const inputStyle = (field) => [
    styles.input,
    { backgroundColor: colors.card, borderColor: colors.border, color: colors.text },
    errors[field] && { borderColor: colors.danger },
  ];

  const renderError = (field) =>
    errors[field] ? (
      <Text style={[styles.error, { color: colors.danger }]}>{errors[field]}</Text>
    ) : null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Descrição</Text>
          <TextInput
            style={inputStyle('description')}
            maxLength={20}
            value={form.description}
            onChangeText={(text) => handleChange('description', text)}
          />
          {renderError('description')}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Valor da Despesa</Text>
          <TextInput
            style={inputStyle('amount')}
            keyboardType="decimal-pad"
            maxLength={10}
            value={form.amount}
            onChangeText={handleChangeAmount}
          />
          {renderError('amount')}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Data da Despesa</Text>
          <Pressable onPress={() => setShowPicker(true)} style={inputStyle('date')}>
            <Text style={{ color: colors.text }}>{form.date.toLocaleDateString('pt-BR')}</Text>
          </Pressable>
          {showPicker && (
            <DateTimePicker
              value={form.date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          {renderError('date')}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
          <Pressable onPress={() => setModalVisible(true)} style={inputStyle('category')}>
            <Text style={{ color: form.category ? colors.text : colors.textSecondary }}>
              {form.category || 'Selecione uma categoria'}
            </Text>
          </Pressable>
          {renderError('category')}
        </View>

        <Pressable
          style={[styles.botao, { backgroundColor: colors.primary }]}
          onPress={handleSave}
        >
          <Text style={[styles.botaoText, { color: colors.onPrimary }]}>Salvar</Text>
        </Pressable>

        {isEditing && (
          <Pressable
            style={[styles.botao, styles.botaoExcluir, { borderColor: colors.danger }]}
            onPress={handleDelete}
          >
            <Text style={[styles.botaoText, { color: colors.danger }]}>Excluir</Text>
          </Pressable>
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setModalVisible(false)} />
          <View style={[styles.sheet, { backgroundColor: colors.card }]}>
            <Text style={[styles.sheetTitle, { color: colors.text }]}>Escolha a categoria</Text>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                style={[styles.opcao, { borderBottomColor: colors.border }]}
                onPress={() => {
                  handleChange('category', cat);
                  setModalVisible(false);
                }}
              >
                <Text
                  style={{
                    color: cat === form.category ? colors.primary : colors.text,
                    fontWeight: cat === form.category ? 'bold' : 'normal',
                    fontSize: 16,
                  }}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
            <Pressable style={styles.opcao} onPress={() => setModalVisible(false)}>
              <Text style={{ color: colors.textSecondary, fontSize: 16 }}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  inputContainer: { marginHorizontal: 4, marginVertical: 12 },
  label: { fontSize: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10 },
  error: { fontSize: 12, marginTop: 4 },
  botao: { padding: 12, alignItems: 'center', borderRadius: 6, marginTop: 16 },
  botaoExcluir: { backgroundColor: 'transparent', borderWidth: 1, marginTop: 10 },
  botaoText: { fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: { borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16, paddingBottom: 28 },
  sheetTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  opcao: { paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth },
});
