"use strict";
//html stuff
const contentContainer = document.getElementById("container");
const homeBtn = document.getElementById("home-btn");
const renderBtn = document.getElementById("render-btn");
const dogBtn = document.getElementById("dog-btn");
const catBtn = document.getElementById("cat-btn");
const errorEl = document.getElementById("error-el");

let baseFactURL = "";
let baseImgURL = "https://shibe.online/api/";
let imgURL = "";
// other APIs i tried: "https://random-d.uk/api"https://randomfox.ca/floof/"https://randomfox.ca/images/"https://meowfacts.herokuapp.com/""

//navigation
let navState = "home";

//reset the page
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
  const img = document.createElement("img");
  img.src = animal;
  contentContainer.append(img);
}

function setFact(fact) {
  const factoid = document.createElement("p");
  factoid.className = "factoid";
  factoid.textContent = fact;
  contentContainer.append(factoid);
}

//clear the content container and try to get an image from the image API and the fact from the fact API
async function compileContent(imgURL, factURL) {
  const imgData = await fetchData(imgURL);
  const factData = await fetchData(factURL);

  const animal = imgData[0];
  //the two APIs used for facts have slightly different structures
  const fact =
    navState === "dog"
      ? factData.facts[magicNumber(50, 0)]
      : factData.data[magicNumber(10, 0)].fact;
  try {
    setImg(animal);
    console.log(animal, fact);
    setFact(fact);
  } catch (error) {
    //add proper user-friendly error message
    errorEl.style.visibility = "visible";
    console.error(`Something went wrong:\n${error}`);
    throw (errorEl.textContent = "Error, something went wrong.");
  }
}
const showAndPrepareMore = () => {
  contentContainer.style.visibility = "visible";
  if ((renderBtn.textContent = "Show me an animal and a fact about it!"))
    renderBtn.textContent = "MORE!";
};
//render the content based on whether the user has chosen dog or cat
function render() {
  clearContents();
  try {
    switch (navState) {
      case "dog":
        showAndPrepareMore();
        imgURL = `${baseImgURL}shibes`;
        baseFactURL = "https://dog-api.kinduff.com/api";
        compileContent(
          `${imgURL}?count=1&urls=true&httpsUrls=true.jpg`,
          `${baseFactURL}/facts?number=50}`
        );
        break;
      case "cat":
        showAndPrepareMore();
        imgURL = `${baseImgURL}cats`;
        baseFactURL = "https://catfact.ninja";
        compileContent(
          `${imgURL}?count=1&urls=true&httpsUrls=true.jpg`,
          `${baseFactURL}/facts?page=${magicNumber(33, 1)}`
        );
        break;
      case "home":
        errorEl.style.visibility = "visible";
        errorEl.textContent = "Please select an animal first.";
    }
  } catch (error) {
    //add proper user-friendly error message
    console.error(`Something went wrong:\n${error}`);
    errorEl.style.visibility = "visible";

    throw (errorEl.textContent = "Error, something went wrong");
  }
}

//fetching json data from API
async function fetchData(url) {
  try {
    const request = await fetch(url);
    const data = await request.json();

    return data;
  } catch (error) {
    errorEl.style.visibility = "visible";
    console.error(`Something went wrong:\n${error}`);
    throw (errorEl.textContent = "Error, something went wrong with the API.");
  }
}

//"random" number generator
const magicNumber = (max, start) => {
  return Math.floor(Math.random() * max) + start;
};

const clearContents = () => {
  contentContainer.innerHTML = "";
  errorEl.textContent = "";
};
