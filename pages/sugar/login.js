import Page from '../Base/page';
import { clickElement } from '../../support/actions/clickElement';
import { setInputField } from '../../support/actions/setInputField';
import { checkUrl } from '../../support/assertions/checkURL';

class Login extends Page {
    get url()  { return "/login";  }
	get email() { return $('#register_email');  }
    get pass() { return $('#register_password');  }
    get login() { return $('button.ant-btn.ant-btn-lg.action-btn');  }

    enterLoginDetails () {
        setInputField('add',Config.userName,this.email.selector);
        setInputField('add',Config.password,this.pass.selector);
        clickElement('click','selector',this.login.selector);
    }

    isOnLoginPage() {
        this.waitForUntil(this.login);
        checkUrl(this.url);
    }
 
    
}
export default new  Login();