"use strict";

const addBtn = document.querySelector("#add-card");
const rowWrap = document.querySelector(".row");

function fetchUserData() {
  const apiUrl = "https://api.github.com/users/mehtab-CodeClouds";
  const xhrRequest = new XMLHttpRequest();

  xhrRequest.open("GET", apiUrl);

  xhrRequest.onreadystatechange = function () {
    if (xhrRequest.readyState === 4 && xhrRequest.status === 200) {
      const responseData = JSON.parse(xhrRequest.responseText);

      // Call createCard and pass the fetched data to it
      createCard(responseData);
    }
  };

  xhrRequest.send();
}

rowWrap.innerHTML = "";
let cardCount = 0;

function createCard(data) {
  const profileUser = document.createElement("div");
  profileUser.classList.add("col-md-4");
  profileUser.innerHTML = `
    <div class="card">
      <img
        src="${data.avatar_url}"
        class="card-img-top"
        alt="Avatar"
      />
      <div class="card-body text-center">
        <h5 class="card-title" id="card-head">${data.name}</h5>
        <p class="card-text">
          Followers - <span id="followers">${data.followers}</span>
        </p>
        <p class="card-text">Repositories - <span id="repo">${data.public_repos}</span></p>
        <a
          href="#"
          class="btn btn-danger mt-3 remove-btn"
          id="remove-btn"
          >Remove</a
        >
      </div>
    </div>`;

  rowWrap.append(profileUser);
}

addBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (cardCount < 6) {
    fetchUserData(); // Fetch data and then create the card
    cardCount++;
  }
});

rowWrap.addEventListener("click", function (e) {
  const mainremoveBtn = e.target.classList.contains("remove-btn");
  if (!mainremoveBtn) return;

  e.preventDefault();
  e.target.closest(".col-md-4").remove();
  cardCount--;
});
