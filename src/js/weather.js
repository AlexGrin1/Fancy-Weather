import { projectSettings } from "./projectSettings.js";
import { language } from "./getTime.js";
const location = document.getElementById("location");
const temp = document.getElementById("temp");
const innerInfo = document.querySelector(".innerInfo");
const weatherOn3Days = document.querySelector(".weatherOn3Days");
const inputCity = document.querySelector("input");
const form = document.querySelector("form");
const blockChoiceTemp = document.querySelector("#choice_temp");
const buttonsTemp = blockChoiceTemp.querySelectorAll("button");
const coordinates = document.querySelector(".coordinates");
const refreshImage = document.getElementById("refreshImage");
const variantsLanguage = document.querySelectorAll("option");
let userChoiceTemperatureUnit;
let currentTempInCelsOrFahrenheit;
let feelsLikeTempInCelsOrFahrenheit;
let maxTempInCelsOrFahrenheit;
function getActualTemp() {
  userChoiceTemperatureUnit = localStorage.getItem("temperature") || document.querySelector(".active").dataset.value;
  buttonsTemp.forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.value === userChoiceTemperatureUnit) {
      el.classList.add("active");
    }
  });
  currentTempInCelsOrFahrenheit = `temp_${userChoiceTemperatureUnit}`;
  feelsLikeTempInCelsOrFahrenheit = `feelslike_${userChoiceTemperatureUnit}`;
  maxTempInCelsOrFahrenheit = `maxtemp_${userChoiceTemperatureUnit}`;
}

export async function getWeather(city, isTrue) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=e656736c26754e098db140545212405&q=${city}&days=4&lang=${language}`
    );
    const data = await response.json();
    if (data.error && data.error.code === 1006) {
      alert(projectSettings[language].errorFindCity);
    }
    const locationGeo = [data.location.lon, data.location.lat];
    timeZone = data.location.tz_id;
    createWeatherInfo(data);
    getMaps(locationGeo);
  } catch (err) {
    alert(projectSettings[language].errorOther);
    userLocation();
  }
}
export let timeZone = "Europe/Minsk";

async function userLocation() {
  try {
    const response = await fetch("https://ipinfo.io?token=6520844a54f3ec");
    const resp = await response.json();
    timeZone = resp.timezone;
    getWeather(resp.city);
  } catch (err) {
    alert(projectSettings[language].errorOther);
  }
}
function getMaps(coordinates) {
  mapboxgl.accessToken = "pk.eyJ1IjoiamVyb21pdHJ1IiwiYSI6ImNrcDV0MXRmMjF4bDQyb213NGpxZTNiNDkifQ.VgwARiMKZjGIkaYakkpQQw";
  var map = new mapboxgl.Map({
    container: "map",
    center: coordinates,
    zoom: 9,
    interactive: false,
    style: "mapbox://styles/mapbox/streets-v11",
  });
}
function flyTo(coordinates) {
  map.flyTo({
    center: coordinates,
    zoom: 9,
    speed: 0.2,
    curve: 1,
    easing(t) {
      return t;
    },
  });
}

function createCurrentWeatherInfo(data) {
  const city = data.location.name;
  const country = data.location.country;
  const iconCode = projectSettings.icons.getIcon(data.current.condition.code);
  const weatherText = data.current.condition.text;
  const feelsLikeInfo = Math.round(data.current[feelsLikeTempInCelsOrFahrenheit]);
  const windInfo = Math.round(data.current.wind_kph * (5 / 18));
  const humidityInfo = data.current.humidity;
  location.textContent = `${city}, ${country}`;
  temp.innerHTML = `${Math.round(data.current[currentTempInCelsOrFahrenheit])}&#176`;
  innerInfo.innerHTML = `<img src=${iconCode} class="icon">
  <div class='info_element'>${weatherText}</div>
  <div class='info_element'>${projectSettings[language].feel}: ${feelsLikeInfo} &#176</div>
  <div class='info_element'>${projectSettings[language].wind}: ${windInfo} ${projectSettings[language].speed}</div>
  <div class='info_element'>${projectSettings[language].humidity}: ${humidityInfo}%</div>
  `;
}
function createFutureWeatherInfo(data) {
  weatherOn3Days.innerHtml = "";
  data.forecast.forecastday.forEach((el) => {
    const celsOrFahrenheit = Math.round(el.day[maxTempInCelsOrFahrenheit]);
    const iconCode = projectSettings.icons.getIcon(el.day.condition.code);
    const weekDay = new Date(el.date).toLocaleString(language, {
      weekday: "long",
    });
    weatherOn3Days.innerHTML += `
    <div class="blockDayWeather">
      <div class="weekDayNext>
        <div class="week_day">${weekDay}</div>
      
      <div class='weekDayWeather'>
        <div class="next_day_weather">${celsOrFahrenheit}&#176</div>
        <img src='${iconCode}'>
      </div>
      </div>
    </div>`;
  });
}

function createWeatherInfo(data) {
  cleanOldInfo();
  getActualTemp();
  createCurrentWeatherInfo(data);
  createFutureWeatherInfo(data);
  createCoordinate(data);
}

function createCoordinate(data) {
  const getCoordinateString = (str) => `${str.replace(".", "&#176 ")} '`;
  coordinates.innerHTML = `
  <div>${projectSettings[language].latitude}: ${getCoordinateString(String(data.location.lat))}'</div>
  <div>${projectSettings[language].longitude}: ${getCoordinateString(String(data.location.lat))}'</div>
  `;
}

function cleanOldInfo() {
  location.innerHTML = "";
  temp.innerHTML = "";
  innerInfo.innerHTML = "";
  weatherOn3Days.innerHTML = "";
  coordinates.innerHTML = "";
}

function onSearch() {
  getWeather(inputCity.value);
  getRandomImage();
  inputCity.value = "";
}

async function getRandomImage() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=7wYU5zOAy4uV-EdWgZkKEbVoLxPO4CCd_fhjcsRp5v8`
    );
    const data = await response.json();
    document.body.style.background = `linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%) 0% 0% , url(${data.urls.full}), no-repeat`;
  } catch (err) {
    alert(projectSettings[language].errorImages);
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  getRandomImage();
  userLocation();
  variantsLanguage.forEach((el) => {
    el.removeAttribute("selected");
    if (el.dataset.value.toUpperCase() === localStorage.getItem("language").toUpperCase()) {
      el.setAttribute("selected", "");
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    onSearch();
  });
  blockChoiceTemp.addEventListener("click", (event) => {
    if (userChoiceTemperatureUnit !== event.target.dataset.value) {
      localStorage.setItem("temperature", event.target.dataset.value);
      getWeather(location.textContent);
    }
  });
  refreshImage.addEventListener("click", (event) => {
    getRandomImage();
  });
});
