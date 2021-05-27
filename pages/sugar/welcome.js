import Page from '../Base/page';
import { clickElement } from '../../support/actions/clickElement';
import { setInputField } from '../../support/actions/setInputField';
import { checkUrl } from '../../support/assertions/checkURL';

class Welcome extends Page {
    get url()  { return "/welcome";  }
	get steps() { return $('div.ant-col.ant-col-24.steps');  }
    get startIntegration() { return $('div.custom-button-content');  }
    get back() { return $('div.bottom-row a');  }

    isOnWelcomePage() {
        this.waitForUntil(this.startIntegration);
        checkUrl(this.url);
    }

    clickOnStartIntegration(){
        clickElement('click','selector',this.startIntegration.selector);
    }
 
    
}
export default new  Welcome();