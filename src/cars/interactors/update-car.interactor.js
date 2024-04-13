const { CarRepository } = require("../repositories/car.repository");

async function updateCarInteractor(carId, updateDTO) {
    const carRepository = CarRepository();

    const updatedCar = await carRepository.update(carId, updateDTO);

    return updatedCar;
}

module.exports = {
    updateCarInteractor
};
