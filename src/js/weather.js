const foo = document.querySelector(".weather_container");
const locationAndData = document.querySelector(".locationAndTime");
const location = document.getElementById("location");
const currentWeather = document.querySelector(".currentWeather");
const temp = document.querySelector(".temp");
const innerInfo = document.querySelector(".innerInfo");
let link = getWeather();
console.log(link);

async function getWeather() {
  try {
    const response = await fetch(
      "http://api.weatherapi.com/v1/current.json?key=e656736c26754e098db140545212405&q=Minsk&aqi=no"
    );
    const link = await response.json();
    const i = await console.log(link);
    create(link);
  } catch {
    alert("Что-то пошло не так");
  }
}

// const info = {
//   icon: link.current.condition.icon,
//   city: link.location.name,
//   country: link.location.country,
//   currentTemp_c: link.current.temp_c,
//   currentTemp_f: link.current.temp_f,
//   localTime: link.location.localTime,
//   wind_kph: link.current.wind_kph,
//   wind_mph: link.current.wind_kph,
//   humidity: link.current.humidity,
//   feelslike_c: link.current.feelslike_c,
//   feelslike_f: link.current.feelslike_f,
//   text: link.current.condition.text,
// };
function create(link) {
  location.textContent = `${link.location.name}, ${link.location.country}`;
  location.className = "weahter_info_title";
  // const city = document.createElement("div");
  // const weather = document.createElement("div");
  // const icon = document.createElement("img");
  // city.className = "weahter_info";
  // weather.className = "weahter_info";
  // icon.className = "weahter_info";
  // icon.setAttribute("src", info[icon]);
  // city.textContent = `${link.location.name}, ${link.location.country}`;
  // weather.innerHTML = `${Math.round(link.current.feelslike_c)} &#176`;
  // foo.appendChild(city);
  // foo.appendChild(weather);
  // foo.appendChild(icon);
}
document.addEventListener("DOMContentLoaded", (e) => {
  getWeather();
});
