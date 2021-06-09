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
    day: {},
    night: {},
    icon: (el) => {
      if (`${el.day.condition.code}` !== "undefined") {
        return `./assets/${el.day.condition.code}.svg`;
      } else {
        return `${el.day.condition.icon}`;
      }
    },
  },
};
