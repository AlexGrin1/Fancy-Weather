const foo = document.querySelector(".weather_container");
const locationAndData = document.querySelector(".locationAndTime");
const location = document.getElementById("location");
const currentWeather = document.querySelector(".currentWeather");
const temp = document.getElementById("temp");
const innerInfo = document.querySelector(".innerInfo");
async function getWeather() {
  try {
    const response = await fetch(
      "http://api.weatherapi.com/v1/current.json?key=e656736c26754e098db140545212405&q=Minsk&aqi=no"
    );
    const link = await response.json();
    create(link);
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
    wind_mph: link.current.wind_kph,
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
  getWeather();
});
