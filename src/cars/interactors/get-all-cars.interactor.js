/* Student Name: Fenil Moradiya
Student Number: 8941920 */

const { CarRepository } = require("../repositories/car.repository");

async function getAllCarsInteractor() {
    const carRepository = CarRepository();

    const cars = await carRepository.findAll();

    return cars;
}

module.exports = {
    getAllCarsInteractor
};
