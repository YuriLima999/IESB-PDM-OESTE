import { Button, StyleSheet, View, TextInput, Text } from "react-native";
import { rotulo_input_meta, rotulo_btn_cadastro_meta } from "../mensagem";
import React, {useState} from "react";

function MetaInput(props) {

  const [inputMetaText, setInputMetaText] = useState("");

  function metaInputHandler(inputText) {
    setInputMetaText(inputText);
  }

  function adicionarMetaHandler() {

    props.onAddMeta(inputMetaText);

    setInputMetaText("");
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >

      <View style={{ width: "65%" }}>

        <TextInput
          style={[
            styles.inputText,
            { backgroundColor: "#f0f0f0" }
          ]}
          placeholder={rotulo_input_meta}
          onChangeText={metaInputHandler}
          value={inputMetaText}
        />

      </View>

      <View style={{ width: "30%" }}>

        <Button
          title={rotulo_btn_cadastro_meta}
          onPress={adicionarMetaHandler}
        />

      </View>

    </View>
  );
}

export default MetaInput;

const styles = StyleSheet.create({

  inputText: {
    borderColor: "#cccccc",
    borderWidth: 1,
    fontSize: 18,
    padding: 5,
    marginBottom: 10,
  },

});