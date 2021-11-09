const btn = document.querySelector("#btn");
const container = document.querySelector(".container");

function getPosts(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.addEventListener("error", () => {
    console.log("error");
  });
  xhr.send();
}

function renderPosts(response) {
  const fragment = document.createDocumentFragment();
  response.forEach((post) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = post.title;

    const article = document.createElement("p");
    article.classList.add("card-text");
    article.textContent = post.body;

    cardBody.appendChild(title);
    cardBody.appendChild(article);

    card.appendChild(cardBody);
    fragment.appendChild(card);

    return card;
  });

  container.appendChild(fragment);
}

btn.addEventListener("click", (e) => {
  e.preventDefault();

  getPosts(renderPosts);
});

(function () {
  const apiUrl = "https://jsonplaceholder.typicode.com";
  const usersListEl = document.querySelector(".users-list");
  const userInfoEl = document.querySelector(".user-info");

  usersListEl.addEventListener("click", onUserClickHandler);

  function onUserClickHandler(e) {
    e.preventDefault();

    if (e.target.dataset.userId) {
      const userID = e.target.dataset.userId;
      getUserInfoHTTP(userID, onGetUserInfoCallback);
    }
  }

  function getUsersHttp(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("get", `${apiUrl}/users`);
    xhr.addEventListener("load", () => {
      if (xhr.status !== 200) {
        console.log("Error", xhr.status);
        return;
      }

      const res = JSON.parse(xhr.responseText);
      cb(res);
    });
    xhr.send();
  }

  function getUserInfoHTTP(id, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("get", `${apiUrl}/users/${id}`);
    xhr.addEventListener("load", () => {
      if (xhr.status !== 200) {
        console.log("Error", xhr.status);
        return;
      }

      const res = JSON.parse(xhr.responseText);
      cb(res);
    });
    xhr.send();
  }

  function onGetUserInfoCallback(user) {
    if (!user.id) {
      console.log("User not found");
      return;
    }
    renderUserInfo(user);
  }

  function renderUserInfo(user) {
    userInfoEl.innerHTML = "";
    const template = userInfoTemplate(user);
    userInfoEl.insertAdjacentHTML("afterbegin", template);
  }

  function onGetUsersCallback(users) {
    if (!users.length) {
      return;
    }

    renderUsersList(users);
  }

  function renderUsersList(users) {
    const fragment = users.reduce(
      (acc, user) => acc + userListItemTemplate(user),
      ""
    );
    usersListEl.insertAdjacentHTML("afterbegin", fragment);
  }

  function userListItemTemplate(user) {
    return `
    <button type="button" class="list-group-item list-group-item-action" data-user-id="${user.id}">${user.name}</button>
    `;
  }

  function userInfoTemplate(user) {
    return `<div class="card border-dark mb-3">
    <div class="card-header">${user.name}</div>
    <div class="card-body text-dark">
      <ul class="list-group list-group-flush">
      <li class='list-group-item'>${user.username}</li>
      <li class='list-group-item'>${user.website}</li>
      <li class='list-group-item'>${user.company.name}</li>
      <li class='list-group-item'>${user.address.city}</li>
      </ul>
    </div>
    <fiv class='card-footer border-dark'>Phone: ${user.phone}</fiv>
  </div>`;
  }

  getUsersHttp(onGetUsersCallback);
})();
