const validateUpdateCarInputs = () => {
	return function (request, response, next) {
		try {
			if (!request.params.id)
				throw new Error("Car ID is required");

			if (!request.body.image)
				throw new Error("Image is required");

			if (!request.body.make)
				throw new Error("Make is a required");

			if (!request.body.model)
				throw new Error("Model is a required");

			if (!request.body.year)
				throw new Error("Year is required");

			if (!request.body.price)
				throw new Error("Price is required");

			if (!request.body.mileage)
				throw new Error("Mileage is required");

			if (!request.body.color)
				throw new Error("Color is required");

			if (!request.body.condition)
				throw new Error("Condition is required");

			if (!request.body.dealer)
				throw new Error("Dealer is required");

			next();
		} catch (error) {
			throw { error: error.message, errorCode: 400 };
		}
	}
};

module.exports = { validateUpdateCarInputs };