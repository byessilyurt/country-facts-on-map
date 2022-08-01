import React, { useEffect, useState, useRef, useCallback } from "react";
import Map, { Popup } from "react-map-gl";
import MapMarker from "./MapMarker";
import Button from "./Button";
import { useFetchNews } from "../hooks/fetchNews";

const MapBox = () => {
  const [showPopup, setShowPopup] = useState(false);
  const mapRef = useRef();
  const { marker, news, center, isActive, setIsActive } = useFetchNews();
  const onCountryChange = useCallback(({ longitude, latitude }) => {
    console.log("lon:", longitude);
    console.log("lat:", latitude);
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      zoom: 2.4,
      speed: 0.2,
      curve: 1.3,
      easing(t) {
        return t;
      },
    });
  }, []);
  const [mapOptions, setMapOptions] = useState({
    initialViewState: center,
    style: {
      width: "100vw",
      height: "100vh",
    },
    mapStyle: "mapbox://styles/byessilyurt/cl5r6psud000015pgqokz266x",
    projection: "globe",
  });

  useEffect(() => {
    onCountryChange({ longitude: center[1], latitude: center[0] });
  }, [center, onCountryChange]);

  const mapOnLoad = useCallback(
    (e) => {
      console.log("flyto: ", e.target.flyTo);
      e.target.flyTo({
        center,
        zoom: 2,
        speed: 0.3,
        curve: 1,
        easing(t) {
          return t;
        },
      });
    },
    [center]
  );

  return (
    <>
      <Button isActive={isActive} setIsActive={setIsActive} />
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onLoad={(e) => mapOnLoad(e)}
        initialViewState={center}
        style={mapOptions.style}
        projection={mapOptions.projection}
        mapStyle={mapOptions.mapStyle}
        onViewPortChange={(viewport) => {
          setMapOptions({
            ...mapOptions,
            initialViewState: {
              ...mapOptions.initialViewState,
              ...viewport,
            },
          });
        }}
      >
        {marker && (
          <MapMarker
            onClick={() => {
              setShowPopup(true);
            }}
            latitude={center[0]}
            longitude={center[1]}
            setMapOptions={setMapOptions}
          >
            <div className="text-red-300 bg-white px-4 py-2 flex items-center">
              {marker.country}
            </div>
          </MapMarker>
        )}
        {showPopup && (
          <Popup
            latitude={center[0]}
            longitude={center[1]}
            anchor="center"
            onClose={() => setShowPopup(false)}
          >
            {JSON.stringify(news)}
          </Popup>
        )}
      </Map>
    </>
  );
};

export default MapBox;
