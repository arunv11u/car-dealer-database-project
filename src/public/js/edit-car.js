"use strict";

let carImage = null;

$(async () => {
	console.log("Edit car script file");

	const dealersResponse = await axios.get("/dealer");
	const dealers = dealersResponse.data;

	const dealerEle = $("#dealer");
	dealers.forEach(dealer => {
		dealerEle.append(`<option value=${dealer.id}>${dealer.name}</option>`);
	});

	listenForImageUpload();

	$("#updateCar").on("submit", (event) => {
		event.preventDefault();

		console.log("dealer id :: car image :", $("#dealer").val(), carImage);
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

			console.log("carImage", carImage);
		};

		reader.readAsDataURL(file);
	});

	$("#removeImg").on("click", function () {
		carImage = null;

		$("#uploadContainer").css("display", "block");
		$("#imageContainer").css("display", "none");

		console.log("carImage : remove ::", carImage);
	});
}