import { Pressable, Text, StyleSheet } from 'react-native';

// Aceita ...rest para funcionar também dentro de <Link asChild>
function AppButton({ title, onPress, variant = 'primary', ...rest }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondary,
        pressed && styles.pressed,
      ]}
      {...rest}
    >
      <Text style={[styles.text, variant === 'secondary' && styles.textSecondary]}>{title}</Text>
    </Pressable>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b6fd4',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
  },
  secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#3b6fd4' },
  pressed: { opacity: 0.7 },
  text: { color: 'white', fontWeight: 'bold' },
  textSecondary: { color: '#3b6fd4' },
});
