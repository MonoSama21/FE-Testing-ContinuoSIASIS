import { expect, Page } from '@playwright/test';
import { AdministrativeStaffLocator } from '../locators/administrativeStaff.locator';

export class AdministrativeStaffPage {

    readonly page: Page;
    readonly administrativeStaffLocator: AdministrativeStaffLocator;

    constructor(page: Page) {
        this.page = page;
        this.administrativeStaffLocator = new AdministrativeStaffLocator(page);
    }

    async validateQuantityAdministrativeStaff() {
        await this.administrativeStaffLocator.tarjetsAdministrativeStaff.first().waitFor({ state: 'visible' });         // Esperamos a que aparezca al menos una tarjeta
        const tarjetas = await this.administrativeStaffLocator.tarjetsAdministrativeStaff.all();         // Obtenemos todas las tarjetas
        const cantidad = tarjetas.length;
        console.log("Cantidad de personal administrativos mostrados:", cantidad);
        expect(cantidad).toBeGreaterThan(0);    
    }    

    async validateNames() {
        const total = await this.administrativeStaffLocator.tarjetsAdministrativeStaff.count();
        
        for (let i = 0; i < total; i++) {
            const nombreSpan = this.administrativeStaffLocator.tarjetsAdministrativeStaff.nth(i).locator(this.administrativeStaffLocator.nameSpan).first();
            const nombre = await nombreSpan.textContent();

            console.log(`Nombre tarjeta ${i + 1}: ${nombre}`);

            expect(nombre?.trim().length).toBeGreaterThan(0);
        }
    }

    async validatePhoneNumbers() {
        const total = await this.administrativeStaffLocator.tarjetsAdministrativeStaff.count();
        for (let i = 0; i < total; i++) {
            const telefonoSpan = this.administrativeStaffLocator.tarjetsAdministrativeStaff.nth(i).locator(this.administrativeStaffLocator.phoneSpan);
            await expect(telefonoSpan).toBeVisible();

            const telefono = await telefonoSpan.textContent();
            console.log(`Teléfono tarjeta ${i + 1}: ${telefono}`);

            expect(telefono?.trim()).toMatch(/^9\d{8}$/);
        }
    }

    async validateStates() {
        const total = await this.administrativeStaffLocator.tarjetsAdministrativeStaff.count();

          for (let i = 0; i < total; i++) {
            const estadoSpan = this.administrativeStaffLocator.tarjetsAdministrativeStaff.nth(i).locator(this.administrativeStaffLocator.stateSpan);
            await expect(estadoSpan).toBeVisible();

            const estado = await estadoSpan.textContent();
            console.log(`Estado tarjeta ${i + 1}: ${estado}`);

            expect(estado?.trim()).toMatch(/Estado:\s*(Activo|Inactivo)/);
        }
    }

    async validatePhotos() {
        const total = await this.administrativeStaffLocator.tarjetsAdministrativeStaff.count();
         for (let i = 0; i < total; i++) {
            const foto = this.administrativeStaffLocator.tarjetsAdministrativeStaff.nth(i).locator(this.administrativeStaffLocator.photoImg);
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