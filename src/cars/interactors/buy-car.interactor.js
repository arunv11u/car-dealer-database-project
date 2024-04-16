/* Student Name: James Boby Vempala
Student Number: 8941304 */

/* Student Name: Arun Varadharajalu
Student Number: 8896434 */

const { CarRepository } = require("../repositories/car.repository");
const { TransactionRepository } = require("../../transactions/repositories/transaction.repository");

async function buyCarInteractor(carId, buyerInfo) {
	const carRepository = CarRepository();
	const car = await carRepository.findById(carId);

	if (!car) {
		throw new Error("Car not found");
	}

	if (car.isSold) {
		throw new Error("Car is already sold");
	}

	if (car.isDeleted) {
		throw new Error("Car does not exist");
	}

	const transactionRepository = TransactionRepository();
	const transaction = await transactionRepository.create({
		car: carId,
		salePrice: car.price,
		dealer: car.dealer,
		...buyerInfo
	});

	car.isSold = true;
	await carRepository.update(carId, car);

	return {
		transactionId: transaction.id,
		carId: carId,
		dealerId: car.dealer,
		buyerName: buyerInfo.buyerName,
		salePrice: buyerInfo.salePrice
	};
}

module.exports = { buyCarInteractor };