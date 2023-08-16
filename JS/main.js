"use strict";

const contentContainer = document.getElementById("container");
const navBtn = document.getElementById("nav-btn");

const baseURL = "https://shibe.online/api/shibes?";
// other attempted APIs: "https://random-d.uk/api"https://randomfox.ca/floof/"https://randomfox.ca/images/"
let navState = "main";

navBtn.addEventListener("click", () => {
  navState = "main";
  navigate(`${baseURL}count=${magicNumber(100, 1)}&urls=true&httpsUrls=true.jpg`);
});

function renderDog(dog) {
  const render = document.createElement("img");
  contentContainer.append(render);
  render.src = dog;
}

async function navigate(url) {
  const data = await fetchData(url);

  contentContainer.innerHTML = "";

  if (navState === "main") {
    const doggy = data[magicNumber(data.length, 1)];
    console.log(doggy);
    renderDog(doggy);
  } else {
    console.log(data);
    renderDogDetails(data);
  }
}

/*async function fetchData(url) {
  const request = fetch(url);
  const data = await request.json();

  return data;
}*/

async function fetchData(url) {
  const request = await fetch(url);
  const data = await request.json();

  return data;
  //fetch(`${baseURL}/${magicNumber()}.jpg`).then((response) => console.log(response));
}

function magicNumber(max, start) {
  return Math.floor(Math.random() * max) + start;
}

//fetchData(baseURL + "/http/418");

//418 https://random-d.uk/api/http/418
//"/duck"
