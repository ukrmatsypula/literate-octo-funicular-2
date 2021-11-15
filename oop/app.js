// function Product(brand, price, discount) {
//   this.brand = brand;
//   this.price = price;
//   this.discount = discount;
//   console.log(this);
// }

// Product.prototype.getPriceWithDiscount = function () {
//   return (this.price * (100 - this.discount)) / 100;
// };

// Product.prototype.setPrice = function (newPrice) {
//   this.price = newPrice;
// };

// const apple = new Product("Apple", 100, 15);
// const samsung = new Product("Samsung", 200, 25);

// // Object.create()

// const protoForObj = {
//   sayHello() {
//     return `Hello world`;
//   },
// };

// const obj = Object.create(protoForObj, {
//   firstName: {
//     value: "Roman",
//   },
// });

// function User(firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;
// }

// User.prototype.getFullNamem = function () {
//   return `Hello ${this.firstName} ${this.lastName}`;
// };

// const user = new User("Roman", "Matsypula");
// console.log(user);

// function Customer(firstName, lastName, membership) {
//   User.call(this, firstName, lastName);
//   this.membership = membership;
// }

// Customer.prototype = Object.create(User.prototype);
// Customer.prototype.constructor = Customer;
// Customer.prototype.getMembership = function () {
//   return this.membership.toUpperCase();
// };

// const customer = new Customer("Ivan", "Petrenko", "basic");

// const parent = {
//   who: "cat",
//   whatSay: function () {
//     return "Meow";
//   },
// };

// const child = Object.create(parent)

// ES6
class Product {
  constructor(brand, price, discount) {
    this.brand = brand;
    this.price = price;
    this.discount = discount;
  }
  getPriceWithDiscount = function () {
    return this.price - (this.price * this.discount) / 100;
  };

  setPrice = function (newPrice) {
    this.price = newPrice;
  };

  static plus(x, y) {
    return x + y;
  }
}

const newProcuct = new Product("apple", 1000, 10);
const newProcuct2 = new Product("samsung", 2000, 15);

class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Customer extends User {
  constructor(firstName, lastName, membership) {
    super(firstName, lastName);
    this.membership = membership;
  }

  getFullName() {
    const parentResult = super.getFullName();

    console.log(parentResult, "membership: " + this.membership);
  }
}

const customer = new Customer("Roman", "Matsypula", "advenced");

console.log(customer);
