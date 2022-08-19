import { Marker } from "react-map-gl";

const MapMarker = ({
  latitude,
  longitude,
  children,
  setMapOptions,
  ...props
}) => {
  const clickHandler = () => {
    //TODO
  };
  const hooverHandle = () => {
    //TODO: show popup
  };

  return (
    <Marker
      onMouseEnter={hooverHandle}
      latitude={latitude}
      longitude={longitude}
      {...props}
    >
      <span
        onClick={clickHandler}
        className="hover:cursor-pointer text-[#1c2839] tracking-wider bg-[#d2e0e7] rounded-xl px-4 flex items-center"
      >
        {children}
      </span>
    </Marker>
  );
};

export default MapMarker;
