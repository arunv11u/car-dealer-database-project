const { CarRepository } = require("../repositories/car.repository");

async function softDeleteCarInteractor(carId) {
    const carRepository = CarRepository();

    const deletedCar = await carRepository.softDelete(carId);

    return deletedCar;
}

module.exports = {
    softDeleteCarInteractor
};
