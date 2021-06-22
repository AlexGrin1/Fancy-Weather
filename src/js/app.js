import '../styles/style.scss';

import {
  location,
  userLocation,
  blockChoiceTemp,
  userChoiceTemperatureUnit,
  getWeather,
  onSearch,
  getRandomImage,
} from './weather';
import { showDateAndTime } from './timeUtils';
import { lang, changeLanguage, currentLocation } from './languageUtil';

document.addEventListener('DOMContentLoaded', () => {
  const refreshImage = document.getElementById('refreshImage');
  const variantsLanguage = document.querySelectorAll('option');
  const form = document.querySelector('form');
  // getRandomImage();
  userLocation();
  variantsLanguage.forEach((el) => {
    el.removeAttribute('selected');
    if (el.value === localStorage.getItem('language')) {
      el.setAttribute('selected', '');
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    onSearch();
  });
  blockChoiceTemp.addEventListener('click', (event) => {
    if (userChoiceTemperatureUnit !== event.target.dataset.value) {
      localStorage.setItem('temperature', event.target.dataset.value);
      getWeather(location.textContent);
    }
  });
  refreshImage.addEventListener('click', () => {
    getRandomImage();
  });

  lang.addEventListener('change', (event) => {
    changeLanguage(event.target.value);
    getWeather(currentLocation.textContent);
  });
});

setInterval(() => {
  showDateAndTime();
}, 1000);
