/* Student Name: Arun Varadharajalu
Student Number: 8896434 */

/* Student Name: Fenil Moradiya
Student Number: 8941920 */

const validateGetCarInputs = () => {
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

module.exports = { validateGetCarInputs };