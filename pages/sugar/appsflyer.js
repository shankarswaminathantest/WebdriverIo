import Page from '../Base/page';
import { clickElement } from '../../support/actions/clickElement';
import { setInputField } from '../../support/actions/setInputField';
import { checkUrl } from '../../support/assertions/checkURL';
import $ from 'webdriverio/build/commands/browser/$';

class Appsflyer extends Page {
    get url()  { return "/integration/appsflyer";  }
	get nextButton() { return $('button.ant-btn.ant-btn-lg');  }
    get appsflyerEmail() { return $("[value='analytics+ko-accountax-llp@add-sugar.io']");  }
    get addApplicationDetails() { return $("span.plus");}
    

    isOnAppsflyerPage() {
        this.waitForUntil(this.nextButton);
        checkUrl(this.url);
    }

    clickOnNextButton(){
        clickElement('click','selector',this.nextButton.selector);
    }
 
    
}
export default new  Appsflyer();