export async function getAtividades(page) {
    await page.waitForSelector('div[data-region="event-list-group-container"]');
    const gruposAtividades = await page.$$('div[data-region="event-list-group-container"]');
    const atividades = [];
    return atividades;}

export async function getSevenDaysActivities(page){
    getAtividades(page)
    for (const grupo of gruposAtividades) {
        const dataEndDay = await grupo.evaluate(el => el.getAttribute('data-end-day'));

        // Se o data-end-day for "7", então processa as atividades dentro desse grupo
        if (dataEndDay === "7") {
            // Seleciona as atividades dentro dessa div específica
            const eventosElementos = await grupo.$$('li[data-region="event-list-item"]');
            
            // Itera sobre os itens de eventos e extrai as informações
            for (const elemento of eventosElementos) {
                const nomeAtividade = await elemento.$eval('a.event-name', el => el.textContent.trim());
                const dataAtividade = await elemento.$eval('div.span5', el => el.textContent.trim());
                const linkAtividade = await elemento.$eval('a.event-name', el => el.href);
                
                atividades.push({
                    nome: nomeAtividade,
                    data: dataAtividade,
                    link: linkAtividade
                });
            }
        }
    }
}