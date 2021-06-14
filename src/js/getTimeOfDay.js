export function getTimesOfDay(hour = new Date().getHours()) {
  return (hour >= 21 && hour < 24) || (hour >= 0 && hour < 5) ? "night" : "day";
}
