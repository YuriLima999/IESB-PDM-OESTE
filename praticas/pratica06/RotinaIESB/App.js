import { useState, useEffect } from 'react';
import {View,Text,Image,Alert,StyleSheet,Pressable,Platform,} from 'react-native';
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';
import * as labels from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(
    labels.categorias[0]
  );
  const [compromissos, setCompromissos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const salvo = await AsyncStorage.getItem(STORAGE_KEY);
        if (salvo) {
          setCompromissos(JSON.parse(salvo));
        }
      } catch (erro) {
        Alert.alert('Erro ao carregar', labels.textoErroStorage);
      } finally {
        setCarregado(true);
      }
    }
    carregarCompromissos();
  }, []);

  useEffect(() => {
    if (!carregado) return;
    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        Alert.alert('Erro ao salvar', labels.textoErroStorage);
      }
    }
    salvarCompromissos();
  }, [compromissos, carregado]);

  function handleAdicionar() {
    const textoLimpo = texto.trim();
    if (textoLimpo.length === 0) {
      Alert.alert(labels.tituloAlertaVazio, labels.textoAlertaVazio);
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(), 
      texto: textoLimpo,
      categoria: categoriaSelecionada,
      concluido: false,
      criadoEm: new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setCompromissos((listaAtual) => [novoCompromisso, ...listaAtual]);
    setTexto('');
  }

  function handleRemover(id) {
    setCompromissos((listaAtual) =>
      listaAtual.filter((item) => item.id !== id)
    );
  }

  function handleToggleConcluido(id) {
    setCompromissos((listaAtual) =>
      listaAtual.map((item) =>
        item.id === id ? { ...item, concluido: !item.concluido } : item
      )
    );
  }

  const itensFiltrados =
    filtroCategoria === 'todas'
      ? compromissos
      : compromissos.filter((item) => item.categoria === filtroCategoria);

  const pendentes = compromissos.filter((item) => !item.concluido).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Image source={require('./assets/Iesb.jpg')} style={styles.logo} />
          <View style={styles.headerTextos}>
            <Text style={styles.tituloApp}>{labels.tituloApp}</Text>
            <Text style={styles.subtituloApp}>{labels.subtituloApp}</Text>
          </View>
          <View style={styles.contadorArea}>
            <Text style={styles.contadorTexto}>
              {labels.contadorPendentes(pendentes)}
            </Text>
          </View>
        </View>
        <CompromissoInput
          value={texto}
          onChangeText={setTexto}
          onAdd={handleAdicionar}
          labels={labels}
          categoriaSelecionada={categoriaSelecionada}
          onSelecionarCategoria={setCategoriaSelecionada}
        />

        <View style={styles.filtroArea}>
          {['todas', ...labels.categorias].map((cat) => {
            const selecionado = cat === filtroCategoria;
            return (
              <Pressable
                key={cat}
                style={[
                  styles.filtroChip,
                  selecionado && styles.filtroChipSelecionado,
                ]}
                onPress={() => setFiltroCategoria(cat)}
              >
                <Text
                  style={[
                    styles.filtroChipTexto,
                    selecionado && styles.filtroChipTextoSelecionado,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <CompromissoList
          itens={itensFiltrados}
          onDelete={handleRemover}
          onToggleConcluido={handleToggleConcluido}
          tituloLista={labels.tituloLista}
          listaVazia={labels.listaVazia}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#dd1111',
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  headerTextos: {
    flex: 1,
  },
  tituloApp: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  subtituloApp: {
    fontSize: 12,
    color: '#dbe6fb',
  },
  contadorArea: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  contadorTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  filtroArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },
  filtroChip: {
    borderWidth: 1,
    borderColor: '#94a3b8',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 6,
  },
  filtroChipSelecionado: {
    backgroundColor: '#2a0f0f',
    borderColor: '#2a0f0f',
  },
  filtroChipTexto: {
    fontSize: 12,
    color: '#334155',
    textTransform: 'capitalize',
  },
  filtroChipTextoSelecionado: {
    color: '#fff',
    fontWeight: '600',
  },
});

