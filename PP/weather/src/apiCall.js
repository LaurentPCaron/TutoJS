const axios = require('axios').default;

const callAPI = async (endUrl, query) => {
  return await axios
    .get(`https://www.metaweather.com/api${endUrl}`, {
      params: query ? { query: query } : {},
    })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      const errorMessage = `${err.response.status}:${err.response.statusText}`;
      throw new Error(errorMessage);
    });
};

const fetchCityId = async query => {
  return await callAPI('/location/search/', query)
    .then(results => {
      if (results.length === 0) {
        throw new Error(`No result for "${query}"`);
      }
      return results.map(result => {
        return { title: result.title, locationId: result.woeid };
      });
    })
    .catch(err => {
      throw new Error(err.message);
    });
};

const fetchWeather = async locationID => {
  if (!Number.isInteger(locationID) || locationID < 0) {
    throw new Error('parameter "locationID" invalid.');
  }
  return await callAPI(`/location/${locationID}`)
    .then(({ consolidated_weather }) => {
      const result = consolidated_weather[0];
      return {
        weather_name: result.weather_state_name,
        weather_code: result.weather_state_abbr,
        temp: result.the_temp,
        min_temp: result.min_temp,
        max_temp: result.max_temp,
      };
    })
    .catch(err => {
      throw new Error(err.message);
    });
};
module.exports = { fetchCityId, fetchWeather };
