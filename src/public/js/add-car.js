"use strict";

let carImage = null;

$(async () => {
	const dealersResponse = await axios.get("/dealer");
	const dealers = dealersResponse.data;

	const dealerEle = $("#dealer");
	dealers.forEach((dealer) => {
		dealerEle.append(`<option value=${dealer.id}>${dealer.name}</option>`);
	});

	listenForImageUpload();

	$("#addCar").on("submit", async (event) => {
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

		try {
			await axios.post("/car/", carData);

			window.location.href = "/";

			$("#toast-content").text("Car added successfully!");
			$('#toast').toast("show");
		} catch (error) {
			console.error("Error:", error);
		}
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
