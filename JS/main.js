"use strict";
//html stuff
const contentContainer = document.getElementById("container");
const homeBtn = document.getElementById("home-btn");
const renderBtn = document.getElementById("render-btn");
const dogBtn = document.getElementById("dog-btn");
const catBtn = document.getElementById("cat-btn");
const infoEl = document.getElementById("info-el");

let baseFactURL = "";
let baseImgURL = "https://shibe.online/api/";
let imgURL = "";
// other APIs i tried: "https://random-d.uk/api"https://randomfox.ca/floof/"https://randomfox.ca/images/"https://meowfacts.herokuapp.com/""

//navigation
let navState = "home";

//just resets the page, probably a better way to do it out there
homeBtn.addEventListener("click", () => location.reload());

dogBtn.addEventListener("click", () => selectAnimal("dog"));

catBtn.addEventListener("click", () => selectAnimal("cat"));

function selectAnimal(animal) {
  navState = animal;
  infoEl.textContent = "";
  renderBtn.style.visibility = "visible";
  renderBtn.textContent = `Show me a ${animal} and a fact about them!`;
  console.log(navState);
}

/*rendering on button click, while focused pressing enter will also run the fetch and render cycle, 
holding enter can break things slightly and render several images and facts after one another*/
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
    infoEl.style.color = "crimson";
    console.error(`Something went wrong:\n${error}`);
    throw (infoEl.textContent = "Error, something went wrong.");
  }
}

//show the content and change the render button text to add some flavour
const showAndPrepareMore = () => {
  contentContainer.style.visibility = "visible";
  infoEl.style.color = "#653239";
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
        //in case the button somehow shows up when it shouldn't; lead the user to fix it themselves
        infoEl.style.color = "crimson";
        infoEl.textContent = "Please select an animal first.";
    }
  } catch (error) {
    //put error in console and give a user-friendly error message in DOM
    console.error(`Something went wrong:\n${error}`);
    infoEl.style.color = "crimson";
    throw (infoEl.textContent = "Error, something went wrong");
  }
}

//fetching json data from API
async function fetchData(url) {
  try {
    const request = await fetch(url);
    const data = await request.json();

    return data;
  } catch (error) {
    infoEl.style.color = "crimson";
    console.error(`Something went wrong:\n${error}`);
    //if this function fails, the problem should be the API
    throw (infoEl.textContent = "Error, something went wrong with the API.");
  }
}

//"random" number generator
const magicNumber = (max, start) => {
  return Math.floor(Math.random() * max) + start;
};

//clearing the way for a new render
const clearContents = () => {
  contentContainer.innerHTML = "";
  infoEl.textContent = "";
};
