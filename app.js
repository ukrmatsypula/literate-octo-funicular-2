// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => resolve(Math.random()), 5000);
// });

// console.log(promise);
// promise
//   .then((result) => {
//     console.log(result);
//     return 3721;
//   })
//   .then((y) => {
//     console.log(y);
//     return 3722;
//   })
//   .then((z) => console.log(z));

// function promiseCreator(time, value) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(value), time)
//   })
// }

// promiseCreator(3000, 'Ok!')
//   .then(result => console.log(result))

const url = "https://jsonplaceholder.typicode.com/posts";

fetch(url)
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then(posts => console.log(posts))
  .catch((err) => console.log(err));
const btnGetPosts = document.querySelector(".btn-get-posts");
const btnCreatePost = document.querySelector(".btn-create-post");

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

function createNewPost(body, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");

  xhr.addEventListener("error", () => {
    console.log("error");
  });
  xhr.send(JSON.stringify(body));
}

function cardTemplate(post) {
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
  return card;
}

function renderPosts(response) {
  const fragment = document.createDocumentFragment();
  response.forEach((post) => {
    const card = cardTemplate(post);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

btnGetPosts.addEventListener("click", (e) => {
  e.preventDefault();

  getPosts(renderPosts);
});

btnCreatePost.addEventListener("click", () => {
  const newPost = {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  };

  createNewPost(newPost, (response) => {
    const card = cardTemplate(response);
    container.insertAdjacentElement("afterend", card);
  });
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

function myHttpRequest({ method, url } = {}, cb) {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.addEventListener("load", () => {
      if (Math.floor(xhr.status / 100) !== 2) {
        cb(`Error. Status code: ${xhr.status}`, xhr);
        return;
      }
      const response = JSON.parse(xhr.responseText);
      cb(null, response);
    });

    xhr.addEventListener("error", () => {
      cb(`Error. Status code: ${xhr.status}`, xhr);
    });
    xhr.send();
  } catch (error) {
    cb(error);
  }
}

// myHttpRequest(
//   { method: "GET", url: "https://jsonplaceholder.typicode.com/posts" },
//   (err, response) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(response);
//   }
// );

function http() {
  return {
    get(url, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.addEventListener("load", () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener("error", () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });
        xhr.send();
      } catch (error) {
        cb(error);
      }
    },
    post(url, body, headers, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.addEventListener("load", () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener("error", () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });

        if (headers) {
          Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });
        }

        xhr.send(JSON.stringify(body));
      } catch (error) {
        cb(error);
      }
    },
  };
}

const myHttp = http();

myHttp.post(
  "https://jsonplaceholder.typicode.com/posts",
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    "Content-type": "application/json",
    "x-auth": "sakgjf32j20fj20jfij02fei0j0fjdf",
  },
  (err, response) => {
    console.log(err, response);
  }
);
