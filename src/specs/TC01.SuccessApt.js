import { regularPage } from "../pages/scheduler/regular.apt.page.js";
import { regularDetailsPage } from "../pages/scheduler/regular.details.page.js";
import { deleteAptPage } from "../pages/scheduler/delete.apt.page.js";
import * as SuccessData from "../data/TC01.ReAptSuccess.js"


describe('TC01 - Create regular appointment successfully', () => {
    it('create regular appointment successfully', async () => {
        await regularPage.open();
        let successApt = SuccessData.VALID_DAY_APT;
        await regularPage.createSuccessApt(successApt.timeStart, successApt.subject, SuccessData.ATTENDEE);
        await regularDetailsPage.verifySuccessApt(successApt.subject, successApt.timeStart, SuccessData.ATTENDEE, SuccessData.REGISTER);
    });
    after(async () => {
        await deleteAptPage.deleteRegularApt();
    });
});
