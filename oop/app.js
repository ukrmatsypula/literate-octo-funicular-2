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

}