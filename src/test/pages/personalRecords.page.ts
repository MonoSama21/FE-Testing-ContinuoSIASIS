import { expect, Page } from '@playwright/test';
import { PersonalRecordsLocator } from '../locators/personalRecords.locator';
import { pageFixture } from '../utiles/pageFixture';

export class PersonalRecordsPage {

    readonly page: Page;
    readonly personalRecordsLocator: PersonalRecordsLocator;

    constructor(page: Page) {
        this.page = page;
        this.personalRecordsLocator = new PersonalRecordsLocator(page);
    }

    async clickTypePersonal(optionPersonal: string) {
        let value: string = "";

        switch (optionPersonal) {
            case "Profesor de Primaria":
                value = "PP";
                break;
            case "Profesor de Secundaria":
                value = "PS";
                break;
            case "Auxiliar":
                value = "A";
                break;
            case "Personal Administrativo":
                value = "PA";
                break;
            default:
                throw new Error(`Opción no reconocida: ${optionPersonal}`);
        }

        // ESTE ES EL MÉTODO CORRECTO PARA <select>
        await this.personalRecordsLocator.selectTypePersonal.selectOption(value);
    }

    async selectRandomPersonal() {
        await this.personalRecordsLocator.dropdownPersonal.click();                 // 1. Abrir dropdown
        await this.personalRecordsLocator.dropdownListItems.first().waitFor();      // 2. Esperar que las opciones aparezcan
        const count = await this.personalRecordsLocator.dropdownListItems.count();  // 3. Contar opciones
        console.log("➤ Número de opciones encontradas:", count);
        if (count === 0) {
            throw new Error("No se encontraron opciones en el dropdown.");
        }
        const randomIndex = Math.floor(Math.random() * count);                         // 4. Generar índice aleatorio
        const option = this.personalRecordsLocator.dropdownListItems.nth(randomIndex); // 5. Capturar locator de la opción
        const selectedName = await option.locator('.font-medium').innerText();         // 6. Obtener el nombre
        console.log("➤ Opción seleccionada:", selectedName);                          // 7. Imprimir en consola
        await option.click();         // 8. Click a la opción
        return selectedName;          // 9. Devolver el nombre para validaciones futuras
    }

    async selectRandomMonthGreaterThanJune() {
        const allowedValues: string[] = ["7", "8", "9", "10", "11"];                            // Valores permitidos
        const randomValue = allowedValues[Math.floor(Math.random() * allowedValues.length)];    // Elegir uno aleatorio
        await this.personalRecordsLocator.selectMonth.selectOption(randomValue);
    }

    async clickSearchButton() {
        await this.personalRecordsLocator.btnSearch.click();
    }

    async validateAttendanceTableDisplayed(){
        await this.personalRecordsLocator.tableRecords.isVisible();
        console.log("✔ Tabla de asistencias mostrada");
    }

}