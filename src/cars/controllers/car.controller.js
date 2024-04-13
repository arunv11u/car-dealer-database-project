const express = require("express");
const {
	createCarInteractor
} = require("../interactors");
const { validateCreateCarInputs } = require("../validators");

const router = express.Router();

router.post("/", [validateCreateCarInputs()], async (request, response, next) => {
	try {
		const requestDTO = {
			make: request.body.make,
			model: request.body.model,
			year: request.body.year,
			price: request.body.price,
			mileage: request.body.mileage,
			color: request.body.color,
			condition: request.body.condition
		};

		const responseDTO = await createCarInteractor(requestDTO);

		response.status(200).send(responseDTO);
	} catch (error) {
		console.error("Error in creating car :", error);

		next(error);
	}
});

module.exports = router;