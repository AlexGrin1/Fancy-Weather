const time = document.getElementById("time");

const dateId = document.getElementById("date");
const weekDays = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
const MonthsOfYear = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};
let i = 1;
function getDate() {
  const today = new Date();
  const day = today.getDay();
  const month = today.getMonth();
  const weekDay = today.getDate();
  dateId.innerHTML = `${weekDays[day]} ${weekDay} ${MonthsOfYear[month]}`;
}
function showTime() {
  const today = new Date();
  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();
  time.innerHTML = `${hour}:${addZero(min)}:${addZero(sec)}`;
  setTimeout(() => {
    showTime();
    getDate();
  }, 1000);
}
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

showTime();
