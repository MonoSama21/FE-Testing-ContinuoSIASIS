import { expect } from '@playwright/test';
import { Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { MyAssistsPage } from '../pages/myAssists.page';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'playwright.env' });

let myAssistsPage: MyAssistsPage;
let selectedMonth: { monthValue: string, monthName: string };

Then('verifico la UI de la visualización de asistencia propia', async function () {
    myAssistsPage = new MyAssistsPage(pageFixture.page);
    await myAssistsPage.validateMyAssistanceUI();
});

When('selecciono un mes aleatorio del año actual', async function () {
    myAssistsPage = new MyAssistsPage(pageFixture.page);
    selectedMonth = await myAssistsPage.selectRandomMonth();
});

Then('se actualiza la tabla con los registros del mes seleccionado', async function () {
    myAssistsPage = new MyAssistsPage(pageFixture.page);
    await myAssistsPage.validateTableIsDisplayed();
});

Then('se muestra el nombre del mes seleccionado en el encabezado', async function () {
    myAssistsPage = new MyAssistsPage(pageFixture.page);
    await myAssistsPage.validateSelectedMonthInHeader(selectedMonth.monthName, selectedMonth.monthValue);
});

Then('la tabla muestra la columna {string}', async function (string) {
    await myAssistsPage.validateTableColumnIsDisplayed(string);
});

