import { expect, Page } from '@playwright/test';
import { DashboardLocator } from '../locators/dashboard.locator';

export class DashboardPage {

    readonly page: Page;
    readonly dashboardLocator: DashboardLocator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardLocator = new DashboardLocator(page);
    }

    async clickOptionAssistants() {
        await this.dashboardLocator.optionAssistants.click();
    }

    async clickOptionDashboard(option: string) {
        await this.dashboardLocator.optionsDashboard.isVisible();
        switch (option) {
            case "Auxiliares":
                await this.dashboardLocator.optionAssistants.click();
                console.log("✅ Se hizo click en Auxiliares");
                break;
            default:
                break;
        }
    }

    async validateStatusAPIAssistants() {
        const response = await this.page.request.get("https://siasis-dev-ins2.vercel.app/auxiliares?_rsc=8e1aq");
        expect(response.status()).toBe(200);
        console.log("✅ La respuesta de la API es 200 OK");
    }

}