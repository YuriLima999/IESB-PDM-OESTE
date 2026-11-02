import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

const OPTIONS = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.7,
};

// Abre a galeria e devolve a URI escolhida (ou null se cancelar)
export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync(OPTIONS);
  if (result.canceled) return null;
  return result.assets[0].uri;
}

// Pede permissão da câmera antes de abrir; se negada, oferece abrir os ajustes
export async function takePhoto() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    Alert.alert(
      'Permissão da câmera negada',
      'Para tirar uma foto, permita o acesso à câmera nos ajustes do aparelho.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]
    );
    return null;
  }
  const result = await ImagePicker.launchCameraAsync(OPTIONS);
  if (result.canceled) return null;
  return result.assets[0].uri;
}
