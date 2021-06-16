import { timeZone, getWeather } from "./weather.js";
import { language, changeLanguage } from "./languageUtil.js";
const time = document.getElementById("time");
const dateId = document.getElementById("date");

export function showDate() {
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
