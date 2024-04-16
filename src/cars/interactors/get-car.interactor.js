const { CarRepository } = require("../repositories/car.repository");

async function getCarInteractor(id) {
	const carRepository = CarRepository();

	const car = await carRepository.findById(id);

	return car;
}

module.exports = {
	getCarInteractor
};
