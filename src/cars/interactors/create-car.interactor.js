const { CarRepository } = require("../repositories/car.repository");


async function createCarInteractor(requestDTO) {
	const responseDTO = {};

	const carRepository = CarRepository();

	const newCar = {
		make: requestDTO.make,
		model: requestDTO.model,
		year: requestDTO.year,
		price: requestDTO.price,
		mileage: requestDTO.mileage,
		color: requestDTO.color,
		condition: requestDTO.condition
	};

	const car = await carRepository.create(newCar);

	responseDTO.id = car.id;
	responseDTO.make = car.make;
	responseDTO.model = car.model;
	responseDTO.year = car.year;
	responseDTO.price = car.price;
	responseDTO.mileage = car.mileage;
	responseDTO.color = car.color;
	responseDTO.condition = car.condition;

	return responseDTO;
}

module.exports = {
	createCarInteractor
};