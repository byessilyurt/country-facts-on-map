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
  const [center, setCenter] = useState([36, 42]);

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
    mapStyle: "mapbox://styles/byessilyurt/cl5r6psud000015pgqokz266x",
    projection: "globe",
  });

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
    setPrevious,
    center,
    setCenter
  );

  // useEffect(() => {
  //   Map.jumpTo({
  //     center: center,
  //     zoom: 4,
  //     pitch: 45,
  //     bearing: 90,
  //   });
  // }, [center]);

  return (
    /// TODO
    /// 1. Add a button to change to select in which languages they want to read news

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
            latitude={marker.latitude}
            longitude={marker.longitude}
            setMapOptions={setMapOptions}
          />
        )}
      </Map>
    </>
  );
};

export default MapBox;
