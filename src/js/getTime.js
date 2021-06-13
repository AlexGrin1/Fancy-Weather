import { timeZone, getWeather } from "./weather.js";
import { projectSettings } from "./projectSettings.js";
const time = document.getElementById("time");
const dateId = document.getElementById("date");
const lang = document.getElementById("choice_lang");
const buttonSearch = document.querySelector("#search");
const input = document.querySelector("input");
const currentLocation = document.getElementById("location");
export let language = localStorage.getItem("language") || "EN";

export function getTimesOfDay(hour = new Date().getHours()) {
  return (hour >= 21 && hour < 24) || (hour >= 0 && hour < 5) ? "night" : "day";
}

function showDate() {
  const today = new Date();
  const day = today.toLocaleString(language, { weekday: "short" });
  const month = today.toLocaleString(language, { month: "long" });
  const date = today.getDate();
  dateId.innerHTML = `${day} ${date} ${month}`;
}

export function showTime() {
  const today = new Date(new Date().toLocaleString("en-US", { timeZone }));
  time.innerHTML = today.toLocaleTimeString();
}
setInterval(() => {
  showDate();
  showTime();
}, 1000);

function changeLanguage(lang) {
  language = lang;
  buttonSearch.innerHTML = `${projectSettings[language].search}`;
  input.setAttribute("placeholder", `${projectSettings[language].placeholder}`);
  localStorage.setItem("language", lang);
}

lang.addEventListener("change", (event) => {
  changeLanguage(event.target.value);
  getWeather(currentLocation.textContent);
});
