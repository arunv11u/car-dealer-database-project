/* Student Name: Fenil Moradiya
Student Number: 8941920 */

const { TransactionRepository } = require("../../transactions/repositories/transaction.repository");
const { pdfService } = require("../../utils");
const { getTodayDateStr } = require("../../utils/helpers/date.helper");


async function downloadSalesReportPdfInteractor() {

	const transactionRepository = TransactionRepository();

	const transactions = await transactionRepository.getAll();

	const templatePath = pdfService.getTemplatePath("pdf", "sales-report.hbs");

	const today = getTodayDateStr();
	const buffer = await pdfService.generatePdf(templatePath, { transactions, today });

	return buffer;
}

module.exports = { downloadSalesReportPdfInteractor };