import { getTimesOfDay } from "./getTimeOfDay.js";
export const projectSettings = {
  EN: {
    feel: "FEELS LIKE",
    wind: "WIND",
    speed: "m/s",
    humidity: "HUMIDITY",
    search: "SEARCH",
    placeholder: "Search city",
    latitude: "Latitude",
    longitude: "Longitude",
    errorFindCity: "The city was not found. Try again",
    errorImages: "Error loading background image",
    errorOther: "Something went wrong",
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
    errorFindCity: "Город не найден. Попробуйте заново",
    errorImages: "Ошибка загрузки фонового изображения",
    errorOther: "Что-то пошло не так",
  },
  icons: {
    getIcon: (code) => {
      console.log(code);
      const iconCodes = {
        lightRain: [1063, 1072, 1153, 1168, 1183, 1240, 1261, 1198],
        moderateRain: [1189, 1186, 1237],
        heavyRain: [1237, 1264, 1246, 1195],
        lightSnow: [1066, 1252, 1069, 1210],
        moderateSnow: [1201, 1216, 1204, 1219, 1255, 1237],
        heavySnow: [1114, 1222, 1225, 1258],
        partlyCloudy: [1003, 1006],
        cloudy: [1009, 1135, 1147, 1030],
        clear: [1000],
      };
      for (const [key, value] of Object.entries(iconCodes)) {
        if (value.includes(code)) {
          if (key === "partlyCloudy" || key === "clear") {
            return `./assets/${key}${getTimesOfDay()}.svg`;
          } else {
            return `./assets/${key}.svg`;
          }
        }
      }
    },
  },
};
