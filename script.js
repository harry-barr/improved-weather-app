import FetchWrapper from "./fetch-wrapper.js";
const currentAPI = new FetchWrapper(
  "https://api.weatherstack.com/current?access_key=b6e2ad6652f1fc70de70984eb100caac&query="
);
const searchInput = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");
const cityName = document.querySelector(".city-name");
const cityTemp = document.querySelector(".city-temp");
const cityDesc = document.querySelector(".city-desc");
const feelsLike = document.querySelector(".temp-feels-like");
const date = document.querySelector(".date");
const currentWeather = document.querySelector(".current-weather-container");

const lowerCaseAndHypenate = () => {
  searchInput.value.trim().replaceAll(" ", "-").toLowerCase();
};

const getWeather = async () => {
  currentWeather.innerHTML = "";
  lowerCaseAndHypenate();
  if (!searchInput.value) {
    return alert("You must type in a city name!");
  }
  try {
    const data = await currentAPI.get(`${searchInput.value}`);
    console.log(data);
    currentWeather.insertAdjacentHTML(
      "beforeend",
      `<div>
          <h1 class="city-name">${data.location.name}</h1>
        </div>
        <div class="container">
          <div class="current-weather">
            <h2 class="city-temp">${data.current.temperature} °C</h2>
            <p class="city-desc">${data.current.weather_descriptions}</p>
            <p class="temp-feels-like">Feels like ${data.current.feelslike} °C</p>
            <p class="date">${data.location.localtime}</p>
          </div>
          <div class="detailed-weather">
            <p class="wind">Wind speed: ${data.current.wind_speed}km/h</p>
            <p class="humidity">Humidity: ${data.current.humidity} %</p>
            <p class="sunrise">Cloudcover: ${data.current.cloudcover} %</p>
            <p class="sunset">UV index: ${data.current.uv_index}</p>
          </div>
        </div>`
    );
    searchInput.value = "";
  } catch (error) {
    console.error(error);
  }
};

searchBtn.addEventListener("click", getWeather);
