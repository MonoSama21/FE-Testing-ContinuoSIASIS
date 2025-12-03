import { Page } from '@playwright/test'

export class CommunicationsLocator {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    get btnRegisterCommunication(){
        return this.page.getByRole('button', { name: 'Registrar Comunicado' });
    }

    get inputStartDate(){
        return this.page.locator('input[type="date"]').first();
    }

    get inputConclusionDate(){
        return this.page.locator('input[type="date"]').nth(1);
    }

    get lblRegisterCommunicationTitle(){
        return this.page.locator("//h1[text()='REGISTRAR COMUNICADOS']");
    }
}