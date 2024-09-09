import dotenv from 'dotenv'
import {waitFor} from './auxiliarFunctions.js'
dotenv.config()
const username = process.env.USERNAME_IFSP;
const password = process.env.PASSWORD;

export async function makeLogin(page) {
    await page.click('.btn-lg');

    await page.waitForSelector('#id_username');
    console.log('Username:', username);
    await page.type('#id_username', username);

    await page.waitForSelector('#id_password');

    await page.type('#id_password', password);

    await page.click('.submit-row');

}