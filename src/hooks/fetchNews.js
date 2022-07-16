import { useEffect, useState } from "react";
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
  previousCounter,
  setPreviousCounter
) => {
  const fetch = async () => {
    let countryToFetchNews;
    if (previous) {
      countryToFetchNews = prevCountries[prevCountries.length - 1];
      prevCountries.pop();
    } else {
      countryToFetchNews = randomCountryCode();
    }
    console.log("random country selected: ", countryToFetchNews);
    const result = await fetchNews(countryToFetchNews.alpha2.toLowerCase());
    if (result.status == 200) {
      console.log("result ok and there are articles");
      console.log(result.data);
      setNews(result.data.articles);
      setMarker({
        latitude: countryToFetchNews.latitude,
        longitude: countryToFetchNews.longitude,
      });
      setIsActive(false);
      setPrevCountries((prevCountries) => [
        ...prevCountries,
        {
          name: countryToFetchNews.country,
          alpha2: countryToFetchNews.alpha2,
        },
      ]);
    } else {
      console.log("fetching news again");
      fetch();
    }
  };

  useEffect(() => {
    if (isActive) {
      fetch();
    } else {
      console.log("not active");
    }
  }, [isActive]);
};
