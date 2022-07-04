import React, { useRef, useEffect, useState } from "react";
import Map from "react-map-gl";
import countryCodes from "../data/countryCodes";
import MapMarker from "./MapMarker";
import { fetchNews } from "../data/news";
import { getCountryLocation, randomCountryCode } from "../utils";

// fetch news data from API
// match news data to country_codes
// randomly select a country and point it to the map
// display a marker with an image of the country
// when hoovered and waited 1s pop up the news
// when unhoovered move to the next news
// place a button to pause movement

const MapBox = () => {
  const [randomCountry, setRandomCountry] = useState();
  const [countryCode, setCountryCode] = useState();
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = randomCountryCode();
      setRandomCountry(res);
      console.log(randomCountry.alpha2.toLowerCase());
      console.log(randomCountry);
      const result = await fetchNews(countryCode);
      if (result.status !== "ok") {
        fetch();
        console.log("no news found");
      } else {
        setNews(result.data);
        console.log(news);
      }
    };
    fetch();
  }, []);

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
