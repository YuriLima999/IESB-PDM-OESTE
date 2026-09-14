# Minhas Metas

## Descrição

Aplicativo desenvolvido em React Native com Expo para cadastro e gerenciamento de metas do semestre.

O aplicativo permite adicionar metas, visualizar as metas cadastradas e excluir metas. As informações são armazenadas localmente utilizando o AsyncStorage, permitindo que as metas continuem disponíveis mesmo após fechar e abrir o aplicativo novamente.

## Funcionalidades

- Adicionar novas metas.
- Impedir o cadastro de metas vazias.
- Exibir uma mensagem de alerta quando o campo estiver vazio.
- Excluir metas cadastradas.
- Exibir a data de criação de cada meta.
- Armazenar as metas utilizando AsyncStorage.
- Carregar automaticamente as metas salvas ao iniciar o aplicativo.
- Salvar automaticamente as alterações realizadas na lista.

## Tecnologias utilizadas

- React Native
- Expo
- JavaScript
- AsyncStorage
- React Native Safe Area Context

## Estrutura do projeto

```text
MeuDiarioAcademico/
│
├── assets/
│   └── imagem utilizada no cabeçalho
│
├── components/
│   ├── MetaInput.js
│   └── MetaList.js
│
├── App.js
├── package.json
└── README.md

### Adicionar meta

```md
## Como funciona

### Adicionar uma meta

Para adicionar uma meta, o usuário digita o texto no campo de entrada e pressiona o botão "Adicionar".

Antes de cadastrar a meta, o aplicativo verifica se o campo está vazio. Caso esteja, é exibido um Alert informando que o campo não pode estar vazio.

Quando uma meta válida é adicionada, é criado um objeto contendo:

- `id`: identificador único da meta;
- `texto`: texto digitado pelo usuário;
- `criadaEm`: data em que a meta foi criada.