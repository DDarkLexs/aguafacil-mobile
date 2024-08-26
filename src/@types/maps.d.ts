interface Coordinates {
    lat: number;
    lon: number;
}

type DestinationTripProps = {
    origem: number[]; // Tipo tuple para latitude e longitude
    destino: number[]; // Tipo tuple para latitude e longitude
    driverLocation: number[]
  };
  