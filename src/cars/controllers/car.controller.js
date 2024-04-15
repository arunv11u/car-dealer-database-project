const express = require("express");
const {
	createCarInteractor
} = require("../interactors");
const { validateCreateCarInputs } = require("../validators/create-car.validator");
const { updateCarInteractor } = require("../interactors/update-car.interactor");
const { softDeleteCarInteractor } = require("../interactors/delete-car.interactor");
const { validateUpdateCarInputs } = require("../validators/update-car.validator");
const { getCarInteractor } = require("../interactors/get-car.interactor");
const { getAllCarsInteractor } = require("../interactors/get-all-cars.interactor");
const { buyCarInteractor } = require("../interactors/buy-car.interactor");
const { validateBuyCarInputs } = require("../validators/buy-car.validator");

const router = express.Router();

router.post("/", [validateCreateCarInputs()], async (request, response, next) => {
	try {
		const requestDTO = {
			image: request.body.image,
			make: request.body.make,
			model: request.body.model,
			year: request.body.year,
			price: request.body.price,
			mileage: request.body.mileage,
			color: request.body.color,
			condition: request.body.condition,
			dealer: request.body.dealer
		};

		const responseDTO = await createCarInteractor(requestDTO);

		response.status(200).send(responseDTO);
	} catch (error) {
		console.error("Error in creating car :", error);

		next(error);
	}
});

router.post("/buy",[validateBuyCarInputs()], async (request, response, next) => {
    try {
        const carId = request.body.carId;
        const buyerInfo = {
            buyerName: request.body.buyerName,
            buyerPhone: request.body.buyerPhone,
            buyerEmail: request.body.buyerEmail,
            buyerAddress: request.body.buyerAddress,
            paymentMethod: request.body.paymentMethod,
            salePrice: request.body.salePrice
        };

        const boughtCar = await buyCarInteractor(carId, buyerInfo);

        response.status(200).send(boughtCar);
    } catch (error) {
        console.error("Error in buying car:", error);
        next(error);
    }
});

router.put("/:id", [validateUpdateCarInputs()], async (request, response, next) => {
	try {
		const carId = request.params.id;
		const updateDTO = {
			image: request.body.image,
			make: request.body.make,
			model: request.body.model,
			year: request.body.year,
			price: request.body.price,
			mileage: request.body.mileage,
			color: request.body.color,
			condition: request.body.condition,
			dealer: request.body.dealer
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

router.get("/:make/:model/:year", async (request, response, next) => {
	try {
		const { make, model, year } = request.params;

		const car = await getCarInteractor(make, model, parseInt(year));

		response.status(200).send(car);
	} catch (error) {
		console.error("Error in getting car by make, model, and year:", error);
		next(error);
	}
});

router.get("/", async (request, response, next) => {
	try {
		const cars = await getAllCarsInteractor();

		response.status(200).send(cars);
	} catch (error) {
		console.error("Error in getting all cars:", error);
		response.status(500).send({ error: "Internal Server Error" });
	}
});

module.exports = router;