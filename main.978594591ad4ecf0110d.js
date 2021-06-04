(()=>{"use strict";const e={EN:{text:"",feel:"FEELS LIKE",wind:"WIND",speed:"m/s",humidity:"HUMIDITY",search:"SEARCH",placeholder:"Search city",latitude:"Latutude",longitude:"Longitude"},RU:{text:"",feel:"ОЩУЩАЕТСЯ КАК",wind:"ВЕТЕР",speed:"м/с",humidity:"ВЛАЖНОСТЬ",search:"ПОИСК",placeholder:"Искать город",latitude:"Широта",longitude:"Долгота"}},t=(document.querySelector(".weather_container"),document.querySelector(".map_container"),document.querySelector(".locationAndTime"),document.getElementById("location")),n=(document.querySelector(".currentWeather"),document.getElementById("temp")),o=document.querySelector(".innerInfo"),c=document.querySelector(".weatherOn3Days"),a=document.querySelector("input"),r=document.querySelector("form"),i=document.querySelector("#choice_temp"),d=(document.querySelector(".active"),i.querySelectorAll("button")),l=document.querySelector(".coordinates"),s=document.getElementById("refreshImage");let u,m,y,p;async function g(a){try{const r=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e656736c26754e098db140545212405&q=${a}&days=3&lang=${b}`),i=await r.json();i.error&&1006===i.error.code&&alert("Город не найден. Попробуйте заново");const d=[i.location.lon,i.location.lat];console.log(i),function(a){t.innerHTML="",n.innerHTML="",o.innerHTML="",c.innerHTML="",l.innerHTML="",u=document.querySelector(".active").dataset.value,m="c"===u?"temp_c":"temp_f",y="c"===u?"feelslike_c":"feelslike_f",p="c"===u?"maxtemp_c":"maxtemp_f",function(c){t.textContent=`${c.location.name.toUpperCase()}, ${c.location.country.toUpperCase()}`,n.innerHTML=`${Math.round(c.current[m])}&#176`,o.innerHTML=`<img src=${c.current.condition.icon} class="icon">\n  <div class='info_element'>${c.current.condition.text.toUpperCase()}</div>\n  <div class='info_element'>${e[b].feel}: ${Math.round(c.current[y])} &#176</div>\n  <div class='info_element'>${e[b].wind}: ${Math.round(c.current.wind_kph*(5/18))} ${e[b].speed}</div>\n  <div class='info_element'>${e[b].humidity}: ${c.current.humidity}%</div>\n  `}(a),function(e){e.forecast.forecastday.forEach((e=>{const t=document.createElement("div");t.className="blockDayWeather",t.innerHTML=`\n    <div class="weekDayNext>\n      <div class="weekDay">${new Date(e.date).toLocaleString(`${b}`,{weekday:"long"}).toUpperCase()}\n      </div>\n    </div>\n    <div class='weekDayWeather'>\n      <div class="next_day_weather">${Math.round(e.day[p])}&#176</div>\n      <img src=${e.day.condition.icon}>\n    </div>`,c.appendChild(t)}))}(a),function(t){const n=String(t.location.lat).split("."),o=String(t.location.lon).split(".");l.innerHTML=`\n  <div>${e[b].latitude}: ${n[0]}&#176 ${n[1]}'</div>\n  <div>${e[b].longitude}: ${o[0]}&#176 ${o[1]}'</div>\n  `}(a)}(i),function(e){mapboxgl.accessToken="pk.eyJ1IjoiamVyb21pdHJ1IiwiYSI6ImNrcDV0MXRmMjF4bDQyb213NGpxZTNiNDkifQ.VgwARiMKZjGIkaYakkpQQw",new mapboxgl.Map({container:"map",center:e,zoom:9,interactive:!1,style:"mapbox://styles/mapbox/streets-v11"})}(d)}catch(e){console.log(e),alert("Что-то пошло не так"),h()}}async function h(){try{const e=await fetch("https://ipinfo.io?token=6520844a54f3ec");g((await e.json()).city)}catch(e){alert("Что-то пошло не так"),console.log(e)}}async function v(){try{const e=await fetch("https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=7wYU5zOAy4uV-EdWgZkKEbVoLxPO4CCd_fhjcsRp5v8"),t=await e.json();document.body.style.background=`linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%) 0% 0% / cover, url(${t.urls.full}), no-repeat`,document.body.style.backgroundImage=`url(${t.urls.full})`,document.body.style.backgroundSize="cover",document.body.style.backgroundAttachment="fixed"}catch(e){alert("Ошибка загрузки фонового изображения")}}document.addEventListener("DOMContentLoaded",(e=>{h(),v(),r.addEventListener("submit",(e=>{e.preventDefault(),g(a.value),a.value=""})),i.addEventListener("click",(e=>{u!==e.target.dataset.value&&(d.forEach((e=>e.classList.remove("active"))),e.target.classList.add("active"),g(t.textContent))})),s.addEventListener("click",(e=>{v()}))}));const f=document.getElementById("time"),$=document.getElementById("date"),S=document.getElementById("choice_lang"),L=document.querySelector("#search"),w=document.querySelector("input"),k=document.getElementById("location");let b="EN";setInterval((()=>{!function(){const e=new Date,t=e.toLocaleString(`${b}`,{month:"long"}),n=e.getDate();$.innerHTML=`${e.toLocaleString(`${b}`,{weekday:"short"})} ${n} ${t}`}(),function(){const e=new Date,t=e.getHours().toString(),n=e.getMinutes().toString(),o=e.getSeconds().toString();f.innerHTML=`${t.padStart(2,"0")}:${n.padStart(2,"0")}:${o.padStart(2,"0")}`}()}),1e3),S.addEventListener("change",(t=>{b=t.target.value,L.innerHTML=`${e[b].search}`,w.setAttribute("placeholder",`${e[b].placeholder}`),g(k.textContent)}))})();