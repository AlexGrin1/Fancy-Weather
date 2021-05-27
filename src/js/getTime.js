const time = document.getElementById("time");

const dateId = document.getElementById("date");
function getDate() {
  const today = new Date();
  const day = today.toLocaleString("eng", { weekday: "short" });
  const month = today.toLocaleString("eng", { month: "long" });
  const weekDay = today.getDate();
  dateId.innerHTML = `${day} ${weekDay} ${month}`;
}

function showTime() {
  const today = new Date();
  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();
  time.innerHTML = `${hour}:${addZero(min)}:${addZero(sec)}`;
  setTimeout(() => {
    getDate();
    showTime();
  }, 1000);
}
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}
showTime();
