import React from "react";
import { useEffect } from "react";
import { Popup } from "react-map-gl";
function MapPopup({
  latitude = 35,
  longitude = 42,
  children = "You are here",
  setShowPopup,
}) {
  useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("unmounted");
    };
  }, []);

  return (
    <Popup
      onClose={() => setShowPopup(false)}
      closeOnClick={false}
      latitude={latitude}
      longitude={longitude}
      anchor="center"
    >
      <div className="w-100 h-100 bg-white">{children}</div>
    </Popup>
  );
}

export default MapPopup;
