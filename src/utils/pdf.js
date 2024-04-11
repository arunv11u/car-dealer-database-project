const { promisify } = require("util");
const fs = require("fs");
const { launch } = require("puppeteer");
const { join } = require("path");
const { compile } = require("handlebars");


const readFile = promisify(fs.readFile);

class PdfService {

	constructor() {
		this.basePath = join(__dirname, './assets/templates');

		this.options = {
			format: 'a4',
			margin: { top: 40, bottom: 40 },
			printBackground: true
		};
	}

	get defaultOptions() {
		return this.options;
	}

	set customOptions(_options) {
		this.options = _options;
	}

	getTemplatePath(folderName, fileName) {
		return join(this.basePath, folderName, fileName);
	}

	async getTemplateHtml(path) {
		console.log(`Loading template file in memory : ${path}`);
		try {
			return await readFile(path, 'utf8');
		} catch (err) {
			console.error(`Error in getTemplateHtml :`, err);

			return Promise.reject(
				`Could not load html template due to ${JSON.stringify(err)}`
			);
		}
	}

	async generatePdf(
		path,
		pdfDetails,
		options
	) {
		let data = { ...pdfDetails };
		try {
			const res = await this.getTemplateHtml(path);
			// Now we have the html code of our template in res objec
			console.log('Compiling the template with handlebars');
			const template = compile(res, { strict: true });

			// we have compile our code with handlebars
			const result = template(data);
			// We can use this to add dyamic data to our handlebas template at run time from database or API as per need. you can read the official doc to learn more https://handlebarsjs.com/
			const html = result;

			// we are using headless mode
			const browser = await launch({
				headless: true,
				args: ['--no-sandbox', '--disable-setuid-sandbox'],
				ignoreDefaultArgs: ['--disable-extensions'],
				// slowMo: 500,
			});

			const page = await browser.newPage();

			// page.setUserAgent(
			//   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36WAIT_UNTIL=load'
			// );
			// We set the page content as the generated html by handlebars
			await page.setContent(html, { waitUntil: 'load' });
			await page.content();
			// We use pdf function to generate the pdf in the same folder as this file.
			// { path: 'invoice.pdf', format: 'A4' }

			let pdfBuffer = await page.pdf(options);
			await browser.close();

			console.log("pdfBuffer ::", pdfBuffer);
			return pdfBuffer;
		} catch (error) {
			console.error(`Error in generatePdf :`, error);

			return Promise.reject({ error: error, errorCode: 500 });
		}
	}
}

const pdfService = new PdfService();

module.exports = { pdfService };