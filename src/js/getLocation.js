import { dayOrNight } from "./getTime.js";
export const libary = {
  EN: {
    text: "",
    feel: "FEELS LIKE",
    wind: "WIND",
    speed: "m/s",
    humidity: "HUMIDITY",
    search: "SEARCH",
    placeholder: "Search city",
    latitude: "Latutude",
    longitude: "Longitude",
    sunny: "./assets/day.svg",
  },
  RU: {
    text: "",
    feel: "ОЩУЩАЕТСЯ КАК",
    wind: "ВЕТЕР",
    speed: "м/с",
    humidity: "ВЛАЖНОСТЬ",
    search: "ПОИСК",
    placeholder: "Искать город",
    latitude: "Широта",
    longitude: "Долгота",
  },
  icons: {
    codesOfLightRain: [1063, 1072, 1153, 1168, 1183, 1261, 1198],
    codesOfModerateRain: [1189, 1186, 1237],
    heavyRainСodes: [1237, 164, 1246, 1195],
    codesOfLightSnow: [1066, 1252, 1069, 1210],
    codesOfModerateSnow: [1201, 1216, 1204, 1219, 1255, 1237],
    heavySnowСodes: [1114, 1222, 1225, 1258],
    partyCloudy: [1003, 1006],
    cloudy: [1009, 1135, 1147],
    clear: [1000],
    getIcon: (code) => {
      if (libary.icons.codesOfLightRain.includes(code)) {
        return "./assets/lightRain.svg";
      }
      if (libary.icons.codesOfModerateRain.includes(code)) {
        return "./assets/moderateRain.svg";
      }
      if (libary.icons.heavyRainСodes.includes(code)) {
        return "./assets/heavyRain.svg";
      }
      if (libary.icons.codesOfLightSnow.includes(code)) {
        return "./assets/lightSnow.svg";
      }
      if (libary.icons.codesOfModerateSnow.includes(code)) {
        return "./assets/moderateSnow.svg";
      }
      if (libary.icons.heavySnowСodes.includes(code)) {
        return "./assets/heavySnow.svg";
      }
      if (libary.icons.cloudy.includes(code)) {
        return "./assets/cloudy.svg";
      }
      if (libary.icons.partyCloudy.includes(code)) {
        return dayOrNight() === "day" ? "./assets/cloudy-day-2.svg" : "./assets/cloudy-night-2.svg";
      }
      if (libary.icons.clear.includes(code)) {
        return dayOrNight() === "day" ? "./assets/sunny.svg" : "./assets/clear.svg";
      } else {
        return "./assets/cloudy.svg";
      }
    },
  },
};
