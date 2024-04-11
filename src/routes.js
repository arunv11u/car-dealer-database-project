// Importing required modules
const cors = require("cors");
const express = require("express");
const path = require("path");

// Importing utility functions
const {
	corsOptions,
	requestErrorHandler
} = require("./utils");

// Function to set up routes and middleware for the Express app
function listen(app) {
	// Disable x-powered-by header
	app.disable("x-powered-by");
	// Enable trust proxy for secure headers
	app.enable("trust proxy");

	// Enable CORS with options
	app.use(cors(corsOptions));

	// Parse JSON bodies
	app.use(express.json());
	// Parse URL-encoded bodies
	app.use(express.urlencoded({ extended: true }));

	// Serve static files from the public directory
	app.use(express.static(path.resolve(__dirname, "public")));

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
	

	// Mounting routes
	

	// Error handling middleware
	app.use(requestErrorHandler);
}

// Export the listen function
module.exports = { listen };