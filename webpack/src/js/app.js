// import { conf, foo } from "./module1";

// import * as mod1 from "./module1";

// console.log(mod1.conf)
// console.log(mod1.foo());

import Product from "./module2";

const product = new Product("Yellow");

console.log(product);

// const User = {
//   name: "Denis",
//   getName() {
//     return this.name;
//   },
//   setName(name) {
//     this.name = name;
//   },
// };

// User.setName('Roman');
// console.log(User.name);

// function User(name) {
//   let userName = name;

//   return Object.freeze({
//     getName() {
//       return userName;
//     },
//     setName(name) {
//       userName = name;
//     },
//   });
// }

// const denis = new User("Roman");

let data = {
  name: "Denis",
};

export function getData() {
  return data;
}
