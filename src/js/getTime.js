import { timezone, getWeather } from "./weather.js";
import loc, { libary } from "./getLocation.js";
const time = document.getElementById("time");
const dateId = document.getElementById("date");
const lang = document.getElementById("choice_lang");
const buttonSearch = document.querySelector("#search");
const input = document.querySelector("input");
const currentLocation = document.getElementById("location");
export let language = localStorage.getItem("language") || "EN";

function showDate() {
  const today = new Date();
  const day = (lang) => today.toLocaleString(`${language}`, { weekday: "short" });
  const month = today.toLocaleString(`${language}`, { month: "long" });
  const weekDay = today.getDate();
  dateId.innerHTML = `${day()} ${weekDay} ${month}`;
}

export function showTime() {
  const today = new Date(new Date().toLocaleString("en-US", { timeZone: `${timezone}` }));
  const hour = today.getHours().toString();
  const min = today.getMinutes().toString();
  const sec = today.getSeconds().toString();
  time.innerHTML = `${hour.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
}
setInterval(() => {
  showDate();
  showTime();
}, 1000);

function changeLanguage(e) {
  language = e.target.value;
  buttonSearch.innerHTML = `${libary[language].search}`;
  input.setAttribute("placeholder", `${libary[language].placeholder}`);
  localStorage.setItem("language", e.target.value);
  getWeather(currentLocation.textContent);
}

lang.addEventListener("change", (event) => {
  changeLanguage(event);
});
