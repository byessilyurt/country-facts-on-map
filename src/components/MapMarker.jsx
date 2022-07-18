import { Marker } from "react-map-gl";

const MapMarker = ({
  latitude,
  longitude,
  children,
  setMapOptions,
  ...props
}) => {
  const hooverHandle = () => {
    console.log("hooverHandler");
  };

  return (
    <div>
      <Marker
        onClick={hooverHandle}
        onMouseEnter={hooverHandle}
        latitude={latitude}
        longitude={longitude}
        {...props}
      >
        {children}
      </Marker>
    </div>
  );
};

export default MapMarker;
