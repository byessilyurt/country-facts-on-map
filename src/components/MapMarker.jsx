import { Marker } from "react-map-gl";

const MapMarker = ({ latitude, longitude, children, ...props }) => {
  return (
    <Marker latitude={latitude} longitude={longitude} {...props}>
      {children}
    </Marker>
  );
};

export default MapMarker;
