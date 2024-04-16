/* Student Name: Arun Varadharajalu
Student Number: 8896434 */

const corsModule = require("./cors");
const mongodbConnectModule = require("./mongodb-connect");
const pdfModule = require("./pdf");
const requestErrorHandlerModule = require("./request-error-handler");
const unhandledErrorHandlerModule = require("./unhandled-error-handler");

/**
 * Module exports combining various middleware and utility modules for easier import.
 */
module.exports = {
	...corsModule, // Export CORS-related functionality
	...mongodbConnectModule, // Export MongoDB connection functionality
	...pdfModule, // Export pdf functionality
	...requestErrorHandlerModule, // Export request error handling middleware
	...unhandledErrorHandlerModule // Export unhandled error handling middleware
};