import { View } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

function DespesaSaida({ despesas, periodo, numColumns, emptyTitle, emptyHint }) {
  return (
    <View style={{ flex: 1 }}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      <DespesaLista
        despesas={despesas}
        numColumns={numColumns}
        emptyTitle={emptyTitle}
        emptyHint={emptyHint}
      />
    </View>
  );
}

export default DespesaSaida;
