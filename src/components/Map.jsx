import React, { useRef, useEffect, useState } from "react";
import Map from "react-map-gl";
import MapMarker from "./MapMarker";
import { fetchNews } from "../data/news";
import { randomCountryCode } from "../utils";
import Button from "./Button";
import { useFetchNews } from "../hooks/fetchNews";

const MapBox = () => {
  const [news, setNews] = useState([]);
  const [marker, setMarker] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [prevCountries, setPrevCountries] = useState([]);
  const [previous, setPrevious] = useState(false);
  const fetch = useFetchNews(
    news,
    setNews,
    marker,
    setMarker,
    isActive,
    setIsActive,
    prevCountries,
    setPrevCountries,
    previous,
    setPrevious
  );
  const [mapOptions, setMapOptions] = useState({
    initialViewState: {
      latitude: 36,
      longitude: 42,
      zoom: 1.6,
    },
    style: {
      width: "100vw",
      height: "100vh",
    },
    mapStyle: "mapbox://styles/mapbox/streets-v11",
  });
  return (
    <>
      <Button
        isActive={isActive}
        setIsActive={setIsActive}
        setPrevious={setPrevious}
        prevCountries={prevCountries}
      />
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        initialViewState={mapOptions.initialViewState}
        style={mapOptions.style}
        projection={mapOptions.projection}
        attributionControl={false}
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
          <MapMarker latitude={marker.latitude} longitude={marker.longitude} />
        )}
      </Map>
    </>
  );
};

export default MapBox;
