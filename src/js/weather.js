const weatherContainer = document.querySelector(".weather_container");
const locationAndData = document.querySelector(".locationAndTime");
const location = document.getElementById("location");
const currentWeather = document.querySelector(".currentWeather");
const temp = document.getElementById("temp");
const innerInfo = document.querySelector(".innerInfo");
const weatherOn3Days = document.querySelector(".weatherOn3Days");
const buttonSearch = document.querySelector("button");
const inputCity = document.querySelector("input");
let city;
let locationGeo;
let i;

function getCity() {
  city = inputCity.value || userLocation();
  getWeather(city);
}

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=e656736c26754e098db140545212405&q=${city}&days=5`
    );
    const data = await response.json();
    const i = await console.log(data);
    const locationGeo = [data.location.lon, data.location.lat];
    create(data);
    getMaps(locationGeo);
  } catch {
    alert("Что-то пошло не так");
  }
}
async function userLocation() {
  try {
    const response = await fetch("https://ipinfo.io?token=6520844a54f3ec");
    const resp = await response.json();
    //const locationGeo = resp.loc.split(",");
    const b = await console.log(resp);
    getWeather(resp.city);
    //getMaps(locationGeo);
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
    style: "mapbox://styles/mapbox/streets-v11",
  });
}

function create(link) {
  const info = {
    icon: link.current.condition.icon,
    city: link.location.name,
    country: link.location.country,
    currentTemp_c: link.current.temp_c,
    currentTemp_f: link.current.temp_f,
    localTime: link.location.localTime,
    wind_kph: link.current.wind_kph,
    humidity: link.current.humidity,
    feelslike_c: link.current.feelslike_c,
    feelslike_f: link.current.feelslike_f,
    text: link.current.condition.text,
  };

  location.textContent = `${link.location.name.toUpperCase()}, ${link.location.country.toUpperCase()}`;
  temp.innerHTML = `${Math.round(link.current.temp_c)}&#176`;
  const icon = document.createElement("img");
  icon.setAttribute("src", link.current.condition.icon);
  icon.className = "icon";
  innerInfo.appendChild(icon);
  const info_param = [
    `${info.text}`,
    `FEELS LIKE: ${Math.round(info.feelslike_c)} &#176`,
    `WIND: ${Math.round(info.wind_kph * (5 / 18))} m/s`,
    `HUMIDITY: ${info.humidity}%`,
  ];
  link.forecast.forecastday.forEach((el) => {
    const blockDayWeather = document.createElement("div");
    blockDayWeather.className = "blockDayWeather";
    const weekDayNext = document.createElement("div");
    weekDayNext.className = "weekDayNext";
    const weekDay = document.createElement("div");
    const weekDayWeather = document.createElement("div");
    weekDayWeather.className = "weekDayWeather";
    weekDay.textContent = new Date(el.date).toLocaleString("eng", {
      weekday: "long",
    });
    const element = document.createElement("div");
    const icon = document.createElement("img");
    element.innerHTML = `${Math.round(el.day.maxtemp_c)}&#176`;
    element.className = "next_day_wether";
    icon.setAttribute("src", el.day.condition.icon);

    weatherOn3Days.appendChild(blockDayWeather);
    blockDayWeather.appendChild(weekDayNext);
    blockDayWeather.appendChild(weekDayWeather);
    weekDayNext.appendChild(weekDay);
    weekDayWeather.appendChild(element);
    weekDayWeather.appendChild(icon);
  });
  info_param.forEach((el) => {
    const element = document.createElement("div");
    element.innerHTML = el;
    element.className = "info_element";
    innerInfo.appendChild(element);
  });
}

function clean() {
  location.innerHTML = "";
  temp.innerHTML = "";
  innerInfo.innerHTML = "";
  const on3days = document.querySelectorAll(".blockDayWeather");
  on3days.forEach((el) => el.remove());
}

document.addEventListener("DOMContentLoaded", (e) => {
  buttonSearch.addEventListener("click", (ev) => {
    clean();
    //getCity();
    getWeather(inputCity.value);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && inputCity.value !== "undefined") {
      clean();
      //getCity();
      getWeather(inputCity.value);
      inputCity.value = "";
    }
  });
  userLocation();
});
