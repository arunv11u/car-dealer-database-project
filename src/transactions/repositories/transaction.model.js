const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
	car: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Car",
		required: [true, "Car is required"]
	},
	dealer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Dealer",
		required: [true, "Dealer is required"]
	},
	buyerName: { type: String, required: [true, "Buyer name is required"] },
	buyerPhone: { type: String, required: [true, "Buyer phone is required"] },
	buyerEmail: { type: String, required: [true, "Buyer email is required"] },
	buyerAddress: {
		street: String,
		city: String,
		state: String,
		zip: String
	},
	paymentMethod: { type: String, required: [true, "Payment method is required"] },
	salePrice: { type: Number, required: [true, "Sale price is required"] },
	transactionDate: { type: Date, default: () => new Date() }
});

module.exports = mongoose.model("Transaction", transactionSchema);