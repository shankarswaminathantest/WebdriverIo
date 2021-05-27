import Page from '../Base/page';
import { checkUrl } from '../../support/assertions/checkURL';
import { clickElement } from '../../support/actions/clickElement';
import { setInputField } from '../../support/actions/setInputField';
import { isEnabled } from '../../support/assertions/isEnabled';

class CompanyDetails extends Page {
    get url()  { return "/company-details";  }
	get companyNameField() { return $('input.ant-input.ant-input-lg.ant-select-selection-search-input');  }
    get phoneNumberField() { return $('#phone');  }
    get submitButton() { return $('div.fixed-control button.ant-btn');  }
    get firstOption() { return $('div.ant-select-item.ant-select-item-option.ant-select-item-option-selected');  }
    get () { return $('');  }

    isOnCompanyDetailsPage() {
        checkUrl(this.url);
    }

    enterCompanyName (companyName) {
        this.waitForUntil(this.companyNameField);
        setInputField('add',companyName,this.companyNameField.selector);
        this.waitForUntil(this.firstOption);
        clickElement('click','selector',this.firstOption.selector);
    }

    enterPhoneNumber (phoneNumber) {
        setInputField('add',phoneNumber,this.phoneNumberField.selector);
    }

    clickOnSubmit(){
        isEnabled(this.submitButton.selector);
        clickElement('click','selector',this.submitButton.selector);
    }
 
    
}
export default new  CompanyDetails();