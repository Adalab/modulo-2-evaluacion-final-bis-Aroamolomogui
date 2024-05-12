"use strict";
const ulList = document.querySelector(".js_person");
const btnKeep = document.querySelector(".js_keep");
const btnRecover = document.querySelector(".js_recover");
let personData = [];
//guardar datos en localStorage//
const handleBtnKeep = () => {
  localStorage.setItem("persons", JSON.stringify(personData));
};
const handleBtnRecover = () => {
  // const personDataLocal = JSON.parse(localStorage.getItem("persons"));
  // if (personDataLocal !== null) {
  //   personData = personDataLocal;
  // }
  // renderAllPerson(personData);
  personData = JSON.parse(localStorage.getItem("persons"));
  renderAllPerson(personData);
};

btnKeep.addEventListener("click", handleBtnKeep);
btnRecover.addEventListener("click", handleBtnRecover);

const getData = () => {
  //traer datps api
  fetch("https://randomuser.me/api/?results=10")
    //pasar datos a json
    .then((response) => response.json())
    //datos api formateados
    .then((dataApi) => {
      console.log("datos api");
      console.log(dataApi.results);
      //recorro objetos array peronas de api
      for (let i = 0; i < dataApi.results.length; i++) {
        const person = dataApi.results[i];
        //traer persona filtrada
        const personaFiltrada = clearData(person, i);
        //añadir persona filtrada al array final
        personData.push(personaFiltrada);
      }
      console.log("datos persona filtrados");
      console.log(personData);
      renderAllPerson(personData);
    });
};

//limpiar un elemento de la api
const clearData = (person, id) => {
  const name = person.name.first + person.name.last;
  const location = person.location.city;
  const userName = person.login.userName;
  const img = person.picture.large;

  const personaFiltrada = {
    id: id,
    name: name,
    location: location,
    c: userName,
    img: img,
    friend: false,
  };

  return personaFiltrada;
};
// En esta constante he pintado 1º una tarjeta en HTML y lo he traido al JS con la constante let html entre comillas francesas por ques e un string
const renderOnePerson = (person) => {
  let html = "";

  if (person.friend === false) {
    html = ` <li class="card js_card_person" id="${person.id}"><div class="center">
  <img src="${person.img}" alt="image" />
  <h1>${person.name}</h1>
  <h4>${person.location}</h4>
  <h4>${person.userName}</h4>
  </div>
</li>`;
  } else {
    html = ` <li class="card-pink js_card_person" id="${person.id}"><div class="center">
    <img src="${person.img}" alt="image" />
    <h1>${person.name}</h1>
    <h4>${person.location}</h4>
    <h4>${person.userName}</h4> </div>
  </li>`;
  }

  return html;
};
// con readerAllperson recorro mi arrayb para por cada elemento pintar los datos que necesito//
const renderAllPerson = (allPerson) => {
  ulList.innerHTML = "";
  for (let i = 0; i < allPerson.length; i++) {
    //aqui con renderOne person le estoy añadiendo los datos de cada uno que lo contiene essa función//
    ulList.innerHTML += renderOnePerson(allPerson[i]);
  }
  const allCardPersonLi = document.querySelectorAll(".js_card_person");
  console.log("li que es?");
  console.log(allCardPersonLi);
  //añado el evento para que lo pueda clicar y cuando lo haga después haga otra cosa (añadir las personas como amigas)//
  for (const li of allCardPersonLi) {
    li.addEventListener("click", addFavoriteFriend);
  }
};

const addFavoriteFriend = (ev) => {
  //con este current lo que hago es traerme el valor de un id para poder saber sobre quién estoy clicando el id lo creo a mano por que no me convence el de la API//
  console.log("Qué tiene el current");
  console.log(ev.currentTarget.id);
  const person = personData[ev.currentTarget.id];
  if (person.friend === true) {
    person.friend = false;
  } else {
    person.friend = true;
  }
  renderAllPerson(personData);
};

getData();
