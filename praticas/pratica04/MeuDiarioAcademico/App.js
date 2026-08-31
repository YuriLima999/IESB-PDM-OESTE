import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  titulo,
  input,
  botao,
  titulo_lista,
  trocar_label,
} from './labels';

const disciplinasFixas = [
  'Programação para Dispositivos Móveis',
  'Estrutura de Dados',
  'Banco de Dados II',
  'Engenharia de Software',
];

export default function App() {
  const [texto, setTexto] = useState('');
  const [pressionado, setPressionado] = useState(false);
  const [apenasObrigatorias, setApenasObrigatorias] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitulo}>{titulo}</Text>
      </View>

      <View style={styles.linhaCadastro}>
        <TextInput
          style={styles.input}
          placeholder={input}
          value={texto}
          onChangeText={setTexto}
        />

        <Pressable
          style={[styles.botao, pressionado && styles.botaoPressionado]}
          onPressIn={() => setPressionado(true)}
          onPressOut={() => setPressionado(false)}
          onPress={() => setTexto('')}
        >
          <Text style={styles.botaoTexto}>{botao}</Text>
        </Pressable>
      </View>

      <View style={styles.linhaSwitch}>
        <Text style={styles.switchLabel}>{trocar_label}</Text>
        <Switch
          value={apenasObrigatorias}
          onValueChange={setApenasObrigatorias}
        />
      </View>

      <Text style={styles.listaTitulo}>{titulo_lista}</Text>
      <View style={styles.lista}>
        {disciplinasFixas.map((disciplina, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemTexto}>{disciplina}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },

  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },

  linhaCadastro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFF',
  },
  botao: {
    width: '28%',
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPressionado: {
    backgroundColor: '#1B5E20',
    opacity: 0.8,
  },
  botaoTexto: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  linhaSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 14,
    color: '#333',
  },

  listaTitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#222',
  },
  lista: {
    flexDirection: 'column',
  },
  item: {
    backgroundColor: '#FFF',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 1,
  },
  itemTexto: {
    fontSize: 15,
    color: '#333',
  },
});
