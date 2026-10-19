export const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

// Retorna apenas as despesas da categoria selecionada ('' ou 'Todas' = sem filtro)
export function filtrarPorCategoria(despesas, categoria) {
  if (!categoria || categoria === 'Todas') {
    return despesas;
  }
  return despesas.filter((despesa) => despesa.categoria === categoria);
}

// Retorna as despesas dos últimos 7 dias, sem despesas futuras
export function filtrarUltimos7Dias(despesas) {
  const hoje = new Date();
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(hoje.getDate() - 7);

  return despesas.filter(
    (despesa) => despesa.data >= seteDiasAtras && despesa.data <= hoje
  );
}
