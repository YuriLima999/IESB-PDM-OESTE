import { useContext } from 'react';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { DespesasContext } from '../store/despesas-context';
import { filtrarUltimos7Dias } from '../util/despesas';

function DespesasRecentes() {
  const { despesas } = useContext(DespesasContext);

  return (
    <DespesaSaida despesas={filtrarUltimos7Dias(despesas)} periodo={'Últimos 7 dias'} />
  );
}

export default DespesasRecentes;
