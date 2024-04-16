
const validateDeleteCarInputs = () => {
	return function (request, response, next) {
		try {
			if (!request.params.id)
				throw new Error("Car Id is required");

			next();
		} catch (error) {
			throw { error: error.message, errorCode: 400 };
		}
	}
};

module.exports = { validateDeleteCarInputs };