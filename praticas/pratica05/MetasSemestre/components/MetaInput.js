import { TextInput, Pressable, Text, View, StyleSheet } from 'react-native';

export default function MetaInput({ value, onChangeText, onAdd }) {

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Digite sua meta"
      />

      <Pressable
        style={styles.botao}
        onPress={onAdd}
        android_ripple={{ color: '#cccccc' }}
      >
        <Text style={styles.textoBotao}>Adicionar</Text>
      </Pressable>

    </View>
    );
}
const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },

  botao: {
    backgroundColor: '#e30613',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },

});