import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';

export default function CompromissoInput({
  value,
  onChangeText,
  onAdd,
  labels,
  categoriaSelecionada,
  onSelecionarCategoria,
}) {
  return (
    <View>
      <View style={styles.categoriasArea}>
        {labels.categorias.map((cat) => {
          const selecionada = cat === categoriaSelecionada;
          return (
            <Pressable
              key={cat}
              style={[styles.chip, selecionada && styles.chipSelecionado]}
              onPress={() => onSelecionarCategoria(cat)}
            >
              <Text
                style={[
                  styles.chipTexto,
                  selecionada && styles.chipTextoSelecionado,
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.formArea}>
        <TextInput
          style={styles.input}
          placeholder={labels.placeholderCompromisso}
          placeholderTextColor="#8a8a8a"
          value={value}
          onChangeText={onChangeText}
          returnKeyType="done"
          onSubmitEditing={onAdd}
        />

        <Pressable
          style={({ pressed }) => [
            styles.botaoAdicionar,
            pressed && styles.botaoAdicionarPressed,
          ]}
          android_ripple={{ color: '#0d3f8f' }}
          onPress={onAdd}
        >
          <Text style={styles.textoBotao}>{labels.botaoAdicionar}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoriasArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#c8c8c8',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  chipSelecionado: {
    backgroundColor: '#bb2121',
    borderColor: '#b41e1e',
  },
  chipTexto: {
    fontSize: 12,
    color: '#374151',
    textTransform: 'capitalize',
  },
  chipTextoSelecionado: {
    color: '#fff',
    fontWeight: '600',
  },
  formArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    width: '68%',
    borderWidth: 1,
    borderColor: '#c8c8c8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  botaoAdicionar: {
    width: '28%',
    backgroundColor: '#dd1111',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoAdicionarPressed: {
    opacity: 0.75,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
