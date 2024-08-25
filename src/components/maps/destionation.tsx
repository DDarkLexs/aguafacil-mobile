import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoiZGRhcmtsZXhzIiwiYSI6ImNseXZneDZlcTB2bTMybXFyd2lyYnp3bzQifQ.NFRbaowY-x0JgvwKEQeRHw');

const App = () => {
  return (

        <Mapbox.MapView style={styles.map} />

  );
}


const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    height: 300,
    width: 300,
  },
  map: {
    flex: 1
  }
});
export default App;