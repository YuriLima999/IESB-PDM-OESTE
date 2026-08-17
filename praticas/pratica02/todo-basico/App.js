import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Programação para dipositivos móveis</Text>
      <Text>Olá, Cauã Yuri! Meu primeiro App.</Text>
      <Text>Bem-vindo ao React Native!</Text>
      <Text>Vamos aprender a criar aplicativos móveis!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3b3b3',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 50,
    fontStyle: 'bold',
  },
});
