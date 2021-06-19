import "../styles/style.scss";

import {
  location,
  userLocation,
  blockChoiceTemp,
  userChoiceTemperatureUnit,
  getWeather,
  onSearch,
  getRandomImage,
} from "./weather.js";
import { showDateAndTime } from "./timeUtils.js";
import { lang, changeLanguage, currentLocation } from "./languageUtil.js";

document.addEventListener("DOMContentLoaded", () => {
  const refreshImage = document.getElementById("refreshImage");
  const variantsLanguage = document.querySelectorAll("option");
  const form = document.querySelector("form");
  //getRandomImage();
  userLocation();
  variantsLanguage.forEach((el) => {
    el.removeAttribute("selected");
    if (el.value.toUpperCase() === localStorage.getItem("language").toUpperCase()) {
      el.setAttribute("selected", "");
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    onSearch();
  });
  blockChoiceTemp.addEventListener("click", (event) => {
    if (userChoiceTemperatureUnit !== event.target.dataset.value) {
      localStorage.setItem("temperature", event.target.dataset.value);
      getWeather(location.textContent);
    }
  });
  refreshImage.addEventListener("click", () => {
    getRandomImage();
  });

  lang.addEventListener("change", (event) => {
    changeLanguage(event.target.value);
    getWeather(currentLocation.textContent);
  });
});

setInterval(() => {
  showDateAndTime();
}, 1000);

const br;
const fd