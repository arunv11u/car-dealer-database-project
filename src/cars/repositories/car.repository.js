const Car = require("./car.model");


function CarRepository() {
	return {
		create: async function (newCar) {
			const car = await new Car(newCar).save();

			return formatCar(car);
		},

		update: async function (carId, updateDTO) {
			const updatedCar = await Car.findByIdAndUpdate(carId, updateDTO, { new: true });

			return formatCar(updatedCar);
		},

		softDelete: async function (carId) {
			const deletedCar = await Car.findByIdAndUpdate(carId, { isDeleted: true }, { new: true });

			return formatCar(deletedCar);
		},

		findByMakeModelYear: async function (make, model, year) {
			const car = await Car.findOne({ make, model, year, isDeleted: false });

			return formatCar(car);
		},

		findAll: async function () {
			const cars = await Car.find({ isDeleted: false });
			return cars.map(formatCar);
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