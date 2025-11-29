import { expect } from '@playwright/test';
import { Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { AssistantsPage } from '../pages/assistants.page';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'playwright.env' });

let assistantsPage: AssistantsPage;

Then('se muestra en pantalla la lista de auxiliares disponibles', async function () {
    assistantsPage = new AssistantsPage(pageFixture.page);
    await assistantsPage.validateQuantityAssistants();
});

Then('se muestra los nombres y apellidos del auxiliar', async function () {
    await assistantsPage.validateNames();
});

Then('se muestra el numero de contacto del axuliar', async function () {
    await assistantsPage.validatePhoneNumbers();
});

Then('se muestra el estado del auxiliar', async function () {
   await assistantsPage.validateStates();
});

Then('se muestra el correo del auxiliar', async function () {
    await assistantsPage.validateEmails();
});

Then('se muestra la foto de cada auxiliar', async function () {
    await assistantsPage.validatePhotos();
});