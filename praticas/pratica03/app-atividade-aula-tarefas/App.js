import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import MetasList from './components/metasList';
import MetaInput from './components/metaInput'; 
import { rotulo_lista_metas } from './mensagem';

export default function App() {

  const [meta, setMeta] = useState([]); 

  function adicionarMetaHandler(inputMeta) {
    setMeta([...meta, inputMeta]);
  }
  return (
    <View style={styles.mainContainer}>
      <MetaInput onAddMeta={adicionarMetaHandler} />      
      <View style={[styles.metaContainer, { alignItems: "center", justifyContent: "center", flex: 1 }]}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>{rotulo_lista_metas}</Text>
        <MetasList array={meta} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#eeeeee",
  },

  inputText: {
    borderColor: "#cccccc",
    borderWidth: 1,
    fontSize: 18,
    padding: 5,
    marginBottom: 10,

  },

  metaContainer: {
    flex: 1,

  },

  item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#a7abe2",
    fontSize: 18,
    flex: 1,
    textAlign: "center",
  },
});
