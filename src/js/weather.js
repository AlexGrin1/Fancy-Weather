const weatherContainer = document.querySelector(".weather_container");
const locationAndData = document.querySelector(".locationAndTime");
const location = document.getElementById("location");
const currentWeather = document.querySelector(".currentWeather");
const temp = document.getElementById("temp");
const innerInfo = document.querySelector(".innerInfo");
const weatherOn3Days = document.querySelector(".weatherOn3Days");
const buttonSearch = document.querySelector("#search");
const inputCity = document.querySelector("input");
let locationGeo;
let changeChoiceTemp = "f";

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=e656736c26754e098db140545212405&q=${city}&days=5`
    );
    const data = await response.json();
    const locationGeo = [data.location.lon, data.location.lat];
    createWeatherInfo(data);
    getMaps(locationGeo);
    console.log(response.status);
  } catch (err) {
    console.error;
  }
}
async function userLocation() {
  try {
    const response = await fetch("https://ipinfo.io?token=6520844a54f3ec");
    const resp = await response.json();
    getWeather(resp.city);
    console.log(response.status);
  } catch {}
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
  const choiceTemp = document.querySelector("#choice_temp");
  const info = {
    tempC: Math.round(data.current.temp_c),
    tempF: Math.round(data.current.temp_f),
    feelslikeC: Math.round(data.current.feelslike_c),
    feelslikeF: Math.round(data.current.feelslike_f),
  };
  const info_param = [
    `${data.current.condition.text}`,
    `FEELS LIKE: ${info.feelslikeC} &#176`,
    `WIND: ${Math.round(data.current.wind_kph * (5 / 18))} m/s`,
    `HUMIDITY: ${data.current.humidity}%`,
  ];
  let changeTemp = changeChoiceTemp !== "f" ? "temp_c" : "temp_f";
  location.textContent = `${data.location.name.toUpperCase()}, ${data.location.country.toUpperCase()}`;
  temp.innerHTML = `${data.current[changeTemp]}&#176`;
  const icon = document.createElement("img");
  icon.setAttribute("src", data.current.condition.icon);
  icon.className = "icon";
  innerInfo.appendChild(icon);
  info_param.forEach((el) => {
    const element = document.createElement("div");
    element.innerHTML = el;
    element.className = "info_element";
    innerInfo.appendChild(element);
  });
  choiceTemp.addEventListener("click", (ev) => {
    if (ev.target.className === "cels") {
      temp.innerHTML = `${info.tempC}&#176`;
    }
    if (ev.target.className === "fahrenheit") {
      temp.innerHTML = `${info.tempF}&#176`;
    }
  });
}

function createFutureWeatherInfo(data) {
  data.forecast.forecastday.forEach((el) => {
    const nextDayweatherBlock = `
      <div class="blockDayWeather></div>`;
    const htmlNextDay = `
    <div class="weekDayNext>
      <div class="weekDay">${new Date(el.date).toLocaleString("eng", {
        weekday: "long",
      })}
      </div>
    </div>`;
    const htmlNextDayWeather = `
    <div class="weekDayNext>
      <div class="next_day_weather">${Math.round(el.day.maxtemp_c)}&#176</div>
      <img src=${el.day.condition.icon}>
    </div>`;

    weatherOn3Days.appendChild(nextDayweatherBlock);
    nextDayweatherBlock.innerHTML = htmlNextDay;
    nextDayweatherBlock.appendChild(htmlNextDayWeather);

    // const blockDayWeather = document.createElement("div");
    // blockDayWeather.className = "blockDayWeather";
    // const weekDayNext = document.createElement("div");
    // weekDayNext.className = "weekDayNext";
    // const weekDay = document.createElement("div");
    // const weekDayWeather = document.createElement("div");
    // weekDayWeather.className = "weekDayWeather";
    // weekDay.textContent = new Date(el.date).toLocaleString("eng", {
    //   weekday: "long",
    // });
    // const element = document.createElement("div");
    // const icon = document.createElement("img");
    // element.innerHTML = `${Math.round(el.day.maxtemp_c)}&#176`;
    // element.className = "next_day_weather";
    // icon.setAttribute("src", el.day.condition.icon);

    // weatherOn3Days.appendChild(blockDayWeather);
    // blockDayWeather.appendChild(weekDayNext);
    // blockDayWeather.appendChild(weekDayWeather);
    // weekDayNext.appendChild(weekDay);
    // weekDayWeather.appendChild(element);
    // weekDayWeather.appendChild(icon);
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
  on3days.forEach((el) => el.remove());
}

function onSearch() {
  clean();
  getWeather(inputCity.value);
  inputCity.value = "";
}

document.addEventListener("DOMContentLoaded", (event) => {
  buttonSearch.addEventListener("click", (event) => {
    if (inputCity.value !== "") {
      onSearch();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && inputCity.value !== "") {
      onSearch();
    }
  });
  userLocation();
});
