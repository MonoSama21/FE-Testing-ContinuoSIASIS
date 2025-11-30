import { expect, Page } from '@playwright/test';
import { MyDataLocator } from '../locators/myData.locator';
import { pageFixture } from '../utiles/pageFixture';
import { faker } from '@faker-js/faker';

export class MyDataPage {

    readonly page: Page;
    readonly myDatLocator: MyDataLocator;

    // DATOS ORIGINALES PARA EL ROL DIRECTIVO
    readonly ORIGINAL_NAME_DIRECTIVO     = "Elena Serafina";
    readonly ORIGINAL_LASTNAME_DIRECTIVO = "Cullanco Espilco";
    readonly ORIGINAL_PHONE_DIRECTIVO    = "989729659";
    readonly ORIGINAL_GENDER_DIRECTIVO   = "Femenino";
    readonly ORIGINAL_DNI_DIRECTIVO      = "15430124";

    constructor(page: Page) {
        this.page = page;
        this.myDatLocator = new MyDataLocator(page);
    }

    async clickBtnEditDates() {
        await this.myDatLocator.btnEditDates.click();
        console.log("✅ Se hizo click en Editar Datos");
    }
    
    async editDataName() {
        const randomName = faker.person.firstName() + " " + faker.person.middleName();
        await this.myDatLocator.inputNames.fill(randomName);
        console.log("✅ Se editó el nombre correctamente con:", randomName);
    }

    async editDataLastName(){
        const randomLastName = faker.person.lastName() + " " + faker.person.lastName();
        await this.myDatLocator.inputLastNames.fill(randomLastName);
        console.log("✅ Se editó el apellido correctamente con:", randomLastName);
    } 

    async editDataPhone(){
        const randomPhone = faker.helpers.replaceSymbols("9########");
        await this.myDatLocator.inputPhone.fill(randomPhone);
        console.log("✅ Se editó el número de teléfono correctamente con:", randomPhone);
    }

    async editDataDNI(){
        const dni = faker.string.numeric(8);
        await this.myDatLocator.inputDNI.fill(dni);
        console.log("✅ Se editó el número de DNI correctamente con:", dni);
    }

    async clickBtnSaveChanges(){
        await this.myDatLocator.btnSaveChanges.click();
        console.log("✅ Se hizo click en Guardar Cambios");
    }


    async editDataInformationPersonal(){
        await this.editDataName();
        await this.editDataLastName();
        await this.editDataPhone();
        await this.editDataDNI();
    }

    async validateModalSaveChangesIsVisible(){  
        await this.myDatLocator.modalSaveChanges.isVisible();
        const texto = await this.myDatLocator.modalSaveChanges.textContent();
        if (texto === 'Datos actualizados correctamente') {
            console.log('El modal de datos actualizados correctamente se muestra correctamente.');
        } else {
            throw new Error('El texto del modal no es el esperado.');
        }
    }

    async restoreOriginalDataExecutive(){
        try {
            await this.clickBtnEditDates();
            await this.myDatLocator.inputNames.fill(this.ORIGINAL_NAME_DIRECTIVO);
            await this.myDatLocator.inputLastNames.fill(this.ORIGINAL_LASTNAME_DIRECTIVO);
            await this.myDatLocator.inputPhone.fill(this.ORIGINAL_PHONE_DIRECTIVO);
            await this.myDatLocator.inputDNI.fill(this.ORIGINAL_DNI_DIRECTIVO);
            await this.clickBtnSaveChanges();

        } catch (error) {
            throw new Error(`Error al restaurar los datos originales: ${error}`);
        }
        

    }
};