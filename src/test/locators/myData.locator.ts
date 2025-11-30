import { Page } from '@playwright/test'

export class MyDataLocator {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    get btnEditDates(){
        return this.page.getByRole('button', { name: 'Editar Datos' });
    }

    get inputNames(){
        return this.page.locator('//input[@name="Nombres"]');
    }
    
    get inputLastNames(){
        return this.page.locator('//input[@name="Apellidos"]');
    }

    get inputPhone(){
        return this.page.locator('//input[@name="Celular"]');
    }

    get inputDNI(){
        return this.page.locator('//input[@name="Identificador_Nacional"]');
    }
    
    get btnSaveChanges(){
        return this.page.getByRole('button', { name: 'Guardar Cambios' });
    }
    
    get modalSaveChanges(){
        return this.page
        .getByRole("alert")
        .locator('p:text("Datos actualizados correctamente")')
        .first();
    }



    

}