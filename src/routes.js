// Importing required modules
const cors = require("cors");
const express = require("express");

// Importing utility functions
const {
	corsOptions,
	requestErrorHandler
} = require("./utils");

// Function to set up routes and middleware for the Express app
function listen(app) {
	// Disable x-powered-by header
	app.disable("x-powered-by");

	// Enable CORS with options
	app.use(cors(corsOptions));

	// Parse JSON bodies
	app.use(express.json());
	// Parse URL-encoded bodies
	app.use(express.urlencoded({ extended: true }));

	// Middleware to log requests
	app.use((req, res, next) => {
		if (req.method !== "OPTIONS")
			console.log(`${req.method} : ${req.originalUrl}`);

		next();
	});

	// Health check endpoint
	app.use("/health-check", (req, res) => {
		return res.status(200).send();
	});

	// Importing controllers for different routes
	const carController = require("./cars/controllers/car.controller");

	// Mounting routes
	app.use("/car", carController);

	// Error handling middleware
	app.use(requestErrorHandler);
}

// Export the listen function
module.exports = { listen };