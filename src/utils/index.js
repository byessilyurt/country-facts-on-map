import countryCodes from "../data/countryCodes";

export const randomCountryCode = () => {
  const randomCountry =
    countryCodes[Math.floor(Math.random() * countryCodes.length)];

  return randomCountry;
};

export const getCountryLocation = (countryCode) => {
  countryCodes.forEach((country) => {
    if (country.alpha2 === countryCode) {
      return JSON.stringify(country);
    }
  });
};
