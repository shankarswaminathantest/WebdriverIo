import Page from '../Base/page';
import { clickElement } from '../../support/actions/clickElement';
import { setInputField } from '../../support/actions/setInputField';
const { JSDOM } = require('jsdom')
const MailosaurClient = require('mailosaur')

class Registration extends Page {
    get url()  { return "/register";  }
    get emailField() { return $('#register_email');  }
    get userNameField() { return $('#register_username');  }
    get passwordField() { return $('#register_password');  }
    get confirmPasswordField() { return $('#register_confirm');  }
    get registerAgreement() { return $('#register_agreement');  }
    get registerKYC() { return $('#register_kyc');  }
    get registerButton() { return $('button.ant-btn.ant-btn-lg.action-btn');  }
    get () { return $('');  }

    registerUser () {
        this.generateRandomEmail();
        let randomUser = Math.random().toString(36).substring(7);
        setInputField('add',this.randomEmail,this.emailField.selector);
        setInputField('add',randomUser,this.userNameField.selector);
        setInputField('add','Test1234',this.passwordField.selector);
        setInputField('add','Test1234',this.confirmPasswordField.selector);
        clickElement('click','selector',this.registerAgreement.selector);
        clickElement('click','selector',this.registerKYC.selector);
        clickElement('click','selector',this.registerButton.selector);
        browser.pause(10000);

        // const email = await mailosaur.messages.get(
        //     serverId,
        //     searchCriteria,
        //     // Override receivedAfter to search all messages since Jan 1st
        //     { receivedAfter: new Date(2021, 01, 01) }
        //   )
        //   console.log('messages are :' + email);

        //const dom = new JSDOM(message.html.body);
        const dom = new JSDOM();
        const el = dom.window.document.querySelector('.verification-code');
        const verificationCode = el.textContent; // "542163"
        console.log('verification code is :' + verificationCode);
    }
 
    
}
export default new  Registration();