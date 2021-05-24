const foo = document.querySelector(".weather_container");

function create(link) {
  const city = document.createElement("div");
  const weather = document.createElement("div");
  const icon = document.createElement("img");
  city.className = "weahter_info";
  weather.className = "weahter_info";
  icon.className = "weahter_info";
  icon.setAttribute("src", link.current.condition.icon);
  city.textContent = link.location.name;
  weather.innerHTML = `${link.current.feelslike_c} &#8451`;
  foo.appendChild(city);
  foo.appendChild(weather);
  foo.appendChild(icon);
}

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

// foo.addEventListener("click", (e) => {
//   console.log(" ogogogog");
//   getWeather();
// });
foo.addEventListener("click", (e) => {
  getWeather();
});
