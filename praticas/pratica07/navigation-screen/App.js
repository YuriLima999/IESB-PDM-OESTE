import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer as NavigatorContainer } from "@react-navigation/native";
import DespesasRecentes from "./screens/DespesasRecentes";
import TodasDespesas from "./screens/TodasDespesas";
import GerenciarDespesa from "./screens/GerenciarDespesa";
import { Ionicons } from "@expo/vector-icons";        
import { Header } from "@react-navigation/stack";

export default function App() {
  
  const Tab = createBottomTabNavigator();
  function BottomTabScreen() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Despesas Recentes" component= {DespesasRecentes} />
        <Tab.Screen name="Todas Despesas" component= {TodasDespesas} />
      </Tab.Navigator>
    );
  }
  const Stack = createNativeStackNavigator();
  return (
    <NavigatorContainer>
      <Stack.Navigator>
        <Stack.Screen name="Despesas" component={BottomTabScreen} 
        options={{headerShown: false}}/>
        <Stack.Screen name="Gerenciar Despesa" component={GerenciarDespesa} />
      </Stack.Navigator>
    </NavigatorContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
