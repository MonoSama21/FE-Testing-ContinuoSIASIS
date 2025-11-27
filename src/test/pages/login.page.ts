import { expect, Page } from '@playwright/test';
import { LoginLocator } from '../locators/login.locator';

export class LoginPage {

    readonly page: Page;
    readonly loginLocator: LoginLocator;

    constructor(page: Page) {
        this.page = page;
        this.loginLocator = new LoginLocator(page);
    }

    async navigateToUrl(url: string) {
        await this.page.goto(url);
    }

    async clickRoleOption(optionRole: string) {
        switch (optionRole) {
            case 'DIRECTIVO':
                await this.loginLocator.optionExecutive.click();
                console.log("Seleccionado Directivo");
                break;
            case 'PROFESOR_PRIMARIA':
                await this.loginLocator.optionTeacherPrimary.click();
                console.log("Seleccionado Profesor Primaria");
                break
            case 'PROFESOR_SECUNDARIA':
                await this.loginLocator.optionSecondarySchoolTutorTeacher.click();
                console.log("Seleccionado Profesor Secundaria");
                break;
            case 'AUXILIAR':
                await this.loginLocator.optionAssistant.click();
                console.log("Seleccionado Auxiliar");
                break;
            case 'AUXILIAR':
                await this.loginLocator.optionAssistant.click();
                console.log("Seleccionado Auxiliar");
                break;
            case 'RESPONSABLE':
                await this.loginLocator.optionResponsible.click();
                console.log("Seleccionado Responsable");
                break;
            case 'OTRO':
                await this.loginLocator.optionOther.click();
                console.log("Seleccionado Otro");
                break;
            default:
                console.log("Opción no válida");
                break;
            
        }
    }

};