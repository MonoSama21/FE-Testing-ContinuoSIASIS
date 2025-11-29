import { Page } from '@playwright/test'

export class AssistantsLocator {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    
    get optionsDashboard(){
        return this.page.locator('#sidebar');
    }

    get optionClassrooms(){
        return this.page.getByText('//li[@title="Aulas"]');
    }

    get optionAssistants(){
        return this.page.getByRole('button', { name: 'Auxiliares' });
    }

    get tarjetAssistants(){
        return this.page.locator('div[class*="w-[285px]"][class*="h-[355px]"]');
    }
    
    // Nombre y apellido (span font-semibold)
    get nameSpan() {
        return this.page.locator('span.font-semibold');
    }

    // Teléfono dentro del bloque de contacto
    get phoneSpan() {
        return this.page.locator('div.flex.items-center span[title]');
    }

    // Estado del auxiliar
    get stateSpan() {
        return this.page.locator('span.text-verde-principal');
    }

    // Correo: span con @
    get emailSpan() {
        return this.page.locator('span[title*="@"]');
    }

    // Foto del auxiliar
    get photoImg() {
        return this.page.locator('img.Foto-Perfil-Usuario');
    }
}