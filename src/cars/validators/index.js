const {
	validateCreateCarInputs
} = require("./create-car.validator");
const { validateUpdateCarInputs } = require("./update-car.validator");
const { validateGetCarInputs } = require("./get-car.validator");
const { validateDeleteCarInputs } = require("./delete-car.validator");
const { validateBuyCarInputs } = require("./buy-car.validator");


module.exports = {
	validateCreateCarInputs,
	validateUpdateCarInputs,
	validateGetCarInputs,
	validateDeleteCarInputs,
	validateBuyCarInputs
};