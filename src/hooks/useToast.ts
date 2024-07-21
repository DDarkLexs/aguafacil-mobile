import {useMemo} from 'react';
import Toast from 'react-native-toast-message';

export const useAppToast = () => {
  const showPrimaryToast = ({
    img = require('app/assets/images/icon.png'),
    text1 = '',
    text2 = '',
  }: Partial<ToastNotificationProps>) => {
    Toast.show({
      type: 'PrimaryNotification',
      visibilityTime: 10000,
      text1,
      text2,
      props: {},
    });
  };

  const showErrorToast = ({
    img = require('../assets/images/close.png'),
    text1 = '',
    text2 = '',
  }: Partial<ToastNotificationProps>) => {
    Toast.show({
      type: 'ErrorNotification',
      visibilityTime: 10000,
      text1,
      text2,
      // And I can pass any custom props I want
      props: {img},
    });
  };

  return useMemo(
    () => ({showPrimaryToast, showErrorToast}),
    [showPrimaryToast, showErrorToast],
  );
};
