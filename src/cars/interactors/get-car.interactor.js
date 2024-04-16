/* Student Name: Fenil Moradiya
Student Number: 8941920 */

/* Student Name: Arun Varadharajalu
Student Number: 8896434 */
const { CarRepository } = require("../repositories/car.repository");

async function getCarInteractor(id) {
	const carRepository = CarRepository();

	const car = await carRepository.findById(id);

	return car;
}

module.exports = {
	getCarInteractor
};
