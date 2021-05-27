import Page from '../Base/page';
import { clickElement } from '../../support/actions/clickElement';
import { setInputField } from '../../support/actions/setInputField';
import { checkUrl } from '../../support/assertions/checkURL';
import $ from 'webdriverio/build/commands/element/$';

class Products extends Page {
    get url()  { return "/products";  }
    get yourFinacingBlock() { return $('main.ant-layout-content.site-layout-background');  }
    get companyName() { return $('div.header-top.fb-jcsb li:nth-child(2) span:nth-child(2)');  }
    get products() { return $$('div.productContainer');  }
    get applyNow() { return $('div:nth-child(2) div.productDescription button');  }
    get continueButton() { return $('');}

    isOnProductsPage(){
        checkUrl(this.url);
        this.waitForUntil(this.yourFinacingBlock);
        this.waitForUntil(this.companyName);
    }

    clickOnApplyNow() {
        clickElement('click','selector',this.applyNow.selector);
    }
 
    
}
export default new  Products();