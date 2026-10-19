import { createContext, useState } from 'react';

const diasAtras = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

const DUMMY_DESPESAS = [
  { id: '1', descricao: 'Conta de luz', valor: 100.99, data: new Date(2025, 2, 11), categoria: 'Contas' },
  { id: '2', descricao: 'Conta de Agua', valor: 40.99, data: new Date(2025, 4, 10), categoria: 'Contas' },
  { id: '3', descricao: 'Almoço', valor: 32.5, data: diasAtras(1), categoria: 'Alimentação' },
  { id: '4', descricao: 'Uber', valor: 27.9, data: diasAtras(3), categoria: 'Transporte' },
  { id: '5', descricao: 'Cinema', valor: 45.0, data: diasAtras(5), categoria: 'Lazer' },
  { id: '6', descricao: 'Mercado', valor: 180.0, data: diasAtras(20), categoria: 'Alimentação' },
];

export const DespesasContext = createContext({
  despesas: [],
  addDespesa: () => {},
});

function DespesasProvider({ children }) {
  const [despesas, setDespesas] = useState(DUMMY_DESPESAS);

  function addDespesa(despesa) {
    setDespesas((atual) => [despesa, ...atual]);
  }

  return (
    <DespesasContext.Provider value={{ despesas, addDespesa }}>
      {children}
    </DespesasContext.Provider>
  );
}

export default DespesasProvider;
