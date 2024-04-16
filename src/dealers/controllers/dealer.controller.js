/* Student Name: Arun Varadharajalu
Student Number: 8896434 */


const express = require("express");
const { getAllDealersInteractor } = require("../interactors");

const router = express.Router();

router.get("/", async (request, response, next) => {
	try {
		const dealers = await getAllDealersInteractor();

		response.status(200).send(dealers);
	} catch (error) {
		console.error("Error in getting all dealers:", error);
		
		response.status(500).send({ error: "Internal Server Error" });
	}
});

module.exports = router;