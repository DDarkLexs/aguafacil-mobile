import {configureFonts} from 'react-native-paper';
import {MD3DarkTheme, MD3LightTheme} from '../modules';
import {fontConfig} from './Font';

// the first object is dark mode, the second is light mode
const light = {
  ...MD3LightTheme,
  fonts: configureFonts({config: fontConfig}),
  roundness: 5,
  colors: {
    primary: 'rgb(0, 109, 48)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(146, 249, 164)',
    onPrimaryContainer: 'rgb(0, 33, 10)',
    secondary: 'rgb(162, 63, 0)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(255, 219, 205)',
    onSecondaryContainer: 'rgb(54, 15, 0)',
    tertiary: 'rgb(98, 72, 197)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(230, 222, 255)',
    onTertiaryContainer: 'rgb(29, 0, 97)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(252, 253, 247)',
    onBackground: 'rgb(26, 28, 25)',
    surface: 'rgb(252, 253, 247)',
    onSurface: 'rgb(26, 28, 25)',
    surfaceVariant: 'rgb(221, 229, 218)',
    onSurfaceVariant: 'rgb(65, 73, 65)',
    outline: 'rgb(114, 121, 112)',
    outlineVariant: 'rgb(193, 201, 190)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(46, 49, 46)',
    inverseOnSurface: 'rgb(240, 241, 236)',
    inversePrimary: 'rgb(118, 220, 138)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(239, 246, 237)',
      level2: 'rgb(232, 242, 231)',
      level3: 'rgb(224, 237, 225)',
      level4: 'rgb(222, 236, 223)',
      level5: 'rgb(217, 233, 219)',
    },
    surfaceDisabled: 'rgba(26, 28, 25, 0.12)',
    onSurfaceDisabled: 'rgba(26, 28, 25, 0.38)',
    backdrop: 'rgba(43, 50, 43, 0.4)',
  },
};
const dark = {
  ...MD3DarkTheme,
  fonts: configureFonts({config: fontConfig}),
  roundness: 5,
  colors: {
    primary: 'rgb(118, 220, 138)',
    onPrimary: 'rgb(0, 57, 21)',
    primaryContainer: 'rgb(0, 83, 34)',
    onPrimaryContainer: 'rgb(146, 249, 164)',
    secondary: 'rgb(255, 181, 149)',
    onSecondary: 'rgb(87, 30, 0)',
    secondaryContainer: 'rgb(124, 46, 0)',
    onSecondaryContainer: 'rgb(255, 219, 205)',
    tertiary: 'rgb(203, 190, 255)',
    onTertiary: 'rgb(51, 3, 150)',
    tertiaryContainer: 'rgb(74, 44, 172)',
    onTertiaryContainer: 'rgb(230, 222, 255)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(26, 28, 25)',
    onBackground: 'rgb(226, 227, 221)',
    surface: 'rgb(26, 28, 25)',
    onSurface: 'rgb(226, 227, 221)',
    surfaceVariant: 'rgb(65, 73, 65)',
    onSurfaceVariant: 'rgb(193, 201, 190)',
    outline: 'rgb(139, 147, 137)',
    outlineVariant: 'rgb(65, 73, 65)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(226, 227, 221)',
    inverseOnSurface: 'rgb(46, 49, 46)',
    inversePrimary: 'rgb(0, 109, 48)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(31, 38, 31)',
      level2: 'rgb(33, 43, 34)',
      level3: 'rgb(36, 49, 37)',
      level4: 'rgb(37, 51, 39)',
      level5: 'rgb(39, 55, 41)',
    },
    surfaceDisabled: 'rgba(226, 227, 221, 0.12)',
    onSurfaceDisabled: 'rgba(226, 227, 221, 0.38)',
    backdrop: 'rgba(43, 50, 43, 0.4)',
  },
};

export {dark, light};
