import React, { useRef, useEffect, useState } from "react";
import Map, {
  FullscreenControl,
  NavigationControl,
  GeolocateControl,
  ScaleControl,
  Popup,
  useMap,
} from "react-map-gl";
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
  const [center, setCenter] = useState({
    latitude: 40,
    longitude: 40,
    zoom: 1,
  });
  const [showPopup, setShowPopup] = useState(true);
  const { current: map } = useMap();

  useEffect(() => {
    console.log(map);
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
  //   console.log("flying to ", center);
  //   Map.flyTo(center, 1200);
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
        onLoad={(e) => {
          console.log(e.target);
        }}
        viewState={center}
        style={mapOptions.style}
        projection={mapOptions.projection}
        mapStyle={mapOptions.mapStyle}
        onViewPortChange={(viewport) => {
          console.log("viewport", viewport);
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
            {console.log(news)}
            {news}
          </Popup>
        )}
      </Map>
    </>
  );
};

export default MapBox;
