import { View, Text, Pressable, StyleSheet, Platform, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getColors } from '../../constants/theme';

function getDataFormatada(data) {
  return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
}

function DespesaItem({ item }) {
  const navigation = useNavigation();
  const colors = getColors(useColorScheme());

  return (
    <Pressable
      onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: item.id })}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.row}>
        <Text style={[styles.description, { color: colors.text }]} numberOfLines={1}>
          {item.description}
        </Text>
        <Text style={[styles.amount, { color: colors.text }]}>
          R$ {item.amount.toFixed(2)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={{ color: colors.textSecondary }}>{getDataFormatada(item.date)}</Text>
        <View style={[styles.tag, { backgroundColor: colors.tag }]}>
          <Text style={[styles.tagText, { color: colors.tagText }]}>{item.category}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  card: {
    margin: 6,
    padding: 12,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
    }),
  },
  pressed: { opacity: 0.7 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 3,
  },
  description: { flex: 1, fontSize: 16, fontWeight: '600', marginRight: 8 },
  amount: { fontSize: 16, fontWeight: 'bold' },
  tag: { paddingVertical: 2, paddingHorizontal: 10, borderRadius: 12 },
  tagText: { fontSize: 11 },
});
