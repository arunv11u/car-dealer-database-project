const { CarRepository, TransactionRepository } = require("../repositories");

async function buyCarInteractor(carId, buyerInfo) {
    const car = await CarRepository.findById(carId);

    if (!car) {
        throw new Error("Car not found");
    }

    if (car.isSold) {
        throw new Error("Car is already sold");
    }

    const transaction = await TransactionRepository.create({
        car: carId,
        ...buyerInfo
    });

    car.isSold = true;
    await CarRepository.update(carId, car);

    return {
        transactionId: transaction.id,
        carId: carId,
        buyerName: buyerInfo.buyerName,
        salePrice: buyerInfo.salePrice
    };
}

module.exports = { buyCarInteractor };