const mongoose = require('mongoose');

// Define car schema
const carSchema = new mongoose.Schema({
	make: {
		type: String,
		required: true
	},
	model: {
		type: String,
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	mileage: {
		type: Number,
		required: true
	},
	color: {
		type: String,
		required: true
	},
	condition: {
		type: String,
		enum: ['New', 'Used'],
		default: 'Used'
	}
});

// Define dealer schema
const dealerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}
});


// Define schema for sales transactions
const transactionSchema = new mongoose.Schema({
	car: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Car',
		required: true
	},
	dealer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Dealer',
		required: true
	},
	buyerName: {
		type: String,
		required: true
	},
	buyerPhone: {
		type: String,
		required: true
	},
	buyerEmail: {
		type: String,
		required: true
	},
	buyerAddress: {
		street: String,
		city: String,
		state: String,
		zip: String
	},
	paymentMethod: {
		type: String,
		required: true
	},
	salePrice: {
		type: Number,
		required: true
	},
	transactionDate: {
		type: Date,
		default: Date.now
	}
});

// Define models based on the schemas
const Car = mongoose.model('Car', carSchema);
const Dealer = mongoose.model('Dealer', dealerSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
	Car,
	Dealer,
	Transaction
};