import axios from "axios";

export const fetchNews = async (countryCode) => {
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const API_URL = process.env.REACT_APP_NEWS_API_URL;
  const url = `${API_URL}?country=${countryCode}&language=en&apiKey=${API_KEY}`;
  const options = {
    method: "GET",
    url: url,
  };

  const response = await axios.request(options);
  return response;
};
