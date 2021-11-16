function myFunction() {
  return console.log("myFunction");
}

const config = {
  apiUrl: "demo.com",
};

export { config as conf, myFunction as foo };
