const time = document.getElementById("time");
const dateId = document.getElementById("date");
const lang = document.getElementById("choice_lang");
let choiceLang;
function getLanguage() {
  choiceLang = lang.querySelector("[selected]").dataset.value;
}
function showDate() {
  getLanguage();
  const today = new Date();
  const day = (lang) => today.toLocaleString(`${choiceLang}`, { weekday: "short" });
  const month = today.toLocaleString(`${choiceLang}`, { month: "long" });
  const weekDay = today.getDate();
  dateId.innerHTML = `${day()} ${weekDay} ${month}`;
}

function showTime() {
  const today = new Date();
  const hour = today.getHours().toString();
  const min = today.getMinutes().toString();
  const sec = today.getSeconds().toString();
  time.innerHTML = `${hour.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
}
setInterval(() => {
  showDate();
  showTime();
}, 1000);
