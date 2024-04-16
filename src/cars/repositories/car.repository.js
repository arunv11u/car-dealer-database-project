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

		findAll: async function () {
			const cars = await Car.find({ isDeleted: false });

			return cars.map(car => formatCar(car));
		},

		findById: async function (carId) {
			const car = await Car.findById(carId);

			if (!car)
				throw new Error("Car not found");

			return formatCar(car);
		},

		update: async function (carId, updateDTO) {
			const updatedCar = await Car.findByIdAndUpdate(carId, updateDTO, { new: true });

			if (!updatedCar)
				throw new Error("Car not found");

			return formatCar(updatedCar);
		},

		getAllCarsInInventory: async function () {
			const cars = await Car.find({ isDeleted: false, isSold: false });

			return cars.map(car => formatCar(car));
		},
	};
}

function formatCar(car) {
	return {
		id: car._id,
		image: car.image,
		make: car.make,
		model: car.model,
		year: car.year,
		price: car.price,
		mileage: car.mileage,
		color: car.color,
		condition: car.condition,
		dealer: car.dealer,
		isSold: car.isSold
	};
}

module.exports = { CarRepository };