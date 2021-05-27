import Page from '../Base/page';
import { clickElement } from '../../support/actions/clickElement';
import { setInputField } from '../../support/actions/setInputField';
import { checkUrl } from '../../support/assertions/checkURL';

class Analytics extends Page {
    get url()  { return "/analytics";  }
	get appsflyer() { return $('div.app-box');  }
    get contactSupport() { return $('a.sugar-link');  }
    

    isOnAnalyticsPage() {
        this.waitForUntil(this.appsflyer);
        checkUrl(this.url);
    }

    clickOnAnalytics(){
        clickElement('click','selector',this.Analytics.selector);
    }
 
    
}
export default new  Analytics();