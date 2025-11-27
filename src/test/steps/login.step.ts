import { expect } from '@playwright/test';
import { Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { LoginPage } from '../pages/login.page';
import test = require('node:test');

let testeando: LoginPage;

Given('I navigate to ecommerce website', async ({ pages }) => {
    await pages.login.navigateToUrl("");
});

Given('I click on My account', async ({ pages }) => {
    await pages.login.clickOnMyAccount();
});


Given('estoy en la pagina de login', async function () {
    await pageFixture.page.goto("https://siasis-dev.vercel.app/login")
});

When('selecciono el rol {string}', async function (role) {
    testeando = new LoginPage(pageFixture.page);
    await testeando.clickRoleOption(role);
});


When('ingreso mi nombre de usuario y contraseña validos', async function () {
    console.log("Ingreso usuario y contraseña");
});

Then('accedo al sistema como {string}', async function (string) {
    console.log("Accedio al sistema");
});
