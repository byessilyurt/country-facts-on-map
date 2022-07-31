import React, { useEffect, useState, useRef, useCallback } from "react";
import Map, {
  FullscreenControl,
  NavigationControl,
  GeolocateControl,
  ScaleControl,
  Popup,
} from "react-map-gl";
import MapMarker from "./MapMarker";
import Button from "./Button";
import { useFetchNews } from "../hooks/fetchNews";

const MapBox = () => {
  const [showPopup, setShowPopup] = useState(false);
  const mapRef = useRef();
  const { marker, news, center, isActive, setIsActive } = useFetchNews();
  const onCountryChange = useCallback(
    ({ longitude, latitude }) => {
      mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
    },
    [center]
  );
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
    console.log(center);
    onCountryChange({ longitude: center[1], latitude: center[0] });
  }, [center]);

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
        <FullscreenControl />
        <NavigationControl />
        <GeolocateControl />
        <ScaleControl />

        {marker && (
          <MapMarker
            onClick={() => {
              setShowPopup(true);
            }}
            latitude={marker.latitude}
            longitude={marker.longitude}
            setMapOptions={setMapOptions}
          />
        )}
        {showPopup && (
          <Popup
            longitude={marker.longitude}
            latitude={marker.latitude}
            anchor="center"
            onClose={() => setShowPopup(false)}
          >
            {news}
          </Popup>
        )}
      </Map>
    </>
  );
};

export default MapBox;
