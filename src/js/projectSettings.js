import { getTimesOfDay } from "./getTime.js";
export const projectSettings = {
  EN: {
    feel: "FEELS LIKE",
    wind: "WIND",
    speed: "m/s",
    humidity: "HUMIDITY",
    search: "SEARCH",
    placeholder: "Search city",
    latitude: "Latutude",
    longitude: "Longitude",
  },
  RU: {
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
    codesHeavyRain: [1237, 164, 1246, 1195],
    codesOfLightSnow: [1066, 1252, 1069, 1210],
    codesOfModerateSnow: [1201, 1216, 1204, 1219, 1255, 1237],
    codesHeavySnow: [1114, 1222, 1225, 1258],
    codesPartyCloudy: [1003, 1006],
    codesCloudy: [1009, 1135, 1147],
    codesClear: [1000],
    getIcon: (code) => {
      if (projectSettings.icons.codesOfLightRain.includes(code)) {
        return "./assets/lightRain.svg";
      }
      if (projectSettings.icons.codesOfModerateRain.includes(code)) {
        return "./assets/moderateRain.svg";
      }
      if (projectSettings.icons.codesHeavyRain.includes(code)) {
        return "./assets/heavyRain.svg";
      }
      if (projectSettings.icons.codesOfLightSnow.includes(code)) {
        return "./assets/lightSnow.svg";
      }
      if (projectSettings.icons.codesOfModerateSnow.includes(code)) {
        return "./assets/moderateSnow.svg";
      }
      if (projectSettings.icons.codesHeavySnow.includes(code)) {
        return "./assets/heavySnow.svg";
      }
      if (projectSettings.icons.codesCloudy.includes(code)) {
        return "./assets/cloudy.svg";
      }
      if (projectSettings.icons.codesPartyCloudy.includes(code)) {
        return getTimesOfDay() === "day" ? "./assets/cloudy-day-2.svg" : "./assets/cloudy-night-2.svg";
      }
      if (projectSettings.icons.codesClear.includes(code)) {
        return getTimesOfDay() === "day" ? "./assets/sunny.svg" : "./assets/clear.svg";
      } else {
        return "./assets/cloudy.svg";
      }
    },
  },
};
