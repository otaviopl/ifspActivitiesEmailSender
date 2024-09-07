const { launch } = require('puppeteer');
const { acessLoginPage, makeLogin } = require('./login');
const { getAtividades } = require('./scraper');
const { makeTemplate, sendEmail } = require('./mailer');

async function enterSite() {
    const browser = await launch({ headless: false });
    const page = await browser.newPage();

    try {
        await page.goto('https://moodle.scl.ifsp.edu.br');
        await acessLoginPage(page);
        await makeLogin(page);
        
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        const atividades = await getAtividades(page);

        if (atividades.length > 0) {
            const template = makeTemplate(atividades);
            await sendEmail(template);
        }
    } catch (error) {
        console.error('Error during site access:', error);
    } finally {
        await browser.close();
    }
}

module.exports = { enterSite };
