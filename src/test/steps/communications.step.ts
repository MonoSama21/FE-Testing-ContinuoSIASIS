import { expect } from '@playwright/test';
import { Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { CommunicationsPage } from '../pages/communications.page';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'playwright.env' });

let communicationsPage: CommunicationsPage;

Then('se muestra en pantalla la lista de auxiliares disponibles', async function () {
    communicationsPage = new CommunicationsPage(pageFixture.page);
    
});


When('hago click en el boton {string}', async function (string) {
    communicationsPage = new CommunicationsPage(pageFixture.page);
    await communicationsPage.clickBtnRegisterCommunication();
});


When('completo los campos de fecha de inicio y fecha de conclusión con una fecha mayor a la actual', async function () {
    communicationsPage = new CommunicationsPage(pageFixture.page);
    await communicationsPage.fillStartAndConclusionDates();
    await pageFixture.page.pause();
});

When('completo los campos de titulo y Contenido', async function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});


When('adjunto una imagen al comunicado', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});


When('visualizo la vista previa del comunicado', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});


Then('la vista previa muestra correctamente el titulo, contenido y fecha', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});

When('confirmo el registro del comunicado', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});


Then('el sistema muestra un mensaje de exito {string}', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});


Then('el comunicado aparece en la lista con estado {string}', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});