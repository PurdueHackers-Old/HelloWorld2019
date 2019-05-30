import ServerType from '../backend/server';
import CONFIG from '../dist/backend/config';
import Server from '../dist/backend/server';
import * as puppeteer from 'puppeteer';

jest.setTimeout(100000);

let server: ServerType;
let browser: puppeteer.Browser;
describe('Suite: Home Page -- E2E', () => {
	beforeEach(async () => {
		server = await Server.createInstance();
		await server.mongoose.connection.dropDatabase();
		await server.start();
		browser = await puppeteer.launch({
			headless: CONFIG.HEADLESS
		});
	});

	afterEach(async () => {
		await browser.close();
		await server.stop();
	});

	it('Renders the home page', async () => {
		const page = await browser.newPage();
		await page.goto(`http://localhost:${CONFIG.PORT}`);
		await expect(page).toMatch('Home Page');
	});

	it('Fails to render a non-existant page', async () => {
		const page = await browser.newPage();
		await page.goto(`http://localhost:${CONFIG.PORT}/blah`);
		await expect(page).toMatch('404');
		await expect(page).toMatch('This page could not be found');
	});
});
