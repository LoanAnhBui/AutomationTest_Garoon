import { regularPage } from "../pages/scheduler/regular.apt.page.js";
import * as UnsuccessData from "../data/TC01.ReAptSuccess.js"

describe('TC02 - Create regular appointment unsuccessfully', () => {
    it('set end year is smaller than start year', async () => {
        await regularPage.open();
        let UnsuccessApt = UnsuccessData.VALID_DAY_APT;
        await regularPage.createUnsuccessApt(UnsuccessApt.timeStart,UnsuccessApt.subject,UnsuccessData.ATTENDEE);
        await regularPage.verifyUnsuccessApt();
    });
});