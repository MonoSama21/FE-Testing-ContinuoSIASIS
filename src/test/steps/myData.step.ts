import { expect } from '@playwright/test';
import { Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { MyDataPage } from '../pages/myData.page';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'playwright.env' });

let myDataPage: MyDataPage;



When('doy click en el boton de Editar Datos', async function () {
    myDataPage = new MyDataPage(pageFixture.page);
    await myDataPage.clickBtnEditDates();
});

When('edito mi informacion personal', async function () {
    await myDataPage.editDataInformationPersonal();
});

When('guardo los cambios realizados', async function () {
    await myDataPage.clickBtnSaveChanges();
});

Then('verifico que se han guardado los cambios', async function () {
    await myDataPage.validateModalSaveChangesIsVisible();
});

Then('restauro los datos originales', async function () {
    await myDataPage.restoreOriginalDataExecutive();
});

Then('verifico que los datos originales son correctos', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});