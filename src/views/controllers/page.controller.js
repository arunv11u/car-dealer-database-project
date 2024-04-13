const express = require("express");

const router = express.Router();

router.get("/", async (request, response, next) => {
	try {
		return response.render("index");
	} catch (error) {
		throw error;
	}
});

module.exports = router;