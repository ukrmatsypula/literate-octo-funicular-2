function getPost(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((post) => resolve(post))
      .catch((err) => reject(err));
  });
}

getPost(55).then((post) => console.log(post));

function getPost2(id) {
  const [userType, userId] = id.split("-");
  return fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`).then(
    (response) => response.json()
  );
}

getPost2('user-1')
  .then((post) => console.log(post))
  .catch((err) => console.log(err));

function getPost3(id) {
  return Promise.resolve().then(() => {
    const [userType, userId] = id.split("-");
    return fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`).then(
      (response) => response.json()
    );
  });
}

async function getPost(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const data = await response.json();
  return data;
}

getPost(1)
  .then(post => console.log(post))
  .catch(err => console.log(err))