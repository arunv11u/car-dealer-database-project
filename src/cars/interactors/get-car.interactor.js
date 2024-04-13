const { CarRepository } = require("../repositories/car.repository");

async function getCarInteractor(make, model, year) {
    const carRepository = CarRepository();

    const car = await carRepository.findByMakeModelYear(make, model, year);

    return car;
}

module.exports = {
    getCarInteractor
};
