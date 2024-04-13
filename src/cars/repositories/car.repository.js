const Car = require("./car.model");


function CarRepository() {
	return {
		create: async function (newCar) {
			const car = await new Car(newCar).save();

			return formatCar(car);
		}
	};
}

function formatCar(car) {
	return {
		id: car._id,
		make: car.make,
		model: car.model,
		year: car.year,
		price: car.price,
		mileage: car.mileage,
		color: car.color,
		condition: car.condition
	};
}

module.exports = { CarRepository };