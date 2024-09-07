const { launch } = require('puppeteer');
const { makeLogin } = require('./login');
const { getAtividades } = require('./scraper');
const { makeTemplate, sendEmail } = require('./mailSender');

console.log('Script iniciado...');

async function enterSite() {
    console.log('Função enterSite chamada...');

    const browser = await launch({ headless: false });
    const page = await browser.newPage();

    try {
        console.log('🚀 Iniciando o navegador...');
        await page.goto('https://moodle.scl.ifsp.edu.br');
        console.log('🌐 Navegando para o Moodle...');

        await makeLogin(page);
        console.log('🔓 Login realizado com sucesso.');

        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        console.log('📃 Página carregada após o login.');

        // Aqui começa a extração das atividades
        const atividades = await getAtividades(page);
        console.log('📅 Atividades extraídas:', atividades);

        if (atividades.length > 0) {
            console.log('✉️ Preparando template de email...');
            const template = makeTemplate(atividades);
            await sendEmail(template);
            console.log('✅ Email enviado com sucesso!');
        } else {
            console.log('⚠️ Nenhuma atividade encontrada.');
        }
    } catch (error) {
        console.error('❌ Ocorreu um erro durante o acesso ao site:', error);
    } finally {
        console.log('🛑 Fechando o navegador...');
        await browser.close();
    }
}

enterSite(); // Certifique-se de que está chamando a função

module.exports = { enterSite };
