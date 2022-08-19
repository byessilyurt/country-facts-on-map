import { useEffect, useState, useCallback } from "react";
import { randomCountryCode } from "../utils";
import { fetchNews } from "../data/news";

export const useFetchNews = () => {
  const [news, setNews] = useState([]);
  const [marker, setMarker] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [center, setCenter] = useState([]);

  const fetch = useCallback(async () => {
    let countryToFetchNews;
    countryToFetchNews = randomCountryCode();
    const result = await fetchNews(countryToFetchNews.alpha2.toLowerCase());

    if (
      !(countryToFetchNews.longitude < -90) ||
      !(countryToFetchNews.longitude > 90) ||
      !(countryToFetchNews.latitude < -90) ||
      !(countryToFetchNews.latitude > 90)
    ) {
      setNews(result.data);
      setMarker({
        latitude: countryToFetchNews.latitude,
        longitude: countryToFetchNews.longitude,
        country: countryToFetchNews.country,
      });
      setIsActive(false);
      setCenter([countryToFetchNews.latitude, countryToFetchNews.longitude]);
    } else {
      fetch();
    }
  }, [setNews, setMarker, setIsActive, setCenter]);

  useEffect(() => {
    if (isActive) {
      fetch();
    }
  }, [isActive, fetch]);

  return { news, marker, isActive, setIsActive, center };
};
