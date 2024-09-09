import puppeteer from 'puppeteer';
import { makeLogin } from './login.js';
import { getAtividadesDeSeteDias } from './scraper.js';
import { makeTemplate,sendEmail } from './mailSender.js';

async function enterSite() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    try {
        await page.goto('https://moodle.scl.ifsp.edu.br');
        await makeLogin(page);
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        const atividades = await getAtividadesDeSeteDias(page);
        console.log(atividades)
        if (atividades.length > 0) {
            const template = makeTemplate(atividades);
            await sendEmail(template);
        } 
        else {
            console.log('⚠️ Nenhuma atividade encontrada.');}
    } 
    catch (error) {
        console.error('Ocorreu um erro durante o acesso ao site:', error);
    } 
    finally {
        await browser.close();}
}
enterSite();