async function getAtividades(page) {
    await page.waitForSelector('li[data-region="event-list-item"]');
    const eventosElementos = await page.$$('li[data-region="event-list-item"]');
    
    const atividades = eventosElementos.map(async (elemento) => {
    });

    return atividades;
}

module.exports = { getAtividades };
