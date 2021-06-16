import { projectSettings, getIcon } from "./projectSettings.js";
import { getWeather } from "./weather.js";
const lang = document.getElementById("choice_lang");
const buttonSearch = document.querySelector("#search");
const input = document.querySelector("input");
const currentLocation = document.getElementById("location");
export let language = localStorage.getItem("language") || "EN";

export function changeLanguage(lang) {
  language = lang;
  buttonSearch.innerHTML = projectSettings[language].search;
  input.setAttribute("placeholder", projectSettings[language].placeholder);
  localStorage.setItem("language", lang);
}

lang.addEventListener("change", (event) => {
  changeLanguage(event.target.value);
  getWeather(currentLocation.textContent);
});
