import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { rotulo_input_meta, rotulo_btn_cadastro_meta, rotulo_lista_metas } from './mensagem';
import { useState } from 'react';


export default function App() {

  const [inputMetaText, setInputMetaText] = useState("");
  const [meta, setMeta] = useState([]); 

  function metaInputHandler(inputText) {
    setInputMetaText(inputText);
  }
function adicionarMetaHandler() {
  if (inputMetaText.trim() === "") {
    return;
  }

  setMeta([...meta, inputMetaText]);
}

function removerMetaHandler(index) {
  const novasMetas = [...meta];
  novasMetas.splice(index, 1);
  setMeta(novasMetas);
}
  return (
    <View style={styles.mainContainer}>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <View style={{width: "65%"}}>
        <TextInput style={[styles.inputText, { backgroundColor: "#f0f0f0" }]} placeholder={rotulo_input_meta} 
        onChangeText={metaInputHandler}
        />
       </View>
      <View style={{width: "30%"}}>
        <Button title={rotulo_btn_cadastro_meta}
        onPress={adicionarMetaHandler}
        />
      </View>
      </View>
      <View style={[styles.metaContainer, { alignItems: "center", justifyContent: "center", flex: 1 }]}>
        <Text style={{backgroundColor: "#6d61d8", padding: 10, borderRadius: 20, color: "#ffffff"}}>{rotulo_lista_metas}</Text>
              <ScrollView style={[styles.metaContainer, { width: 250 }]}>
        {meta.map((meta, index) => <Text key={index} style={styles.item}>{meta}</Text>)}
      </ScrollView>
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
