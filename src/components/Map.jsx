import React, { useRef, useEffect, useState } from "react";
import Map from "react-map-gl";
import MapMarker from "./MapMarker";
import { fetchNews } from "../data/news";
import { randomCountryCode } from "../utils";
import Button from "./Button";

const MapBox = () => {
  const [news, setNews] = useState([]);
  const [marker, setMarker] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const randomCountry = randomCountryCode();
      console.log("random country selected: ", randomCountry);
      const result = await fetchNews(randomCountry.alpha2.toLowerCase());
      if (result.status == 200) {
        console.log("result ok and there is article");
        console.log(result.data);
        setNews(result.data.articles);
        setMarker({
          latitude: randomCountry.latitude,
          longitude: randomCountry.longitude,
        });
      } else {
        console.log("fetching news again");

        fetch();
      }
    };
    if (isActive) {
      fetch();
    }
    console.log(isActive, "isActive");
  }, [isActive]);

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
      <Button isActive={isActive} setIsActive={setIsActive} />
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

        {/* <MapMarker
          key={country.name}
          latitude={country.latitude}
          longitude={country.longitude}
          name={country.name}
          countryCode={country.country_code}
        /> */}
      </Map>
    </>
  );
};

export default MapBox;
