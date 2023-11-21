import { $ } from '@wdio/globals'
import BasePage from '../BasePage.js';

class RegularPage extends BasePage {
    get inputHourStart() {
        return $('#start_hour');
    }

    get inputYearEnd() {
        return $('#end_year');
    }

    get inputSubject() {
        return $('.fleft > input');
    }

    get btnCreate() {
        return $('.menu_item:nth-child(1) > a');
    }

    get btnAdd() {
        return $('#schedule_submit_button > a');
    }

    get inputAttendees() {
        return $('#keyword_user');
    }

    get btnSearch() {
        return $('#searchbox-submit-user');
    }

    get btnAddAttendees() {
        return $('#btn_add_sUID');
    }

    get AlertText() {
        return $(`//*[@id="invalid_date"]`);
    }
    get ErrorCode() {
        return $(`//*[@id="msgbox"]/div[2]/div/table/tbody/tr/td/div[2]/span`);
    }
    get ErrorMessage() {
        return $(`//*[@id="msgbox"]/div[2]/div/table/tbody/tr/td/div[3]`);
    }
    get ClosePopupBtn() {
        return $(`//*[@id="msgbox_btn_ok"]/a`);
    }

    get SpinnerSearch(){
        return $('//*[@id="spinner_selectlist_CID"]/img');
    }

    open() {
        super.open('g/schedule/');
    }

    async createAppointment() {
        await this.btnCreate.click();
    }

    async setRegularAppointment(inputHourStart, inputSubject) {
        await this.inputHourStart.selectByVisibleText(inputHourStart);
        await this.inputSubject.setValue(inputSubject);
    }

    async setWrongRegularAppointment(inputYearEnd) {
        await this.inputYearEnd.selectByVisibleText(inputYearEnd);
    }


    chooseAttendees(user) {
        return $(`//*[@id='ul_selectlist_CID']//li//span[2][text()='${user}']`);
    }

    async searchAttendee(user) {
        await this.inputAttendees.setValue(user);
        await this.btnSearch.click();
        // (await this.SpinnerSearch).waitForDisplayed();
        // await this.chooseAttendees(user).waitForDisplayed();
        // await browser.pause(1000);
        
        await this.chooseAttendees(user).waitForClickable();
        await this.SpinnerSearch.waitForDisplayed({ reverse: true });
        await this.chooseAttendees(user).click();
    }

    async addAttendees() {
        await this.btnAddAttendees.click();
    }

    async saveAppointment() {
        await this.btnAdd.click();
    }

    async createSuccessApt  (start_time, subject, attendee) {

        //create appointment
        await this.createAppointment();
    
        //input appointment information
        await this.setRegularAppointment(start_time,subject);
        
        //add attendees
        await this.searchAttendee(attendee);
        await this.addAttendees();
    
        //save appointment
        await this.saveAppointment();
    }

    async createUnsuccessApt (start_time, subject, attendee) {
        // Tạo một đối tượng Date
        const current = new Date();
    
        // Lấy năm trước năm hiện tại
        const beforeDate = current.getFullYear()-1;
    
        //create appointment
        await this.createAppointment();
    
        //input appointment information
        await this.setRegularAppointment(start_time, subject);
    
         //input wrong appointment information
         await this.setWrongRegularAppointment(beforeDate);
        
        //add attendees
        await this.searchAttendee(attendee);
        await this.addAttendees();
    
        //save appointment
        await this.saveAppointment();
    }
    async verifyUnsuccessApt() {
    
        //verify alert text
        const alertText = await this.AlertText;
    
        await expect(alertText).toHaveTextContaining('The end time must follow the start time.');
        console.log(await alertText.getText());
    
        //verify error code
        const errorCode = await this.ErrorCode;
    
        await expect(errorCode).toHaveTextContaining('GRN_SCHD_13012');
        console.log(await errorCode.getText());
    
        //verify error message
        const errorMessage = await this.ErrorMessage;
    
        await expect(errorMessage).toHaveTextContaining('Date and time are invalid.');
        console.log(await errorMessage.getText());
    
        (await this.ClosePopupBtn).click()
    }

    
}

export const regularPage = new RegularPage();