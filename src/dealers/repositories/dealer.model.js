/* Student Name: Arun Varadharajalu
Student Number: 8896434 */

/* Student Name: James Boby Vempala
Student Number: 8941304 */

/* Student Name: Fenil Moradiya
Student Number: 8941920 */

const mongoose = require("mongoose");

const dealerSchema = new mongoose.Schema({
	name: { type: String, required: [true, "Name is required"] },
	location: { type: String, required: [true, "Location is required"] },
	phone: { type: String, required: [true, "Phone Number is required"] },
	email: { type: String, required: [true, "Dealer Email is required"] }
});

module.exports = mongoose.model("Dealer", dealerSchema);