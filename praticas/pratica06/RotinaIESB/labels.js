// labels.js
// Aula 03 — Import/export: arquivo centralizado de rótulos (textos) do app.
// Usar "export const" (export nomeado) para cada rótulo.

export const tituloApp = 'RotinaIESB';
export const subtituloApp = 'Organize sua rotina acadêmica';

export const placeholderCompromisso = 'Digite um compromisso (ex: Aula de POO às 19h)';
export const botaoAdicionar = 'Adicionar';

export const tituloLista = 'Meus compromissos';
export const listaVazia = 'Nenhum compromisso cadastrado ainda. Adicione o primeiro acima!';

export const textoAlertaVazio = 'Digite um compromisso antes de adicionar.';
export const tituloAlertaVazio = 'Campo vazio';

export const textoErroStorage = 'Não foi possível salvar/carregar seus compromissos agora.';

export const categorias = ['aula', 'estudo', 'trabalho', 'lazer'];

export const contadorPendentes = (quantidade) =>
  `${quantidade} pendente${quantidade === 1 ? '' : 's'}`;
