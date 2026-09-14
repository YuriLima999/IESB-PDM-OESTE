import { Alert, StyleSheet, Text, View, Image } from 'react-native';
import { useState, useEffect } from 'react';
import MetasList from './components/MetaList';
import MetaInput from './components/MetaInput'; 
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [texto, setTexto] = useState('');
  const [meta, setMeta] = useState([]); 


function adicionarMetaHandler() {
  if (texto.trim() === '') {
    Alert.alert("Atenção", "O campo de meta não pode estar vazio.");
    return;
  }
  const novaMeta = { id: Date.now().toString(), texto: texto, criadaEm: new Date().toLocaleDateString() };
    setMeta([...meta, novaMeta]);
    setTexto('');
};
function deletarMetaHandler(id) {
  setMeta(meta.filter(meta => meta.id !== id));
};

useEffect(() => {
  async function carregarMetas() {
    try {
      const dados = await AsyncStorage.getItem('@metas_semestre');

      if (dados !== null) {
        setMeta(JSON.parse(dados));
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar suas metas.');
    }
  }

  carregarMetas();
}, []);


useEffect(() => {
  async function salvarMetas() {
    try {
      await AsyncStorage.setItem('@metas_semestre', JSON.stringify(meta));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar suas metas.');
    }
  }
  
  salvarMetas();
}, [meta]);

return (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      
      <Image source={require('./assets/18063079.548d61182f48a.jpg')} style={styles.logo} />
        
      <Text style={styles.titulo}>Minhas Metas</Text>
      </View>
      <MetaInput
        value={texto}
        onChangeText={setTexto}
        onAdd={adicionarMetaHandler}
      />

      <MetasList
        metas={meta}
        onDelete={deletarMetaHandler}
      />

    </SafeAreaView>
  </SafeAreaProvider>
  
);


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});