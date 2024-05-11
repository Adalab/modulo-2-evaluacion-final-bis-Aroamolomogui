"use strict";
const ulList = document.querySelector(".js_person");
let personData = [];

const getData = () => {
  //traer datps api
  fetch("https://randomuser.me/api/?results=10")
    //pasar datos a json
    .then((response) => response.json())
    //datos api formateados
    .then((dataApi) => {
      console.log(dataApi.results);
      //recorro objetos array peronas de api
      for (const person of dataApi.results) {
        //traer persona filtrada
        const personaFiltrada = clearData(person);
        //añadir persona filtrada al array final
        personData.push(personaFiltrada);
      }

      console.log(personData);
    });
};

//limpiar un elemento de la api
const clearData = (person) => {
  const name = person.name.first + person.name.last;
  const location = person.location.city;
  const userName = person.login.userName;
  const img = person.picture.medium;

  const personaFiltrada = {
    name: name,
    location: location,
    userName: userName,
    img: img,
    amigo: false,
  };

  return personaFiltrada;
};

const renderOnePerson = (person) => {
  let html = "";
  return html;
};
const renderAllPerson = (allPerson) => {
  ulList.innerHTML = "";
  for (let i = 0; i < allPerson.length; i++) {
    ulList.innerHTML += renderOnePerson(allPerson[i]);
  }
};
getData();
