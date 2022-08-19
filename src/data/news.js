import axios from "axios";

export const fetchNews = async (countryCode) => {
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const API_URL = process.env.REACT_APP_NEWS_API_URL;

  const options = {
    headers: { "X-Api-Key": `${API_KEY}` },
    method: "GET",
    url: `${API_URL}${countryCode}`,
  };

  return await axios.request(options);
};
