import { projectSettings } from './projectSettings';

export const lang = document.getElementById('choice_lang');
const buttonSearch = document.querySelector('#search');
const input = document.querySelector('input');
export const currentLocation = document.getElementById('location');
export let language = localStorage.getItem('language') || 'en';

export function changeLanguage(thisLanguage) {
  language = thisLanguage;
  buttonSearch.innerHTML = projectSettings[language].search;
  input.setAttribute('placeholder', projectSettings[language].placeholder);
  localStorage.setItem('language', thisLanguage);
}
