import { Marker } from "react-map-gl";

const MapMarker = ({
  latitude,
  longitude,
  children,
  setMapOptions,
  setShowPopup,
  ...props
}) => {
  const clickHandler = () => {
    setShowPopup(true);
    console.log("clicked");
  };
  const hooverHandle = () => {
    console.log("hooverHandler");
  };

  return (
    <div>
      <Marker
        onClick={clickHandler}
        onMouseEnter={hooverHandle}
        latitude={latitude}
        longitude={longitude}
        {...props}
      >
        <div className="hover:cursor-pointer text-[#1c2839] tracking-wider bg-[#d2e0e7] rounded-xl px-4 flex items-center">
          {children}
        </div>
      </Marker>
    </div>
  );
};

export default MapMarker;
