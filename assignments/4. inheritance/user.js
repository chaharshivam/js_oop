// Factory method - We create methods inside every object, which takes more memory

function createUser (name, score) {
	let obj = {
		name,
		score
	};

	obj.increaseScore = function () {
		return ++(this.score);
	};

	obj.decreaseScore = function () {
		return --(this.score);
	};

	return obj;
}

function createPaidUser (name, score, balance) {
	let obj = createUser (name, score);

	obj.balance = balance;

	obj.increaseBalance = function () {
		return ++(this.balance);
	};

	obj.decreaseBalance = function () {
		return --(this.balance);
	};

	return obj;
}

let shivam = createPaidUser ('Shivam', 10, 15);

// Prototypal - We put user methods inside dunderproto __proto__

const userMethods = {
	increaseScore: function () {
		return ++(this.score);
	},
	decreaseScore: function () {
		return --(this.score);
	}
};

function createUser (name, score) {
	let obj = Object.create (userMethods);

	obj.name = name;
	obj.score = score;

	return obj;
}

const paidUserMethods = {
	increaseBalance: function () {
		return ++(this.balance);
	},
	decreaseBalance: function () {
		return --(this.balance);
	}
}

Object.setPrototypeOf (paidUserMethods, userMethods);

function createPaidUser (name, score, balance) {
	let obj = createUser (name, score);
	obj.balance = balance;

	Object.setPrototypeOf (obj, paidUserMethods);
	return obj;
}

let yash = createPaidUser('Yash', 20, 30);

// Pseudoclassical - We reference the user methods which saves us space
function createUser (name, score) {
	this.name = name;
	this.score = score;
}

createUser.prototype.increaseScore = function () {
	return ++(this.score);
}

createUser.prototype.decreaseScore = function () {
	return --(this.score);
}

let bhatia = new createUser ('Bhatia', 100);

function createPaidUser (name, score, balance) {
	createUser.call (this, name, score);

	this.balance = balance;
}

createPaidUser.prototype.increaseBalance = function () {
	return ++(this.balance);
}

createPaidUser.prototype.decreaseBalance = function () {
	return --(this.balance);
}

Object.setPrototypeOf(createPaidUser.prototype, createUser.prototype);

let tejas = new createPaidUser('Tejas', 50, 100);

// Class - is syntactic sugar for psudoclassical appraoch

class User {
	constructor (name, score) {
		this.name = name;
		this.score = score;
	}

	increaseScore () {
		return ++(this.score);
	}

	decreaseScore () {
		return --(this.score);
	}
}

class PaidUser extends User {
	constructor (name, score, balance) {
		// calls the constructor of User with its own 'this'
		super (name, score);
		this.balance = balance;
	}

	increaseBalance () {
		return ++(this.balance);
	}

	decreaseBalance () {
		return --(this.balance);
	}
}

let aman = new PaidUser ("Aman", 10, 30);
