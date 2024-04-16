/* Student Name: Arun Varadharajalu
Student Number: 8896434 */

const express = require("express");
const CarRepository = require("../../cars/repositories/car.repository");
const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    const carRepository = CarRepository.CarRepository();
    const cars = await carRepository.findAll();
    return response.render("index", { cars });
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

router.get("/edit-car", async (request, response, next) => {
  try {
    return response.render("edit-car");
  } catch (error) {
    throw error;
  }
});

module.exports = router;
