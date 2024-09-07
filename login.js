require('dotenv').config();
const { waitFor } = require('./auxiliarFunctions');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

async function makeLogin(page) {
    await page.click('.btn-lg');
    await waitFor(3);
    await page.type('#id_username', username);
    await page.type('#id_password', password);
}

module.exports = {makeLogin };
