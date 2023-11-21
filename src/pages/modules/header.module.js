import { $ } from '@wdio/globals'


class HeaderModule {
    get btnProfile() {
        return $('//*[@id="cloudHeader-userName-grn"]');
    }
    get btnLogOut() {
        return $('//*[@id="com-header-logout-link"]');
    }

    async LogOut() {
        await this.btnProfile.click();
        await this.btnLogOut.click();
    }
}

export const headerModule = new HeaderModule();
