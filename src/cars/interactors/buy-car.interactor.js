const { CarRepository} = require("../repositories/car.repository");
const { TransactionRepository } = require("../repositories/transaction.repository");

async function buyCarInteractor(carId,dealerId, buyerInfo) {
    const car = await CarRepository.findById(carId);

    if (!car) {
        throw new Error("Car not found");
    }

    if (car.isSold) {
        throw new Error("Car is already sold");
    }

    if (car.isDeleted){
        throw new Error("Car does not exist");
    }
    const transaction = await TransactionRepository.create({
        car: carId,
        dealer: dealerId,
        ...buyerInfo
    });

    car.isSold = true;
    await CarRepository.update(carId, car);

    return {
        transactionId: transaction.id,
        carId: carId,
        dealerId: dealerId,
        buyerName: buyerInfo.buyerName,
        salePrice: buyerInfo.salePrice
    };
}

module.exports = { buyCarInteractor };