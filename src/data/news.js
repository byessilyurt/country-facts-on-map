import axios from "axios";

export const fetchNews = async (countryCode) => {
  const options = {
    method: "GET",
    url: `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=e5a771bbd4e84b6b8294b3d968a74555`,
  };

  const response = await axios.request(options);
  return response;
};
