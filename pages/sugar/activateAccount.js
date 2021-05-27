import Page from '../Base/page';
import { clickElement } from '../../support/actions/clickElement';
import { setInputField } from '../../support/actions/setInputField';
import { checkUrl } from '../../support/assertions/checkURL';
import registration from './registration';

class ActivateAccount extends Page {
    get url()  { return "/activate-account";  }
	get registerPIN() { return $('#register_pin');  }
    get activateAccountButton() { return $('button.ant-btn.ant-btn-lg.action-btn');  }
    

    enterActivateDetails () {
        //setInputField();
    }

    isOnActivateAccountPage() {
        this.waitForUntil(this.registerPIN);
        checkUrl(this.url);
    }
 
    
}
export default new  ActivateAccount();