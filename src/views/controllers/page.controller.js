const express = require("express");
const Cars = require("../../cars/repositories/car.repository");
const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    const carRepository = Cars.CarRepository();
    const cars = carRepository.findAll();
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
