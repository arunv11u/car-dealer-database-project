const { pdfService } = require("../../utils");
const { getTodayDateStr } = require("../../utils/helpers/date.helper");
const { CarRepository } = require("../repositories/car.repository");


async function downloadInventoryPdfInteractor() {
	
	const carRepository = CarRepository();
	
	const cars = await carRepository.getAllCarsInInventory();

	const templatePath = pdfService.getTemplatePath("pdf", "car-inventory.hbs");

	const today = getTodayDateStr();
	const buffer = await pdfService.generatePdf(templatePath, {cars, today});

	return buffer;
}

module.exports = { downloadInventoryPdfInteractor };