import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

function Item({ item, onDelete, onToggleConcluido }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      android_ripple={{ color: '#dbe6fb' }}
      onPress={() => onToggleConcluido(item.id)}
    >
      <View style={styles.itemTextoArea}>
        <Text
          style={[
            styles.itemTexto,
            item.concluido && styles.itemTextoConcluido,
          ]}
        >
          {item.texto}
        </Text>
        <Text style={styles.itemMeta}>
          {item.categoria ? `${item.categoria} • ` : ''}
          {item.criadoEm}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.botaoRemover,
          pressed && styles.botaoRemoverPressed,
        ]}
        android_ripple={{ color: '#8f1e1e' }}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.textoRemover}>Remover</Text>
      </Pressable>
    </Pressable>
  );
}

export default function CompromissoList({
  itens,
  onDelete,
  onToggleConcluido,
  tituloLista,
  listaVazia,
}) {
  return (
    <View style={styles.listaArea}>
      <Text style={styles.tituloLista}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <Item
            item={item}
            onDelete={onDelete}
            onToggleConcluido={onToggleConcluido}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.listaVaziaTexto}>{listaVazia}</Text>
        }
        contentContainerStyle={itens.length === 0 && styles.listaVaziaContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listaArea: {
    flex: 1, 
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  tituloLista: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1e293b',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  itemPressed: {
    backgroundColor: '#f1f5f9',
  },
  itemTextoArea: {
    flex: 1,
    marginRight: 8,
  },
  itemTexto: {
    fontSize: 15,
    color: '#0f172a',
  },
  itemTextoConcluido: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  itemMeta: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  botaoRemover: {
    backgroundColor: '#c0392b',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  botaoRemoverPressed: {
    opacity: 0.75,
  },
  textoRemover: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  listaVaziaContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listaVaziaTexto: {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 14,
    paddingHorizontal: 24,
  },
});
