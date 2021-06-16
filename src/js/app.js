import "../styles/style.scss";

import weather from "./weather.js";
import projectSettings from "./projectSettings.js";
import { showDate, showTime } from "./timeUtils.js";

setInterval(() => {
  showDate();
  showTime();
}, 1000);
