"use strict";

let carImage = null;

$(async () => {
	const dealersResponse = await axios.get("/dealer");
	const dealers = dealersResponse.data;

	const dealerEle = $("#dealer");
	dealers.forEach(dealer => {
		dealerEle.append(`<option value=${dealer.id}>${dealer.name}</option>`);
	});

	listenForImageUpload();

	const id = new URL(location.href).searchParams.get("id");
	const carResponse = await axios.get(`/car/${id}`);
	const car = carResponse.data;

	$("#make").val(car.make);
	$("#model").val(car.model);
	$("#year").val(car.year);
	$("#mileage").val(car.mileage);
	$("#price").val(car.price);
	$("#color").val(car.color);
	$("#condition").val(car.condition);
	$("#dealer").val(car.dealer);

	carImage = car.image;
	$("#uploadedImage").attr("src", carImage);
	$("#uploadContainer").css("display", "none");
	$("#imageContainer").css("display", "block");

	$("#updateCar").on("submit", async (event) => {
		event.preventDefault();

		const carData = {
			image: carImage,
			make: $("#make").val(),
			model: $("#model").val(),
			year: $("#year").val(),
			price: $("#price").val(),
			mileage: $("#mileage").val(),
			color: $("#color").val(),
			condition: $("#condition").val(),
			dealer: $("#dealer").val()
		};

		await axios.put(`/car/${id}`, carData);

		$("#toast-content").text("Car details updated successfully!");
		$('#toast').toast("show");
	});

	$("#delete-car").on("click", async () => {
		await axios.delete(`/car/${id}`);

		location.href = "/";
		
		$("#toast-content").text("Car has been deleted!");
		$('#toast').toast("show");
	});
});

function listenForImageUpload() {
	$("#imageUpload").on("change", function (event) {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = function () {
			carImage = reader.result;

			$("#uploadedImage").attr("src", carImage);
			$("#uploadContainer").css("display", "none");
			$("#imageContainer").css("display", "block");

		};

		reader.readAsDataURL(file);
	});

	$("#removeImg").on("click", function () {
		carImage = null;

		$("#uploadContainer").css("display", "block");
		$("#imageContainer").css("display", "none");
	});
}