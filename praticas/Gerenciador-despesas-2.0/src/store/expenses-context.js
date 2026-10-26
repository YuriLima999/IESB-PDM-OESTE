import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

const ExpensesContext = createContext(null);

export function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.data }
          : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

function newId() {
  return Date.now().toString() + Math.random().toString(36).slice(2, 7);
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega os dados salvos ao iniciar
  useEffect(() => {
    async function load() {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const saved = JSON.parse(json).map((e) => ({ ...e, date: new Date(e.date) }));
          dispatch({ type: 'SET', payload: saved });
        }
      } catch (error) {
        console.log('Erro ao ler despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    load();
  }, []);

  // Salva a cada alteração (só depois de carregar, para não sobrescrever com a lista vazia)
  useEffect(() => {
    if (!isLoaded) return;
    async function save() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.log('Erro ao salvar despesas:', error);
      }
    }
    save();
  }, [expenses, isLoaded]);

  const addExpense = useCallback((data) => {
    dispatch({ type: 'ADD', payload: { id: newId(), ...data } });
  }, []);

  const updateExpense = useCallback((id, data) => {
    dispatch({ type: 'UPDATE', payload: { id, data } });
  }, []);

  const deleteExpense = useCallback((id) => {
    dispatch({ type: 'DELETE', payload: id });
  }, []);

  const clearExpenses = useCallback(() => {
    dispatch({ type: 'SET', payload: [] });
  }, []);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, updateExpense, deleteExpense, clearExpenses }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (context === null) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider.');
  }
  return context;
}
