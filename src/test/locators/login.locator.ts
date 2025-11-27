import { Page } from '@playwright/test'

export class LoginLocator {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    get optionExecutive(){
        return this.page.getByText('Directivo');
    }
    
    get optionTeacherPrimary(){
        return this.page.getByText('Profesor (Primaria)');
    }

    get optionAssistant(){
        return this.page.getByText('Auxiliar');
    }

    get optionSecondarySchoolTutorTeacher(){
        return this.page.getByText('Profesor/Tutor (Secundaria)');
    }

    get optionResponsible(){
        return this.page.getByText('Responsable (Padre/Apoderado)');
    }

    get optionOther(){
        return this.page.getByText('Otro');
    }

}