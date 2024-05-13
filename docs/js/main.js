const l=document.querySelector(".js_person"),i=document.querySelector(".js_keep"),d=document.querySelector(".js_recover");let s=[];const u=()=>{localStorage.setItem("persons",JSON.stringify(s))},m=()=>{s=JSON.parse(localStorage.getItem("persons")),r(s)};i.addEventListener("click",u);d.addEventListener("click",m);const g=()=>{fetch("https://randomuser.me/api/?results=10").then(e=>e.json()).then(e=>{console.log("datos api"),console.log(e.results);for(let t=0;t<e.results.length;t++){const n=e.results[t],o=h(n,t);s.push(o)}console.log("datos persona filtrados"),console.log(s),r(s)})},h=(e,t)=>{const n=e.name.first+e.name.last,o=e.location.city,c=e.login.username,a=e.picture.large;return{id:t,name:n,location:o,userName:c,img:a,friend:!1}},f=e=>{let t="";return e.friend===!1?t=` <li class="card js_card_person" id="${e.id}"><div class="center">
  <img src="${e.img}" alt="image" />
  <h1>${e.name}</h1>
  <h4>${e.location}</h4>
  <h4>${e.userName}</h4>
  </div>
</li>`:t=` <li class="card-pink js_card_person" id="${e.id}"><div class="center">
    <img src="${e.img}" alt="image" />
    <h1>${e.name}</h1>
    <h4>${e.location}</h4>
    <h4>${e.userName}</h4> </div>
  </li>`,t},r=e=>{l.innerHTML="";for(let n=0;n<e.length;n++)l.innerHTML+=f(e[n]);const t=document.querySelectorAll(".js_card_person");console.log("li que es?"),console.log(t);for(const n of t)n.addEventListener("click",v)},v=e=>{console.log("Qué tiene el current"),console.log(e.currentTarget.id);const t=s[e.currentTarget.id];t.friend===!0?t.friend=!1:t.friend=!0,r(s)};g();
//# sourceMappingURL=main.js.map
