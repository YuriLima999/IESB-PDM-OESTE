import * as Location from 'expo-location';

// Devolve { latitude, longitude, label } ou null se a permissão for negada
export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }

  const position = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = position.coords;

  let label = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  try {
    const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (address) {
      const text = [address.street, address.district || address.subregion, address.city]
        .filter(Boolean)
        .join(', ');
      if (text) label = text;
    }
  } catch (error) {
    // sem endereço: mantém as coordenadas como rótulo
  }

  return { latitude, longitude, label };
}
