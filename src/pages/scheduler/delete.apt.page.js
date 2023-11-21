import { $ } from '@wdio/globals'
import BasePage from '../BasePage.js';

class DeleteAptPage extends BasePage {
    get btnDelete() {
        return $("*//span[@class='menu_item']/span/a[text()='Delete']");
    }

    get btnAll() {
        return $("//*[@id='1']");
    }

    get btnYes(){
        return $("//*[text()='Yes']");
    }

    async deleteRegularApt () {
        await this.btnDelete.click();
        await this.btnAll.click();
        await this.btnYes.click();
        await this.btnYes.waitForDisplayed({ reverse: true });
    }
}
export const deleteAptPage = new DeleteAptPage();
