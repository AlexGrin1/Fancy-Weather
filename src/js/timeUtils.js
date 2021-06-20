/* eslint-disable import/no-cycle */
import { timeZone } from './weather';
import { language } from './languageUtil';

const time = document.getElementById('time');
const dateId = document.getElementById('date');

export function showDateAndTime() {
  const today = new Date();
  const getTimezone = new Date(
    new Date().toLocaleString('en-US', {
      timeZone,
    })
  );
  const day = today.toLocaleString(language, {
    weekday: 'short',
  });
  const month = today.toLocaleString(language, {
    month: 'long',
  });
  const date = today.getDate();
  dateId.innerHTML = `${day} ${date} ${month}`;

  time.innerHTML = getTimezone.toLocaleTimeString();
}
export function getTimesOfDay(hour = new Date().getHours()) {
  return (hour >= 21 && hour < 24) || (hour >= 0 && hour < 5) ? 'night' : 'day';
}
