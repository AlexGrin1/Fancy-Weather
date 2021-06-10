(()=>{"use strict";const e={EN:{text:"",feel:"FEELS LIKE",wind:"WIND",speed:"m/s",humidity:"HUMIDITY",search:"SEARCH",placeholder:"Search city",latitude:"Latutude",longitude:"Longitude",sunny:"./assets/day.svg"},RU:{text:"",feel:"ОЩУЩАЕТСЯ КАК",wind:"ВЕТЕР",speed:"м/с",humidity:"ВЛАЖНОСТЬ",search:"ПОИСК",placeholder:"Искать город",latitude:"Широта",longitude:"Долгота"},icons:{day:{},night:{},icon:e=>(console.log(),"undefined"!=`${e.day.condition.code}`?`./assets/${e.day.condition.code}.svg`:`${e.day.condition.icon}`)}},t=document.getElementById("time"),n=document.getElementById("date"),a=document.getElementById("choice_lang"),o=document.querySelector("#search"),c=document.querySelector("input"),i=document.getElementById("location");let r=localStorage.getItem("language")||"EN";setInterval((()=>{!function(){const e=new Date,t=e.toLocaleString(`${r}`,{month:"long"}),a=e.getDate();n.innerHTML=`${e.toLocaleString(`${r}`,{weekday:"short"})} ${a} ${t}`}(),function(){const e=new Date((new Date).toLocaleString("en-US",{timeZone:`${k}`})),n=e.getHours().toString(),a=e.getMinutes().toString(),o=e.getSeconds().toString();t.innerHTML=`${n.padStart(2,"0")}:${a.padStart(2,"0")}:${o.padStart(2,"0")}`}()}),1e3),a.addEventListener("change",(t=>{var n;r=(n=t).target.value,o.innerHTML=`${e[r].search}`,c.setAttribute("placeholder",`${e[r].placeholder}`),localStorage.setItem("language",n.target.value),b(i.textContent)}));const d=document.getElementById("location"),l=document.getElementById("temp"),s=document.querySelector(".innerInfo"),u=document.querySelector(".weatherOn3Days"),m=document.querySelector("input"),g=document.querySelector("form"),p=document.querySelector("#choice_temp"),y=p.querySelectorAll("button"),v=document.querySelector(".coordinates"),h=document.getElementById("refreshImage"),f=document.querySelectorAll("option");let $,S,L,w;async function b(t){try{const n=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e656736c26754e098db140545212405&q=${t}&days=4&lang=${r}`),a=await n.json();console.log(a),a.error&&1006===a.error.code&&alert("Город не найден. Попробуйте заново");const o=[a.location.lon,a.location.lat];k=a.location.tz_id,function(t){d.innerHTML="",l.innerHTML="",s.innerHTML="",u.innerHTML="",v.innerHTML="",$=localStorage.getItem("temperature")||document.querySelector(".active").dataset.value,y.forEach((e=>{e.classList.remove("active"),e.dataset.value===$&&e.classList.add("active")})),S="c"===$?"temp_c":"temp_f",L="c"===$?"feelslike_c":"feelslike_f",w="c"===$?"maxtemp_c":"maxtemp_f",function(t){d.textContent=`${t.location.name.toUpperCase()}, ${t.location.country.toUpperCase()}`,l.innerHTML=`${Math.round(t.current[S])}&#176`,s.innerHTML=`<img src='./assets/${t.current.condition.code}.svg' class="icon">\n  <div class='info_element'>${t.current.condition.text.toUpperCase()}</div>\n  <div class='info_element'>${e[r].feel}: ${Math.round(t.current[L])} &#176</div>\n  <div class='info_element'>${e[r].wind}: ${Math.round(t.current.wind_kph*(5/18))} ${e[r].speed}</div>\n  <div class='info_element'>${e[r].humidity}: ${t.current.humidity}%</div>\n  `}(t),function(t){t.forecast.forecastday.forEach((t=>{const n=document.createElement("div");n.className="blockDayWeather",n.innerHTML=`\n    <div class="weekDayNext>\n      <div class="weekDay">${new Date(t.date).toLocaleString(`${r}`,{weekday:"long"}).toUpperCase()}\n      </div>\n    </div>\n    <div class='weekDayWeather'>\n      <div class="next_day_weather">${Math.round(t.day[w])}&#176</div>\n       <img src='${e.icons.icon(t)}'>\n    </div>`,u.appendChild(n)}))}(t),function(t){const n=String(t.location.lat).split("."),a=String(t.location.lon).split(".");v.innerHTML=`\n  <div>${e[r].latitude}: ${n[0]}&#176 ${n[1]}'</div>\n  <div>${e[r].longitude}: ${a[0]}&#176 ${a[1]}'</div>\n  `}(t)}(a),m!==t&&I(),function(e){mapboxgl.accessToken="pk.eyJ1IjoiamVyb21pdHJ1IiwiYSI6ImNrcDV0MXRmMjF4bDQyb213NGpxZTNiNDkifQ.VgwARiMKZjGIkaYakkpQQw",new mapboxgl.Map({container:"map",center:e,zoom:9,interactive:!1,style:"mapbox://styles/mapbox/streets-v11"})}(o)}catch(e){alert("Что-то пошло не так"),E()}}let k="Europe/Minsk";async function E(){try{const e=await fetch("https://ipinfo.io?token=6520844a54f3ec"),t=await e.json();k=t.timezone,b(t.city)}catch(e){alert("Что-то пошло не так")}}async function I(){try{const e=await fetch("https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=7wYU5zOAy4uV-EdWgZkKEbVoLxPO4CCd_fhjcsRp5v8"),t=await e.json();document.body.style.background=`linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%) 0% 0% / cover, url(${t.urls.full}), no-repeat`,document.body.style.backgroundImage=`url(${t.urls.full})`,document.body.style.backgroundSize="cover",document.body.style.backgroundAttachment="fixed"}catch(e){alert("Ошибка загрузки фонового изображения")}}document.addEventListener("DOMContentLoaded",(e=>{E(),f.forEach((e=>{e.removeAttribute("selected"),e.dataset.value.toUpperCase()===localStorage.getItem("language").toUpperCase()&&e.setAttribute("selected","")})),g.addEventListener("submit",(e=>{e.preventDefault(),b(m.value),m.value=""})),p.addEventListener("click",(e=>{$!==e.target.dataset.value&&(localStorage.setItem("temperature",e.target.dataset.value),b(d.textContent))})),h.addEventListener("click",(e=>{I()}))}))})();