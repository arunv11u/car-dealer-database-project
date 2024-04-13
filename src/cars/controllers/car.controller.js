const express = require("express");
const {
	createCarInteractor
} = require("../interactors");
const { validateCreateCarInputs } = require("../validators/create-car.validator");
const { updateCarInteractor } = require("../interactors/update-car.interactor");
const { softDeleteCarInteractor } = require("../interactors/delete-car.interactor");
const { validateUpdateCarInputs } = require("../validators/update-car.validator");

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

router.put("/:id", [validateUpdateCarInputs()], async (request, response, next) => {
	try {
		const carId = request.params.id;
		const updateDTO = {
			make: request.body.make,
			model: request.body.model,
			year: request.body.year,
			price: request.body.price,
			mileage: request.body.mileage,
			color: request.body.color,
			condition: request.body.condition
		};

		const responseDTO = await updateCarInteractor(carId, updateDTO);

		response.status(200).send(responseDTO);
	} catch (error) {
		console.error("Error in updating car:", error);
		next(error);
	}
});

router.delete("/:id", async (request, response, next) => {
	try {
		const carId = request.params.id;

		const deletedCar = await softDeleteCarInteractor(carId);

		response.status(200).send(deletedCar);
	} catch (error) {
		console.error("Error in deleting car:", error);
		next(error);
	}
});

module.exports = router;