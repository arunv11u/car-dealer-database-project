const { CarRepository } = require("../repositories/car.repository");
const { TransactionRepository } = require("../repositories/transaction.repository");

async function buyCarInteractor(carId,dealerId, buyerInfo) {
	const carRepository = CarRepository();
    const car = await carRepository.findById(carId);

    if (!car) {
        throw new Error("Car not found");
    }

    if (car.isSold) {
        throw new Error("Car is already sold");
    }

    if (car.isDeleted){
        throw new Error("Car does not exist");
    }

	const transactionRepository = TransactionRepository();
    const transaction = await transactionRepository.create({
        car: carId,
        dealer: dealerId,
        ...buyerInfo
    });

    car.isSold = true;
    await carRepository.update(carId, car);

    return {
        transactionId: transaction.id,
        carId: carId,
        dealerId: dealerId,
        buyerName: buyerInfo.buyerName,
        salePrice: buyerInfo.salePrice
    };
}

module.exports = { buyCarInteractor };