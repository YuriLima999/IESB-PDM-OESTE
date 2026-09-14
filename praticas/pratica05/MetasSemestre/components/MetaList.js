import { FlatList, Pressable, Text, View, StyleSheet } from 'react-native';

export default function MetaList({ metas, onDelete }) {

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (

        <View style={styles.item}>

          <View style={styles.informacoes}>

            <Text style={styles.texto}>
              {item.texto}
            </Text>

            <Text style={styles.data}>
              Criada em: {item.criadaEm}
            </Text>

          </View>

          <Pressable
            style={styles.botaoExcluir}
            onPress={() => onDelete(item.id)}
            android_ripple={{ color: '#cccccc' }}
          >
            <Text style={styles.textoExcluir}>
              Excluir
            </Text>
          </Pressable>

        </View>

      )}
    />
  );
}


const styles = StyleSheet.create({

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },

  informacoes: {
    flex: 1,
  },

  texto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  data: {
    fontSize: 13,
    color: '#666',
  },

  botaoExcluir: {
    backgroundColor: '#e30613',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },

  textoExcluir: {
    color: '#fff',
    fontWeight: 'bold',
  },

});