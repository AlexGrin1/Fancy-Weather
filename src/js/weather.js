const weatherContainer = document.querySelector(".weather_container");
const locationAndData = document.querySelector(".locationAndTime");
const location = document.getElementById("location");
const currentWeather = document.querySelector(".currentWeather");
const temp = document.getElementById("temp");
const innerInfo = document.querySelector(".innerInfo");
const weatherOn3Days = document.querySelector(".weatherOn3Days");
let city;
let locationGeo;
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=e656736c26754e098db140545212405&q=${city}&days=5`
    );
    const data = await response.json();
    const i = await console.log(data);
    create(data);
  } catch {
    alert("Что-то пошло не так");
  }
}
async function loc() {
  try {
    const response = await fetch("https://ipinfo.io?token=6520844a54f3ec");
    const resp = await response.json();
    locationGeo = resp.loc.split(",");
    // locationLon = resp.location.lon;
    getWeather(resp.city);
  } catch {
    alert("Что-то пошло не так");
  }
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
    const weekDay = document.createElement("div");
    weekDay.textContent = new Date(el.date).toLocaleString("eng", {
      weekday: "long",
    });
    const element = document.createElement("div");
    const icon = document.createElement("img");
    element.innerHTML = `${Math.round(el.day.maxtemp_c)}&#176`;
    element.className = "next_day_wether";
    icon.setAttribute("src", el.day.condition.icon);
    weatherOn3Days.appendChild(weekDay);
    weatherOn3Days.appendChild(element);
    weatherOn3Days.appendChild(icon);
  });
  info_param.forEach((el) => {
    const element = document.createElement("div");
    element.innerHTML = el;
    element.className = "info_element";
    innerInfo.appendChild(element);
  });

  // city.textContent = `${link.location.name}, ${link.location.country}`;
  // weather.innerHTML = `${Math.round(link.current.feelslike_c)} &#176`;
  // foo.appendChild(city);
  // foo.appendChild(weather);
}

document.addEventListener("DOMContentLoaded", (e) => {
  loc();
});
