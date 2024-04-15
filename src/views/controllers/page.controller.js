const express = require("express");

const router = express.Router();

router.get("/", async (request, response, next) => {
	try {
		return response.render("index");
	} catch (error) {
		throw error;
	}
});

router.get("/add-car", async (request, response, next) => {
	try {
		return response.render("add-car");
	} catch (error) {
		throw error;
	}
});
module.exports = router;