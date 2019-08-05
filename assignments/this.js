console.log(this.document === document); // Output true

console.log(this === window); //Output true

var myFunction = function() {
  console.log(this);
};
myFunction(); // Output Window object

function f1() {
  "use strict";
  return this;
}

console.log(f1() === window); //Output false

function foo() {
  console.log("Simple function call");
  console.log(this === window);
}

foo(); //Output true
console.log(this === window); // Output true

(
  // This for IIFE
  function() {
    console.log("Anonymous function invocation");
    console.log(this === window);
  }
)(); //Output true

// This for IIFE in strict mode
function foo() {
  "use strict";
  console.log("Simple function call");
  console.log(this === window);
}

foo(); // Output false

var myObject = {};
myObject.someMethod = function() {
  console.log(this);
};
myObject.someMethod(); //Value Of This = {someMethod}

// This refers to the New Instance

function Person(fn, ln) {
  this.first_name = fn;
  this.last_name = ln;

  this.displayName = function() {
    console.log(`Name: ${this.first_name} ${this.last_name}`);
  };
}

let person = new Person("John", "Reed");
person.displayName(); // Output: John Reed
let person2 = new Person("Paul", "Adams");
person2.displayName(); // Output: Paul Adams

//This refers to the invoker Object
function foo() {
  "use strict";
  console.log("Simple function call");
  console.log(this === window);
}

let user = {
  count: 10,
  foo: foo,
  foo1: function() {
    console.log(this === window);
  }
};

user.foo(); // Output false
let fun1 = user.foo1;
fun1(); // Output ?? true
user.foo1(); // Output ?? false

//this will call apply and bind

this.x = 9;
var module = {
  x: 81,
  getX: function() {
    return this.x;
  }
};

module.getX(); // Output ?? 81

var retrieveX = module.getX;
retrieveX(); //Output ?? 9

var boundGetX = retrieveX.bind(module);
boundGetX(); // Output ?? 81

// Call with new constructor

function Person(fn, ln) {
  this.first_name = fn;
  this.last_name = ln;

  this.displayName = function() {
    console.log(`Name: ${this.first_name} ${this.last_name}`);
  };
}

let person = new Person("John", "Reed");
person.displayName(); // Output John Reed
let person2 = new Person("Paul", "Adams");
person2.displayName(); // Output Paul Adams

person.displayName.call(person2); // Output ?? Paul Adams

// Guess the output of the following

const a = {
  a: "a"
};
const obj = {
  getThis: () => this,
  getThis2() {
    return this;
  }
};
obj.getThis3 = obj.getThis.bind(obj);
obj.getThis4 = obj.getThis2.bind(obj);

// Output - Window because arrow functions don't bind 'this'
obj.getThis();

// Output - Window
obj.getThis.call(a);

// Output - {obj}
obj.getThis2();

// Output - {a}
obj.getThis2.call(a);

// Output - Window
obj.getThis3();

// Output - Window
obj.getThis3.call(a);

// Output - obj
obj.getThis4();

// Output - obj because already bound to obj
obj.getThis4.call(a);
