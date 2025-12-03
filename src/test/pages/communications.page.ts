import { expect, Page } from '@playwright/test';
import { CommunicationsLocator } from '../locators/communications.locator';

export class CommunicationsPage {

    readonly page: Page;
    readonly communicationsLocator: CommunicationsLocator;

    constructor(page: Page) {
        this.page = page;
        this.communicationsLocator = new CommunicationsLocator(page);
    }

    async clickBtnRegisterCommunication() {
        await this.communicationsLocator.btnRegisterCommunication.click();
    }

    async fillStartAndConclusionDates() {
        await this.communicationsLocator.lblRegisterCommunicationTitle.waitFor({ state: 'visible' });
        // Calcular fecha de inicio: 1 día después de hoy
        const fechaInicio = new Date();
        fechaInicio.setDate(fechaInicio.getDate() + 1);
        const fechaInicioFormatted = fechaInicio.toISOString().split('T')[0]; // Formato: YYYY-MM-DD

        // Calcular fecha de conclusión: 2 días después de la fecha de inicio (3 días desde hoy)
        const fechaConclusion = new Date();
        fechaConclusion.setDate(fechaConclusion.getDate() + 3);
        const fechaConclusionFormatted = fechaConclusion.toISOString().split('T')[0];

        // Llenar los campos
        await this.communicationsLocator.inputStartDate.fill(fechaInicioFormatted);
        await this.communicationsLocator.inputConclusionDate.fill(fechaConclusionFormatted);

        console.log(`📅 Fecha de Inicio: ${fechaInicioFormatted}`);
        console.log(`📅 Fecha de Conclusión: ${fechaConclusionFormatted}`);
    }

}