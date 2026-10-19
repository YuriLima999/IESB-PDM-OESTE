import { useContext, useState } from 'react';
import { View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import CategoriaFiltro from '../components/CategoriaFiltro';
import { DespesasContext } from '../store/despesas-context';
import { filtrarPorCategoria } from '../util/despesas';

function TodasDespesas() {
  const { despesas } = useContext(DespesasContext);
  const [categoria, setCategoria] = useState('Todas');

  const despesasFiltradas = filtrarPorCategoria(despesas, categoria);
  const periodo = categoria === 'Todas' ? 'Total' : categoria;

  return (
    <View style={{ flex: 1 }}>
      <CategoriaFiltro selecionada={categoria} onSelecionar={setCategoria} />
      <DespesaSaida despesas={despesasFiltradas} periodo={periodo} />
    </View>
  );
}

export default TodasDespesas;
