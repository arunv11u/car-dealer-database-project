/* Student Name: Arun Varadharajalu
Student Number: 8896434 */

/* Student Name: James Boby Vempala
Student Number: 8941304 */

/* Student Name: Fenil Moradiya
Student Number: 8941920 */

const express = require("express");
const {
	createCarInteractor
} = require("../interactors");
const { validateCreateCarInputs } = require("../validators/create-car.validator");
const { updateCarInteractor } = require("../interactors/update-car.interactor");
const { softDeleteCarInteractor } = require("../interactors/delete-car.interactor");
const { getCarInteractor } = require("../interactors/get-car.interactor");
const { getAllCarsInteractor } = require("../interactors/get-all-cars.interactor");
const { buyCarInteractor } = require("../interactors/buy-car.interactor");
const {
	validateDeleteCarInputs,
	validateGetCarInputs,
	validateUpdateCarInputs,
	validateBuyCarInputs
} = require("../validators");
const { downloadInventoryPdfInteractor } = require("../interactors/download-inventory-pdf.interactor");
const { downloadSalesReportPdfInteractor } = require("../interactors/download-sales-report-pdf.interactor");

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

router.get("/", async (request, response, next) => {
	try {
		const cars = await getAllCarsInteractor();

		response.status(200).send(cars);
	} catch (error) {
		console.error("Error in getting all cars:", error);
		response.status(500).send({ error: "Internal Server Error" });
	}
});

router.post("/buy", [validateBuyCarInputs()], async (request, response, next) => {
	try {
		const carId = request.body.carId;
		const buyerInfo = {
			buyerName: request.body.buyerName,
			buyerPhone: request.body.buyerPhone,
			buyerEmail: request.body.buyerEmail,
			buyerAddress: request.body.buyerAddress,
			paymentMethod: request.body.paymentMethod
		};

		const boughtCar = await buyCarInteractor(carId, buyerInfo);

		response.status(200).send(boughtCar);
	} catch (error) {
		console.error("Error in buying car:", error);
		next(error);
	}
});

router.get("/download-inventory-pdf", async (request, response, next) => {
	try {
		const pdfBuffer = await downloadInventoryPdfInteractor();

		response.setHeader("content-type", "application/pdf");
		response.end(pdfBuffer);
	} catch (error) {
		console.error("Error in downloading inventory pdf:", error);
		next(error);
	}
});

router.get("/sales-report-pdf", async (request, response, next) => {
	try {
		const pdfBuffer = await downloadSalesReportPdfInteractor();

		response.setHeader("content-type", "application/pdf");
		response.end(pdfBuffer);
	} catch (error) {
		console.error("Error in downloading inventory pdf:", error);
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

router.delete("/:id", [validateDeleteCarInputs()], async (request, response, next) => {
	try {
		const carId = request.params.id;

		const deletedCar = await softDeleteCarInteractor(carId);

		response.status(200).send(deletedCar);
	} catch (error) {
		console.error("Error in deleting car:", error);
		next(error);
	}
});

router.get("/:id", [validateGetCarInputs()], async (request, response, next) => {
	try {
		const carId = request.params.id;

		const car = await getCarInteractor(carId);

		response.status(200).send(car);
	} catch (error) {
		console.error("Error in getting car details:", error);
		next(error);
	}
});

module.exports = router;