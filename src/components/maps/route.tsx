import Mapbox from '@rnmapbox/maps';
import {MAPBOX_TOKEN} from 'app/constants/Index';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';

Mapbox.setAccessToken(MAPBOX_TOKEN);

const DestinationTrip: React.FC<DestinationTripProps> = rotas => {
  const mapRef = React.useRef<Mapbox.MapView>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<number[][]>([]);
  const destinoLatitude = rotas.destino[0];
  const destinoLongitude = rotas.destino[1];

  // Separando as coordenadas de origem
  const origemLatitude = rotas.origem[0];
  const origemLongitude = rotas.origem[1];

  const origem = [origemLongitude, origemLatitude];
  const destino = [destinoLongitude, destinoLatitude];

  const theme = useTheme();

  const coordinates = [origem, destino]; // Array com as coordenadas de origem e destino
  console.log(coordinates);
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origemLongitude},${origemLatitude};${destinoLongitude},${destinoLatitude}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0].geometry.coordinates;
          setRouteCoordinates(route);
        } else {
          console.error('Nenhuma rota encontrada.');
        }
      } catch (error) {
        console.error('Erro ao buscar a rota:', error);
      }
    };

    fetchRoute();
  }, [origemLatitude, origemLongitude, destinoLatitude, destinoLongitude]);

  return (
    <Mapbox.MapView logoEnabled={false} ref={mapRef} style={styles.map}>
      <Mapbox.PointAnnotation draggable={true} id="origin" coordinate={origem}>
        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
      </Mapbox.PointAnnotation>

      <Mapbox.PointAnnotation id="destination" coordinate={destino}>
        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
      </Mapbox.PointAnnotation>

      <Mapbox.PointAnnotation
        id="motoristaLocation"
        coordinate={rotas.driverLocation}>
        <View style={styles.markerMotorista}>
          {/* <View style={styles.annotationFill} /> */}
        </View>
      </Mapbox.PointAnnotation>
      <Mapbox.Camera
        zoomLevel={11}
        centerCoordinate={rotas.driverLocation}
        // Tente centralizar no meio entre origem e destino, se necessário
      />
      <Mapbox.ShapeSource
        id="routeLineSource"
        shape={{
          type: 'Feature',
          id: 'routeLine',
          geometry: {
            type: 'LineString',
            coordinates: routeCoordinates,
          },
          properties: {},
        }}>
        <Mapbox.LineLayer
          id="routeLine"
          style={{
            lineColor: theme.colors.tertiary,
            lineWidth: 2,
            lineCap: Mapbox.LineJoin.Round,
          }}
        />
      </Mapbox.ShapeSource>
    </Mapbox.MapView>
  );
};

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  map: {
    height: 300,
  },
  annotationContainer: {
    width: 10,
    height: 10,
    backgroundColor: '#007bff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerMotorista: {
    width: 10,
    height: 10,
    backgroundColor: '#14ECD4',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  annotationFill: {
    width: 20,
    height: 20,
    borderRadius: 10,
    transform: [{scale: 0.6}],
  },
});

export default DestinationTrip;
