import {useMemo} from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import {useAppDispatch, useAppSelector} from './useRedux';

// export const useAuth = () => {
//   const dispatch = useAppDispatch();
//   const logOutAccount = async () => {
//     dispatch(clearInventario());
//     dispatch(setClearEntity());
//     // dispatch(setEndereco(eEndereco));
//     dispatch(logout());
//   };
//   const {token, usuario, authBiometrico} = useAppSelector(state => state.auth);

//   const biometricAuthentication = async () => {
//     try {
//       const biometrics = new ReactNativeBiometrics();
//       const {available, biometryType} = await biometrics.isSensorAvailable();
//       if (!authBiometrico) {
//         return true;
//       }
//       if (available) {
//         const result = await biometrics.simplePrompt({
//           promptMessage: 'Toque no sensor para autenticar',
//           cancelButtonText: 'Cancelar',
//         });

//         if (result.success) {
//           console.log('Autenticação biométrica bem-sucedida');
//           // Aqui você pode adicionar lógica adicional após a autenticação bem-sucedida
//           return true;
//         } else {
//           console.log('Autenticação biométrica cancelada ou falhou');
//           return false;
//         }
//       } else {
//         console.log(`Biometria não disponível. Tipo: ${biometryType}`);
//         return false;
//       }
//     } catch (error) {
//       console.error('Erro ao realizar autenticação biométrica', error);
//       return false;
//     }
//   };

//   return useMemo(
//     () => ({usuario, token, logOutAccount, biometricAuthentication}),
//     [usuario, token],
//   );
// };