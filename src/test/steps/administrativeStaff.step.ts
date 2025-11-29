import { expect } from '@playwright/test';
import { Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { AdministrativeStaffPage } from '../pages/administrativeStaff.page';

let administrativeStaffPage: AdministrativeStaffPage;

Then('se muestra en pantalla la lista de personal administrativo disponibles', async function () {
    administrativeStaffPage = new AdministrativeStaffPage(pageFixture.page);
    await administrativeStaffPage.validateQuantityAdministrativeStaff();
});

Then('se muestra los nombres y apellidos del personal administrativo', async function () {
    await administrativeStaffPage.validateNames();
});

Then('se muestra el numero de contacto del personal administrativo', async function () {
    await administrativeStaffPage.validatePhoneNumbers();
});

Then('se muestra el estado del personal administrativo', async function () {
    await administrativeStaffPage.validateStates();
});

Then('se muestra la foto de cada personal administrativo', async function () {
    await administrativeStaffPage.validatePhotos();
});