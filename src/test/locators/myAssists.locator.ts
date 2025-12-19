import { Page } from '@playwright/test'

export class MyAssistsLocator {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    get optionExecutive(){
        return this.page.getByText('Directivo');
    }
    
    get lblMonthConsult(){
        return this.page.locator('//label[text()="Mes a Consultar"]');
    }

    get monthSelector(){
        return this.page.locator('//select[option[text()="Seleccionar mes"]]');
    }

    get btnConsult(){
        return this.page.locator('button:has-text("Consultar")');
    }

    get lblSelectedMonth(){
        return this.page.locator('div.flex.items-center.space-x-1\\.5:has(span:text("Mes:")) span.font-medium.text-gray-900');
    }

    get assistanceTable(){
        return this.page.locator('table');
    }

    get firstRowFirstCell(){
        return this.page.locator('tbody tr:first-child td:first-child span');
    }

}