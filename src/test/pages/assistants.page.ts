import { expect, Page } from '@playwright/test';
import { AssistantsLocator } from '../locators/assistants.locator';

export class AssistantsPage {

    readonly page: Page;
    readonly assistantsLocator: AssistantsLocator;

    constructor(page: Page) {
        this.page = page;
        this.assistantsLocator = new AssistantsLocator(page);
    }

    async validateQuantityAssistants() {
        await this.assistantsLocator.tarjetAssistants.first().waitFor({ state: 'visible' });         // Esperamos a que aparezca al menos una tarjeta
        const tarjetas = await this.assistantsLocator.tarjetAssistants.all();         // Obtenemos todas las tarjetas
        const cantidad = tarjetas.length;
        console.log("Cantidad de auxiliares mostrados:", cantidad);
        expect(cantidad).toBeGreaterThan(0);         // Validamos que haya al menos una
    }

    async validateAssistantsList(){
        await this.assistantsLocator.tarjetAssistants.first().waitFor({ state: 'visible' });
        const total = await this.assistantsLocator.tarjetAssistants.count();
        console.log("Tarjetas encontradas:", total);
        expect(total).toBeGreaterThan(0);
    }

    // ================================================
    // VALIDAR NOMBRE Y APELLIDOS
    // ================================================
    async validateNames() {
        const total = await this.assistantsLocator.tarjetAssistants.count();

        for (let i = 0; i < total; i++) {
            const nombreSpan = this.assistantsLocator.tarjetAssistants.nth(i).locator(this.assistantsLocator.nameSpan).first();
            const nombre = await nombreSpan.textContent();

            console.log(`Nombre tarjeta ${i + 1}: ${nombre}`);

            expect(nombre?.trim().length).toBeGreaterThan(0);
        }
    }

    // ================================================
    // VALIDAR NÚMERO DE CONTACTO
    // ================================================
    async validatePhoneNumbers() {
        const total = await this.assistantsLocator.tarjetAssistants.count();

        for (let i = 0; i < total; i++) {
            const telefonoSpan = this.assistantsLocator.tarjetAssistants.nth(i).locator(this.assistantsLocator.phoneSpan);
            await expect(telefonoSpan).toBeVisible();

            const telefono = await telefonoSpan.textContent();
            console.log(`Teléfono tarjeta ${i + 1}: ${telefono}`);

            expect(telefono?.trim()).toMatch(/^9\d{8}$/);
        }
    }

    // ================================================
    // VALIDAR ESTADO DEL AUXILIAR
    // ================================================
    async validateStates() {
        const total = await this.assistantsLocator.tarjetAssistants.count();

        for (let i = 0; i < total; i++) {
            const estadoSpan = this.assistantsLocator.tarjetAssistants.nth(i).locator(this.assistantsLocator.stateSpan);
            await expect(estadoSpan).toBeVisible();

            const estado = await estadoSpan.textContent();
            console.log(`Estado tarjeta ${i + 1}: ${estado}`);

            expect(estado?.trim()).toMatch(/Estado:\s*(Activo|Inactivo)/);
        }
    }

    // ================================================
    // VALIDAR CORREOS
    // ================================================
    async validateEmails() {
        const total = await this.assistantsLocator.tarjetAssistants.count();

        for (let i = 0; i < total; i++) {
            const correoSpan = this.assistantsLocator.tarjetAssistants.nth(i).locator(this.assistantsLocator.emailSpan);
            await expect(correoSpan).toBeVisible();

            const correo = await correoSpan.textContent();
            console.log(`Correo tarjeta ${i + 1}: ${correo}`);

            expect(correo?.trim()).toMatch(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        }
    }

    // ================================================
    // VALIDAR FOTO DEL AUXILIAR
    // ================================================
    async validatePhotos() {
        const total = await this.assistantsLocator.tarjetAssistants.count();

        for (let i = 0; i < total; i++) {
            const foto = this.assistantsLocator.tarjetAssistants.nth(i).locator(this.assistantsLocator.photoImg);
            await expect(foto).toBeVisible();

            const src = await foto.getAttribute('src');
            console.log(`Foto tarjeta ${i + 1}: ${src}`);

            expect(src).toBeTruthy();

            const esFotoReal = /^https?:\/\//.test(src || "");
            const esFotoDefecto = src === "/images/svg/No-Foto-Perfil.svg";

            expect(esFotoReal || esFotoDefecto).toBeTruthy();
        }
    }

}