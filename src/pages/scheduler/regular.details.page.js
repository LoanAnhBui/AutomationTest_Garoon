import { $ } from '@wdio/globals'
import BasePage from '../BasePage.js';

class RegularDetailsPage extends BasePage{
    get AppointmentName(){
        return $(`*//div[@id='event_list']/h2`);
    }
    get DateTime(){
        return $(".schedule_text_noticeable_grn");
    }
    get Registrant() {
        return $(".mRight15 > a");
    }
    
    Attendees(user){
        return $(`(*//span[@class='user-grn']/a[contains(text(),'${user}')])`);
    }

    get spinnerCreateApt(){
        return $('//*[@id="schedule_submit_button"]/span');
    }

    async verifySuccessApt(subject, start_time, attendee, register) {
        //verify spinner biến mất
        await this.spinnerCreateApt.waitForDisplayed({ reverse: true });

        // Tạo một đối tượng Date
        const current = new Date();
    
        // Danh sách các tên ngày và tháng (viết tắt)
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthNames = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        // Lấy ngày hiện tại (viết tắt)
        const currentDayName = dayNames[current.getDay()];
    
        // Lấy tháng hiện tại (viết tắt)
        const currentMonthName = monthNames[current.getMonth()];
    
        // Tạo chuỗi "Mon, Sep" bằng cách kết hợp ngày và tháng
        const formattedDate = `${currentDayName}, ${currentMonthName}`;
        const currentDate = current.getDate();
        const formattedDateNum = currentDate < 10 ? `0${currentDate}` : `${currentDate}`;
        const currentYear = current.getFullYear();
        const end_time=parseInt(start_time)+1;
        const formattedStartTime = parseInt(start_time) < 10 ? `0${start_time}` : `${start_time}`;
        const formattedEndTime = end_time < 10 ? `0${end_time}` : `${end_time}`;

    
        //verify name appointment
        const name = await this.AppointmentName;
        // await expect(name).toBeExisting();
        await expect(name).toHaveTextContaining(subject);
        console.log(await name.getText());
    
        //verify date and time
        const dateTime = await this.DateTime;
        await expect(dateTime).toHaveTextContaining(`${formattedDate} ${formattedDateNum}, ${currentYear}${formattedStartTime}:00  -  ${formattedEndTime}:00`);
        console.log(await dateTime.getText());
    
        //verify attendees
        const attendeesArray = [register, attendee];
        attendeesArray.forEach(async attendee => {
            const num = await this.Attendees(attendee);    
            await expect(num).toHaveTextContaining(attendee);
            console.log(await num.getText());
        });
    
        //verify registrant
        const registrant = await this.Registrant;
        await expect(registrant).toHaveTextContaining(register);
        console.log(await registrant.getText());
    }

    
}

export const regularDetailsPage = new RegularDetailsPage();