import { useMemo } from 'react';
import { View, useColorScheme } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';
import { getColors } from '../constants/theme';

function DespesasRecentes() {
  const { expenses } = useExpenses();
  const colors = getColors(useColorScheme());

  const ultimos7Dias = useMemo(() => {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);
    seteDiasAtras.setHours(0, 0, 0, 0);
    return expenses.filter((e) => e.date >= seteDiasAtras && e.date <= hoje);
  }, [expenses]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <DespesaSaida
        despesas={ultimos7Dias}
        periodo="Últimos 7 dias"
        emptyHint="Nenhuma despesa nos últimos 7 dias. Toque em + para adicionar."
      />
    </View>
  );
}

export default DespesasRecentes;
