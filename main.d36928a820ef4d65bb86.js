(()=>{var e={622:()=>{mapboxgl.accessToken="pk.eyJ1IjoiamVyb21pdHJ1IiwiYSI6ImNrcDV0MXRmMjF4bDQyb213NGpxZTNiNDkifQ.VgwARiMKZjGIkaYakkpQQw",new mapboxgl.Map({container:"map",center:[27.57,53.9],zoom:9,style:"mapbox://styles/mapbox/streets-v11"})},85:()=>{const e=document.getElementById("time"),t=document.getElementById("date");function n(e){return(parseInt(e,10)<10?"0":"")+e}!function o(){const c=new Date,r=c.getHours(),a=c.getMinutes(),i=c.getSeconds();e.innerHTML=`${r}:${n(a)}:${n(i)}`,setTimeout((()=>{!function(){const e=new Date,n=e.toLocaleString("eng",{weekday:"short"}),o=e.toLocaleString("eng",{month:"long"}),c=e.getDate();t.innerHTML=`${n} ${c} ${o}`}(),o()}),1e3)}()},51:()=>{document.querySelector(".weather_container"),document.querySelector(".locationAndTime");const e=document.getElementById("location"),t=(document.querySelector(".currentWeather"),document.getElementById("temp")),n=document.querySelector(".innerInfo"),o=document.querySelector(".weatherOn3Days");let c;document.addEventListener("DOMContentLoaded",(r=>{!async function(){try{const r=await fetch("https://ipinfo.io?token=6520844a54f3ec"),a=await r.json();c=a.loc.split(","),async function(c){try{const r=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e656736c26754e098db140545212405&q=${c}&days=5`),a=await r.json();await console.log(a),function(c){const r={icon:c.current.condition.icon,city:c.location.name,country:c.location.country,currentTemp_c:c.current.temp_c,currentTemp_f:c.current.temp_f,localTime:c.location.localTime,wind_kph:c.current.wind_kph,humidity:c.current.humidity,feelslike_c:c.current.feelslike_c,feelslike_f:c.current.feelslike_f,text:c.current.condition.text};e.textContent=`${c.location.name.toUpperCase()}, ${c.location.country.toUpperCase()}`,t.innerHTML=`${Math.round(c.current.temp_c)}&#176`;const a=document.createElement("img");a.setAttribute("src",c.current.condition.icon),a.className="icon",n.appendChild(a);const i=[`${r.text}`,`FEELS LIKE: ${Math.round(r.feelslike_c)} &#176`,`WIND: ${Math.round(r.wind_kph*(5/18))} m/s`,`HUMIDITY: ${r.humidity}%`];c.forecast.forecastday.forEach((e=>{const t=document.createElement("div");t.textContent=new Date(e.date).toLocaleString("eng",{weekday:"long"});const n=document.createElement("div"),c=document.createElement("img");n.innerHTML=`${Math.round(e.day.maxtemp_c)}&#176`,n.className="next_day_wether",c.setAttribute("src",e.day.condition.icon),o.appendChild(t),o.appendChild(n),o.appendChild(c)})),i.forEach((e=>{const t=document.createElement("div");t.innerHTML=e,t.className="info_element",n.appendChild(t)}))}(a)}catch{alert("Что-то пошло не так")}}(a.city)}catch{alert("Что-то пошло не так")}}()}))}},t={};function n(o){var c=t[o];if(void 0!==c)return c.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";n(85),n(51),n(622)})()})();