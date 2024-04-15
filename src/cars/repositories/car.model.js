const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
	make: { type: String, required: [true, "Make is required"] },
	model: { type: String, required: [true, "Model is required"] },
	year: { type: Number, required: [true, "Year is required"] },
	price: { type: Number, required: [true, "Price is required"] },
	mileage: { type: Number, required: [true, "Mileage is required"] },
	color: { type: String, required: [true, "Color is required"] },
	condition: { type: String, enum: ["New", "Used"], required: [true, "Condition is required"] },
	isDeleted: { type: Boolean, default: false },
	isSold:{type:Boolean, default:false}
}, {
	timestamps: { createdAt: "creationDate", updatedAt: "lastModifiedDate" }
});

module.exports = mongoose.model("cars", carSchema);