"use strict";

const contentContainer = document.getElementById("container");
const homeBtn = document.getElementById("home-btn");
const renderBtn = document.getElementById("render-btn");
const dogBtn = document.getElementById("dog-btn");
const catBtn = document.getElementById("cat-btn");

let baseFactURL = "";
let baseImgURL = "https://shibe.online/api/";
let imgURL = "";

// other attempted APIs: "https://random-d.uk/api"https://randomfox.ca/floof/"https://randomfox.ca/images/"
let navState = "home";

renderBtn.addEventListener("click", () => {
  if (navState === "dog") {
    imgURL = `${baseImgURL}shibes`;
    baseFactURL = "http://dog-api.kinduff.com/api/facts";
    renderContent(`${imgURL}?count=1&urls=true&httpsUrls=true.jpg`, `${baseFactURL}?number=50}`);
  } else if (navState === "cat") {
    imgURL = `${baseImgURL}cats`;
    baseFactURL = "https://meowfacts.herokuapp.com/";
    renderContent(`${imgURL}?count=1&urls=true&httpsUrls=true.jpg`, `${baseFactURL}?count=50}`);
  }
});

homeBtn.addEventListener("click", () => location.reload());

dogBtn.addEventListener("click", () => {
  navState = "dog";
  console.log(navState);
});

catBtn.addEventListener("click", () => {
  navState = "cat";
  console.log(navState);
});

function renderAnimal(animal) {
  const render = document.createElement("img");
  contentContainer.append(render);
  render.src = animal;
}

function renderFact(fact) {
  const factoid = document.createElement("p");
  factoid.className = "factoid";
  factoid.textContent = fact;
  contentContainer.append(factoid);
}

async function renderContent(imgURL, factURL) {
  const imgData = await fetchData(imgURL);
  const factData = await fetchData(factURL);
  //factData.keys[0]
  contentContainer.innerHTML = "";

  const animal = imgData[0];
  const fact = navState === "dog" ? factData.facts[0] : factData.data[0];
  if (animal !== "undefined") {
    renderAnimal(animal);
    console.log(animal, fact);
    renderFact(fact);
  } else {
    console.log(data);
  }
  if ((renderBtn.textContent = "RENDER")) renderBtn.textContent = "MORE!";
}

async function fetchData(url) {
  const request = await fetch(url);
  const data = await request.json();

  return data;
  //fetch(`${baseURL}/${magicNumber()}.jpg`).then((response) => console.log(response));
}

function magicNumber(max, start) {
  return Math.floor(Math.random() * max) + start;
}
