import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

const requestPermissions = (permission: any) => {
  /* return new Promise((resolve,reject) => {

  }) */
  try {
    if (Platform.OS === 'android') {
      const granted = PermissionsAndroid.request(permission, {
        title: 'Permissão necessária',
        message:
          'Precisamos da sua permissão para acessar essa funcionalidade.',
        buttonPositive: 'Permitir',
      });
      return granted;
    } else {
      return true; // No permissions needed for other platforms
    }
  } catch (error) {
    console.error('Erro ao solicitar permissão:', error);
    return false;
  }
};

export const getMyLocation = async (): Promise<{ latitude: number, longitude: number }> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        // // // console.log(position.coords);
        const { latitude, longitude } = position.coords;
        // // // console.log(`Current location: ${latitude}, ${longitude}`);
        resolve({ latitude, longitude });

        // Update your map to display the current location
      },
      (error: any) => reject(error),
      { enableHighAccuracy: false, timeout: 100000, maximumAge: 1000 },
    );
  });
};

export default requestPermissions;
