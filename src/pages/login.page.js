import { $ } from '@wdio/globals'
import BasePage from './BasePage.js';


class LoginPage extends BasePage {
    open () {
        return super.open('login');
    }
    
    get inputUsername () {
        return $('input[name="username"]');
    }

    get inputPassword () {
        return $('input[name="password"]');
    }

    get btnSubmit () {
        return $('.login-button');
    }

    async login (username, password) {
        await this.inputUsername.waitForDisplayed();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
        await this.btnSubmit.waitForDisplayed({ reverse: true });
    }
}

export default new LoginPage();
