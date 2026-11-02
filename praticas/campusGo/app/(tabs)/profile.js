import { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from '../../components/AppButton';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);

  // Relê a foto salva quando a tela abre
  useEffect(() => {
    async function loadPhoto() {
      try {
        const saved = await AsyncStorage.getItem(PHOTO_KEY);
        if (saved) setPhotoUri(saved);
      } catch (e) {
        console.log('Erro ao ler a foto:', e);
      }
    }
    loadPhoto();
  }, []);

  async function savePhoto(uri) {
    if (!uri) return;
    setPhotoUri(uri);
    try {
      await AsyncStorage.setItem(PHOTO_KEY, uri);
    } catch (e) {
      console.log('Erro ao salvar a foto:', e);
    }
  }

  async function handlePick() {
    try {
      savePhoto(await pickImage());
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível abrir a galeria.');
    }
  }

  async function handleTake() {
    try {
      savePhoto(await takePhoto());
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível abrir a câmera.');
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePick}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Ionicons name="person" size={64} color="#999" />
          </View>
        )}
      </Pressable>
      <Text style={styles.hint}>Toque na foto para escolher da galeria</Text>

      <AppButton title="Tirar foto com a câmera" variant="secondary" onPress={handleTake} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24 },
  avatar: { width: 140, height: 140, borderRadius: 70, marginTop: 24 },
  placeholder: { backgroundColor: '#e5e5ea', alignItems: 'center', justifyContent: 'center' },
  hint: { marginVertical: 12, color: '#666' },
});
