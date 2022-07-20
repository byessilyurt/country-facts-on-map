import { useEffect, useState, useCallback } from "react";
import { randomCountryCode } from "../utils";
import { fetchNews } from "../data/news";
export const useFetchNews = (
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
) => {
  const fetch = useCallback(async () => {
    let countryToFetchNews;
    // if (previous) {
    //   countryToFetchNews = prevCountries[prevCountries.length - 1 - 1]; // last index is the current country
    //   prevCountries.pop();
    //   console.log("PREVIOUS: ", countryToFetchNews);
    // } else {
    //   countryToFetchNews = randomCountryCode();
    //   console.log("RANDOM COUNTRY: ", countryToFetchNews);
    // }
    // // if there is news on localstorage then fetch it
    // if (localStorage.getItem(countryToFetchNews)) {
    //   setNews(JSON.parse(localStorage.getItem(countryToFetchNews)));
    // }
    // // if there is no news on localstorage then fetch it
    // else {
    countryToFetchNews = randomCountryCode();
    const result = await fetchNews(countryToFetchNews.alpha2.toLowerCase());
    if (result.status === 200 && result.data.articles.length > 0) {
      console.log("result ok and there are articles");
      setNews(result.data.articles);
      console.log(result.data);
      setMarker({
        latitude: countryToFetchNews.latitude,
        longitude: countryToFetchNews.longitude,
      });
      setIsActive(false);
      setCenter({
        latitude: countryToFetchNews.latitude,
        longitude: countryToFetchNews.longitude,
        zoom: 2,
      });

      // setPrevCountries((prevCountries) => [
      //   ...prevCountries,
      //   {
      //     name: countryToFetchNews.country,
      //     alpha2: countryToFetchNews.alpha2,
      //     latitude: countryToFetchNews.latitude,
      //     longitude: countryToFetchNews.longitude,
      //   },
      // ]);
    } else {
      console.log("fetching news again");
      fetch();
    }
  }, [setNews, setMarker, setIsActive, setCenter]);

  useEffect(() => {
    if (isActive) {
      fetch();
    } else {
      console.log("not active");
    }
  }, [isActive, fetch]);
};
