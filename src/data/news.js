import axios from "axios";

export const fetchNews = async (countryCode) => {
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

  const options = {
    headers: { "X-Api-Key": `${API_KEY}` },
    method: "GET",
    url: `https://api.api-ninjas.com/v1/country?name=${countryCode}`,
  };

  const response = await axios.request(options);
  console.log(response);
  return response;
};
