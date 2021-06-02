const weatherContainer = document.querySelector(".weather_container");
const locationAndData = document.querySelector(".locationAndTime");
const location = document.getElementById("location");
const currentWeather = document.querySelector(".currentWeather");
const temp = document.getElementById("temp");
const innerInfo = document.querySelector(".innerInfo");
const weatherOn3Days = document.querySelector(".weatherOn3Days");
const buttonSearch = document.querySelector("#search");
const inputCity = document.querySelector("input");
const form = document.querySelector("form");
let locationGeo;
let changeChoiceTemp = "c";
let changeTemp = changeChoiceTemp !== "f" ? "temp_c" : "temp_f";

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=e656736c26754e098db140545212405&q=${city}&days=3`
    );
    const data = await response.json();
    const b = await console.log(data.error);
    if (data.error) {
      data.error.code === 1006
        ? alert("Не верный ввод. Попробуйте заново")
        : "";
    }
    const locationGeo = [data.location.lon, data.location.lat];
    createWeatherInfo(data);
    getMaps(locationGeo);
  } catch {
    alert("Что-то пошло не так");
  }
}
async function userLocation() {
  try {
    const response = await fetch("https://ipinfo.io?token=6520844a54f3ec");
    const resp = await response.json();
    getWeather(resp.city);
  } catch {
    alert("Что-то пошло не так");
  }
}
function getMaps(coordinates) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiamVyb21pdHJ1IiwiYSI6ImNrcDV0MXRmMjF4bDQyb213NGpxZTNiNDkifQ.VgwARiMKZjGIkaYakkpQQw";
  var map = new mapboxgl.Map({
    container: "map",
    center: coordinates,
    zoom: 9,
    interactive: false,
    style: "mapbox://styles/mapbox/streets-v11",
  });
}

function createCurrentWeatherInfo(data) {
  const choiceTemp = document.querySelector("#choice_temp");

  location.textContent = `${data.location.name.toUpperCase()}, ${data.location.country.toUpperCase()}`;
  temp.innerHTML = `${data.current[changeTemp]}&#176`;
  innerInfo.innerHTML = `<img src=${data.current.condition.icon} class="icon">
  <div class='info_element'>${data.current.condition.text}</div>
  <div class='info_element'>FEELS LIKE: ${data.current.feelslike_c} &#176</div>
  <div class='info_element'>WIND: ${Math.round(
    data.current.wind_kph * (5 / 18)
  )} m/s</div>
  <div class='info_element'>HUMIDITY: ${data.current.humidity}%</div>
  `;
}

function createFutureWeatherInfo(data) {
  data.forecast.forecastday.forEach((el) => {
    const nextDayweatherBlock = document.createElement("div");
    nextDayweatherBlock.className = "blockDayWeather";
    nextDayweatherBlock.innerHTML = `
    <div class="weekDayNext>
      <div class="weekDay">${new Date(el.date).toLocaleString("eng", {
        weekday: "long",
      })}
      </div>
    </div>
    <div class='weekDayWeather'>
      <div class="next_day_weather">${Math.round(el.day.maxtemp_c)}&#176</div>
      <img src=${el.day.condition.icon}>
    </div>`;
    weatherOn3Days.appendChild(nextDayweatherBlock);
  });
}

function createWeatherInfo(data) {
  createCurrentWeatherInfo(data);
  createFutureWeatherInfo(data);
}

function clean() {
  location.innerHTML = "";
  temp.innerHTML = "";
  innerInfo.innerHTML = "";
  const on3days = document.querySelectorAll(".blockDayWeather");
  weatherOn3Days.innerHTML = "";
  //on3days.forEach((el) => el.remove());
}

function onSearch() {
  getWeather(inputCity.value);
  clean();
  inputCity.value = "";
}

document.addEventListener("DOMContentLoaded", (event) => {
  buttonSearch.addEventListener("click", (event) => {
    // if (inputCity.value !== "") {
    onSearch();
  });
  // form.addEventListener("submit", (event) => {
  //   onSearch();
  // });
  userLocation();
});
