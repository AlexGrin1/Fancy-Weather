(()=>{var e={85:()=>{const e=document.getElementById("time"),t=document.getElementById("date");function n(e){return(parseInt(e,10)<10?"0":"")+e}!function o(){const c=new Date,r=c.getHours(),i=c.getMinutes(),a=c.getSeconds();e.innerHTML=`${r}:${n(i)}:${n(a)}`,setTimeout((()=>{!function(){const e=new Date,n=e.toLocaleString("eng",{weekday:"short"}),o=e.toLocaleString("eng",{month:"long"}),c=e.getDate();t.innerHTML=`${n} ${c} ${o}`}(),o()}),1e3)}()},51:()=>{document.querySelector(".weather_container"),document.querySelector(".locationAndTime");const e=document.getElementById("location"),t=(document.querySelector(".currentWeather"),document.getElementById("temp")),n=document.querySelector(".innerInfo");document.addEventListener("DOMContentLoaded",(o=>{!async function(){try{const o=await fetch("https://ipinfo.io?token=6520844a54f3ec");!async function(o){try{const c=await fetch(`http://api.weatherapi.com/v1/current.json?key=e656736c26754e098db140545212405&q=${o}&aqi=no`);!function(o){const c={icon:o.current.condition.icon,city:o.location.name,country:o.location.country,currentTemp_c:o.current.temp_c,currentTemp_f:o.current.temp_f,localTime:o.location.localTime,wind_kph:o.current.wind_kph,humidity:o.current.humidity,feelslike_c:o.current.feelslike_c,feelslike_f:o.current.feelslike_f,text:o.current.condition.text};e.textContent=`${o.location.name.toUpperCase()}, ${o.location.country.toUpperCase()}`,t.innerHTML=`${Math.round(o.current.temp_c)}&#176`;const r=document.createElement("img");r.setAttribute("src",o.current.condition.icon),r.className="icon",n.appendChild(r),[`${c.text}`,`FEELS LIKE: ${Math.round(c.feelslike_c)} &#176`,`WIND: ${Math.round(c.wind_kph*(5/18))} m/s`,`HUMIDITY: ${c.humidity}%`].forEach((e=>{const t=document.createElement("div");t.innerHTML=e,t.className="info_element",n.appendChild(t)}))}(await c.json())}catch{alert("Что-то пошло не так")}}((await o.json()).city)}catch{alert("Что-то пошло не так")}}()}))}},t={};function n(o){var c=t[o];if(void 0!==c)return c.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";n(85),n(51)})()})();