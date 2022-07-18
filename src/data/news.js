import axios from "axios";

export const fetchNews = async (countryCode) => {
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const API_URL = process.env.REACT_APP_NEWS_API_URL;
  console.log(API_KEY);
  const url = `${API_URL}?country=${countryCode}&language=en&apiKey=${API_KEY}`;
  console.log("API URL", url);
  const options = {
    method: "GET",
    url: url,
  };

  const response = await axios.request(options);
  return response;
};
