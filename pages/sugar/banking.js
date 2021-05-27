import Page from '../Base/page';
import { clickElement } from '../../support/actions/clickElement';
import { setInputField } from '../../support/actions/setInputField';
import { checkUrl } from '../../support/assertions/checkURL';
import $ from 'webdriverio/build/commands/browser/$';

class Banking extends Page {
    get url()  { return "/integration/plaid";  }
	get nextButton() { return $('button.ant-btn.ant-btn-lg');  }
    get plaidButton() { return $("button[mode='ghost'] div.custom-button-content");  }
    get addApplicationDetails() { return $("span.plus");}
    

    isOnBankingPage() {
        this.waitForUntil(this.plaidButton);
        checkUrl(this.url);
    }

    clickOnNextButton(){
        clickElement('click','selector',this.nextButton.selector);
    }
 
    
}
export default new  Banking();