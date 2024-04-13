const { CarRepository } = require("../repositories/car.repository");

async function getAllCarsInteractor() {
    const carRepository = CarRepository();

    const cars = await carRepository.findAll();

    return cars;
}

module.exports = {
    getAllCarsInteractor
};
