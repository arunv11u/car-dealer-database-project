"use strict";

/* Student Name: James Boby Vempala
Student Number: 8941304 */

import { faker } from 'https://esm.sh/@faker-js/faker';

$(() => {
	$("#car-inventory-pdf").on("click", async () => {
		const pdfBufferResponse = await axios.get("/car/download-inventory-pdf", { responseType: "arraybuffer" });
		const pdfBuffer = pdfBufferResponse.data;

		downloadPDF(pdfBuffer, "inventory-report.pdf");
	});

	$("#sales-report-pdf").on("click", async () => {
		const pdfBufferResponse = await axios.get("/car/sales-report-pdf", { responseType: "arraybuffer" });
		const pdfBuffer = pdfBufferResponse.data;

		downloadPDF(pdfBuffer, "sales-report.pdf");
	});
});

window.goToProduct = function (id) {
	location.href = `/edit-car/?id=${id}`;
}

window.buyCar = async function (id) {
	const orderDetails = {
		carId: id,
		buyerName: faker.person.fullName(),
		buyerPhone: faker.phone.number("+1 (###)-###-####"),
		buyerEmail: faker.internet.email(),
		paymentMethod: faker.helpers.arrayElement(['Cash', 'Credit', 'Debit'])
	};

	await axios.post("/car/buy", orderDetails);

	location.href = "/";
}

function downloadPDF(pdfBuffer, fileName) {
	const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');

	link.href = url;

	link.download = fileName;

	link.click();

	URL.revokeObjectURL(url);
}