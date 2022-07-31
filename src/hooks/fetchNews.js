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
    if (result.status === 200 && result.data.articles.length > 0) {
      console.log("result ok and there are articles");
      setNews(result.data.articles);
      console.log(result.data);
      setMarker({
        latitude: countryToFetchNews.latitude,
        longitude: countryToFetchNews.longitude,
        country: countryToFetchNews.country,
      });
      setIsActive(false);
      setCenter([countryToFetchNews.latitude, countryToFetchNews.longitude]);
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

  return { news, marker, isActive, setIsActive, center };
};
