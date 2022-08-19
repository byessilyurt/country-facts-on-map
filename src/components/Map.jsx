import React, { useEffect, useState, useRef, useCallback } from "react";
import Map from "react-map-gl";
import { useFetchNews } from "../hooks/fetchNews";

import MapMarker from "./MapMarker";
import Button from "./Button";
import MapPopup from "./MapPopup";

const ZOOM = 2;
const SPEED = 0.3;
const CURVE = 1;
const MAP_WIDTH = "100vw";
const MAP_HEIGHT = "100vh";
const MAP_STYLE = "mapbox://styles/byessilyurt/cl5r6psud000015pgqokz266x";
const MAP_PROJECTION = "globe";

const MAP_OPTIONS = {
  initialViewState: center,
  style: {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
  },
  mapStyle: MAP_STYLE,
  projection: MAP_PROJECTION,
};

const flyToNextCountry = () => {
  return {
    center,
    zoom: ZOOM,
    speed: SPEED,
    curve: CURVE,
    easing(t) {
      return t;
    },
  };
};

const mapBoxPopup = () => {
  return (
    <MapPopup
      latitude={center[0]}
      longitude={center[1]}
      setShowPopup={setShowPopup}
    />
  );
};

const mapBoxMarker = () => {
  return (
    <MapMarker
      onClick={() => setShowPopup(true)}
      latitude={center[0]}
      longitude={center[1]}
      setMapOptions={setMapOptions}
    >
      {marker.country}
    </MapMarker>
  );
};

const mapOnLoad = useCallback(
  (e) => {
    try {
      e.target.flyTo(flyToNextCountry(center));
    } catch {}
  },
  [center]
);

const MapBox = () => {
  const [showPopup, setShowPopup] = useState(false);
  const mapRef = useRef();
  const { marker, news, center, isActive, setIsActive } = useFetchNews();
  const onCountryChange = useCallback((center) => {
    mapRef.current?.flyTo(flyToNextCountry(center));
  }, []);
  const [mapOptions, setMapOptions] = useState(MAP_OPTIONS);

  const onViewPortChange = (viewport) => {
    setMapOptions({
      ...mapOptions,
      initialViewState: {
        ...mapOptions.initialViewState,
        ...viewport,
      },
    });
  };

  useEffect(() => {
    onCountryChange(center);
  }, [center, onCountryChange]);

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
        onViewPortChange={onViewPortChange}
      >
        {marker && mapBoxMarker()}
        {showPopup && mapBoxPopup()}
      </Map>
    </>
  );
};

export default MapBox;
