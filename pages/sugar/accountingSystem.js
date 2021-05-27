import Page from '../Base/page';
import { clickElement } from '../../support/actions/clickElement';
import { setInputField } from '../../support/actions/setInputField';
import { checkUrl } from '../../support/assertions/checkURL';
import $ from 'webdriverio/build/commands/browser/$';

class AccountingSystem extends Page {
    get url()  { return "/integration/codat";  }
	get nextButton() { return $('button.ant-btn.ant-btn-lg');  }
    get codatButton() { return $("button[mode='ghost'] div.custom-button-content");  }
    

    isOnAccountingSystemPage() {
        this.waitForUntil(this.codatButton);
        checkUrl(this.url);
    }

    clickOnNextButton(){
        clickElement('click','selector',this.nextButton.selector);
    }
 
    
}
export default new  AccountingSystem();