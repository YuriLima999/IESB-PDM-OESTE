import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Pressable, useColorScheme } from 'react-native';

import DespesasRecentes from './src/screens/DespesasRecentes';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';
import { ExpensesContextProvider } from './src/store/expenses-context';
import { getColors } from './src/constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  const colors = getColors(useColorScheme());

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate('GerenciarDespesa')}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="add" size={26} color={colors.text} />
          </Pressable>
        ),
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => <Ionicons name="wallet" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();

  return (
    <ExpensesContextProvider>
      <StatusBar style="auto" />
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}
