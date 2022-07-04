import countryCodes from "../data/countryCodes";

export const randomCountryCode = () => {
  // get country codes from /data/countryCodes.js and randomly select one
  const randomCountry =
    countryCodes[Math.floor(Math.random() * countryCodes.length)];

  return randomCountry;
};

export const getCountryLocation = (countryCode) => {
  // get country location from /data/countryCodes.js

  countryCodes.forEach((country) => {
    if (country.alpha2 === countryCode) {
      return JSON.stringify(country);
    }
  });
};
