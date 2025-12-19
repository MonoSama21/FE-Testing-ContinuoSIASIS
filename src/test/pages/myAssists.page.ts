import { expect, Page } from '@playwright/test';
import { MyAssistsLocator} from '../locators/myAssists.locator';
import { pageFixture } from '../utiles/pageFixture';
import { faker } from '@faker-js/faker';

export class MyAssistsPage {

    readonly page: Page;
    readonly myAssistsLocator: MyAssistsLocator;

    constructor(page: Page) {
        this.page = page;
        this.myAssistsLocator = new MyAssistsLocator(page);
    }

    async validateMyAssistanceUI() {

        await expect(this.myAssistsLocator.lblMonthConsult, 'La etiqueta "Mes a Consultar" debe estar visible').toBeVisible();
        console.log('✅ La etiqueta "Mes a Consultar" está visible');
        
        await expect(this.myAssistsLocator.lblMonthConsult, 'La etiqueta "Mes a Consultar" debe estar habilitada').toBeEnabled();
        console.log('✅ La etiqueta "Mes a Consultar" está habilitada');
        
        await expect(this.myAssistsLocator.monthSelector, 'El selector de mes debe estar visible').toBeVisible();
        console.log('✅ El selector de mes está visible');
    }

    async selectRandomMonth(): Promise<{ monthValue: string, monthName: string }> {
        const months = [
            { value: '3', name: 'Marzo' },
            { value: '4', name: 'Abril' },
            { value: '5', name: 'Mayo' },
            { value: '6', name: 'Junio' },
            { value: '7', name: 'Julio' },
            { value: '8', name: 'Agosto' },
            { value: '9', name: 'Septiembre' },
            { value: '10', name: 'Octubre' },
            { value: '11', name: 'Noviembre' },
            { value: '12', name: 'Diciembre' }
        ];

        const randomMonth = months[Math.floor(Math.random() * months.length)];
        
        await this.myAssistsLocator.monthSelector.selectOption(randomMonth.value);
        console.log(`✅ Mes seleccionado: ${randomMonth.name} (${randomMonth.value})`);

        await this.myAssistsLocator.btnConsult.click();
        console.log('✅ Click en botón "Consultar"');

        await this.page.waitForLoadState('networkidle');

        return { monthValue: randomMonth.value, monthName: randomMonth.name };
    }

    async validateTableIsDisplayed() {
        await expect(this.myAssistsLocator.assistanceTable, 'La tabla de asistencia debe estar visible').toBeVisible();
        console.log('✅ La tabla de asistencia está visible');

        const rowCount = await this.myAssistsLocator.assistanceTable.locator('tbody tr').count();
        expect(rowCount, `La tabla debe tener al menos 1 fila de registros`).toBeGreaterThan(0);
        console.log(`✅ La tabla contiene ${rowCount} registros`);
    }

    async validateSelectedMonthInHeader(expectedMonthName: string, expectedMonthValue: string) {
        const displayedMonth = await this.myAssistsLocator.lblSelectedMonth.textContent();
        expect(displayedMonth?.trim(), `El mes mostrado debe ser "${expectedMonthName}"`).toBe(expectedMonthName);
        console.log(`✅ El mes "${expectedMonthName}" se muestra correctamente en el encabezado`);

        const firstDateCell = await this.myAssistsLocator.firstRowFirstCell.textContent();
        const monthInDate = expectedMonthValue.padStart(2, '0');
        const expectedMonthPattern = `/${monthInDate}`;
        
        expect(firstDateCell, `La primera fecha debe contener el mes "${expectedMonthPattern}"`).toContain(expectedMonthPattern);
        console.log(`✅ La primera fila contiene el mes correcto: ${firstDateCell}`);
    }

    async validateTableColumnIsDisplayed(columnName: string){
        const columnHeader = this.myAssistsLocator.assistanceTable.locator(`th:has-text("${columnName}")`);
        await expect(columnHeader, `La columna "${columnName}" debe estar visible en la tabla`).toBeVisible();
        console.log(`✅ La columna "${columnName}" está visible en la tabla`);
    }

}
