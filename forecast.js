import FetchWrapper from "./fetch-wrapper";

const forecastAPI = new FetchWrapper(
  "https://api.weatherstack.com/forecast?access_key=b6e2ad6652f1fc70de70984eb100caac&query="
);

const getForecast = async () => {
  const data = forecastAPI.get(`${searchInput.value}`);
};
