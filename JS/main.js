"use strict";
//html stuff
const contentContainer = document.getElementById("container");
const homeBtn = document.getElementById("home-btn");
const renderBtn = document.getElementById("render-btn");
const dogBtn = document.getElementById("dog-btn");
const catBtn = document.getElementById("cat-btn");

let baseFactURL = "";
let baseImgURL = "https://shibe.online/api/";
let imgURL = "";
// other APIs i tried: "https://random-d.uk/api"https://randomfox.ca/floof/"https://randomfox.ca/images/"https://meowfacts.herokuapp.com/""

//navigation
let navState = "home";

homeBtn.addEventListener("click", () => location.reload());

dogBtn.addEventListener("click", () => {
  navState = "dog";
  console.log(navState);
});

catBtn.addEventListener("click", () => {
  navState = "cat";
  console.log(navState);
});

//rendering on button click, repeating when pressing enter afterwards
renderBtn.addEventListener("click", render);

renderBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") render;
});

//making elements to set img and fact to with data from APIs and appending them to the container
function setImg(animal) {
  const render = document.createElement("img");
  render.src = animal;
  contentContainer.append(render);
}

function setFact(fact) {
  const factoid = document.createElement("p");
  factoid.className = "factoid";
  factoid.textContent = fact;
  contentContainer.append(factoid);
}

//try to get an image from the image API and the fact from the fact API
async function compileContent(imgURL, factURL) {
  const imgData = await fetchData(imgURL);
  const factData = await fetchData(factURL);

  contentContainer.innerHTML = "";

  const animal = imgData[0];
  const fact =
    navState === "dog"
      ? factData.facts[magicNumber(50, 0)]
      : factData.data[magicNumber(10, 0)].fact;
  try {
    setImg(animal);
    console.log(animal, fact);
    setFact(fact);
  } catch (error) {
    console.error(`Something went wrong:\n${error}`);
  }
  if ((renderBtn.textContent = "RENDER")) renderBtn.textContent = "MORE!";
}

//render the content based on whether the user has chosen dog or cat
function render() {
  contentContainer.style.visibility = "visible";
  try {
    switch (navState) {
      case "dog":
        imgURL = `${baseImgURL}shibes`;
        baseFactURL = "http://dog-api.kinduff.com/api";
        compileContent(
          `${imgURL}?count=1&urls=true&httpsUrls=true.jpg`,
          `${baseFactURL}/facts?number=50}`
        );
        break;

      case "cat":
        imgURL = `${baseImgURL}cats`;
        baseFactURL = "https://catfact.ninja";
        compileContent(
          `${imgURL}?count=1&urls=true&httpsUrls=true.jpg`,
          `${baseFactURL}/facts?page=${magicNumber(33, 1)}`
        );
        break;
    }
  } catch (error) {
    console.error(`Something went wrong:\n${error}`);
  }
  /*if (navState === "dog") {
    imgURL = `${baseImgURL}shibes`;
    baseFactURL = "http://dog-api.kinduff.com/api";
    compileContent(
      `${imgURL}?count=1&urls=true&httpsUrls=true.jpg`,
      `${baseFactURL}/facts?number=50}`
    );
  } else if (navState === "cat") {
    imgURL = `${baseImgURL}cats`;
    baseFactURL = "https://catfact.ninja";
    compileContent(
      `${imgURL}?count=1&urls=true&httpsUrls=true.jpg`,
      `${baseFactURL}/facts?page=${magicNumber(34, 1)}`
    );
  }*/
}

//fetching json data from API
async function fetchData(url) {
  const request = await fetch(url);
  const data = await request.json();

  return data;
}

//"random" number generator
const magicNumber = (max, start) => {
  return Math.floor(Math.random() * max) + start;
};
