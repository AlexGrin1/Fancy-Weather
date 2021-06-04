import loc, { libary } from "./getLocation.js";
import { language } from "./getTime.js";
const weatherContainer = document.querySelector(".weather_container");
const mapContainer = document.querySelector(".map_container");
const locationAndData = document.querySelector(".locationAndTime");
const location = document.getElementById("location");
const currentWeather = document.querySelector(".currentWeather");
const temp = document.getElementById("temp");
const innerInfo = document.querySelector(".innerInfo");
const weatherOn3Days = document.querySelector(".weatherOn3Days");

const inputCity = document.querySelector("input");
const form = document.querySelector("form");
const blockChoiceTemp = document.querySelector("#choice_temp");
const activeButton = document.querySelector(".active");
const buttonsTemp = blockChoiceTemp.querySelectorAll("button");
const coordinates = document.querySelector(".coordinates");
const refreshImage = document.getElementById("refreshImage");

let locationGeo;
let changeChoiceTemp;
let changeTemp;
let changeFeelsLikeTemp;
let changeNexrDayTemp;

function getActualTemp() {
  changeChoiceTemp = document.querySelector(".active").dataset.value;
  changeTemp = changeChoiceTemp === "c" ? "temp_c" : "temp_f";
  changeFeelsLikeTemp = changeChoiceTemp === "c" ? "feelslike_c" : "feelslike_f";
  changeNexrDayTemp = changeChoiceTemp === "c" ? "maxtemp_c" : "maxtemp_f";
}

export async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=e656736c26754e098db140545212405&q=${city}&days=3&lang=${language}`
    );
    const data = await response.json();
    if (data.error && data.error.code === 1006) {
      alert("Город не найден. Попробуйте заново");
    }
    const locationGeo = [data.location.lon, data.location.lat];
    console.log(data);
    createWeatherInfo(data);
    getMaps(locationGeo);
  } catch (err) {
    console.log(err);
    alert("Что-то пошло не так");
    userLocation();
  }
}
async function userLocation() {
  try {
    const response = await fetch("https://ipinfo.io?token=6520844a54f3ec");
    const resp = await response.json();
    getWeather(resp.city);
  } catch (err) {
    alert("Что-то пошло не так");
    console.log(err);
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

function createCurrentWeatherInfo(data) {
  location.textContent = `${data.location.name.toUpperCase()}, ${data.location.country.toUpperCase()}`;
  temp.innerHTML = `${Math.round(data.current[changeTemp])}&#176`;
  innerInfo.innerHTML = `<img src=${data.current.condition.icon} class="icon">
  <div class='info_element'>${data.current.condition.text.toUpperCase()}</div>
  <div class='info_element'>${libary[language].feel}: ${Math.round(data.current[changeFeelsLikeTemp])} &#176</div>
  <div class='info_element'>${libary[language].wind}: ${Math.round(data.current.wind_kph * (5 / 18))} ${
    libary[language].speed
  }</div>
  <div class='info_element'>${libary[language].humidity}: ${data.current.humidity}%</div>
  `;
}

function createFutureWeatherInfo(data) {
  data.forecast.forecastday.forEach((el) => {
    const nextDayweatherBlock = document.createElement("div");
    nextDayweatherBlock.className = "blockDayWeather";
    nextDayweatherBlock.innerHTML = `
    <div class="weekDayNext>
      <div class="weekDay">${new Date(el.date)
        .toLocaleString(`${language}`, {
          weekday: "long",
        })
        .toUpperCase()}
      </div>
    </div>
    <div class='weekDayWeather'>
      <div class="next_day_weather">${Math.round(el.day[changeNexrDayTemp])}&#176</div>
      <img src=${el.day.condition.icon}>
    </div>`;
    weatherOn3Days.appendChild(nextDayweatherBlock);
  });
}

function createWeatherInfo(data) {
  clean();
  getActualTemp();

  createCurrentWeatherInfo(data);
  createFutureWeatherInfo(data);
  createCoordinate(data);
}

function createCoordinate(data) {
  const latitude = String(data.location.lat).split(".");
  const longitude = String(data.location.lon).split(".");
  coordinates.innerHTML = `
  <div>${libary[language].latitude}: ${latitude[0]}&#176 ${latitude[1]}'</div>
  <div>${libary[language].longitude}: ${longitude[0]}&#176 ${longitude[1]}'</div>
  `;
}

function clean() {
  location.innerHTML = "";
  temp.innerHTML = "";
  innerInfo.innerHTML = "";
  weatherOn3Days.innerHTML = "";
  coordinates.innerHTML = "";
}

function onSearch() {
  getWeather(inputCity.value);
  inputCity.value = "";
}

document.addEventListener("DOMContentLoaded", (event) => {
  userLocation();

  getRandomImage();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    onSearch();
  });

  blockChoiceTemp.addEventListener("click", (event) => {
    if (changeChoiceTemp !== event.target.dataset.value) {
      buttonsTemp.forEach((el) => el.classList.remove("active"));
      event.target.classList.add("active");
      getWeather(location.textContent);
    }
  });
  refreshImage.addEventListener("click", (event) => {
    getRandomImage();
  });
});
async function getRandomImage() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=7wYU5zOAy4uV-EdWgZkKEbVoLxPO4CCd_fhjcsRp5v8`
    );
    const data = await response.json();
    document.body.style.background = `linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%) 0% 0% / cover, url(${data.urls.full}), no-repeat`;
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
  } catch (err) {
    alert("Ошибка загрузки фонового изображения");
  }
}
