import { openWebsite } from '../../support/actions/openWebsite';
var request=require('sync-request');
var fs = require('fs');
const cucumberJson = require('wdio-cucumberjs-json-reporter').default;

export default class Page {

  constructor(){
    this.randomEmail=null;
    this.acceptCookiePopup='#consent_prompt_submit';
  }

  /**
   * define elements
   */
   get input()   { return $('input'); }
   get button()     { return $('button'); }
  /**
   * opens specific page
   */

  goToPage(path) {
    openWebsite("path", path);
    this.checkForCookiesPopup();
    }
   
  goToUrl(type,url) {
    openWebsite(type, url);
    this.checkForCookiesPopup();
  }

  /**
   *  define or overwrite page methods
   */
   waitForContactPageToLoad (element , time) {
     if(!this.element.isDisplayed()){
       this.element.waitForDisplayed(3000);
     }
   }

 
/* this is a generic method if you like to list all the child element id without using chropath etc -
you have to pass tag type \\output is on console as a table*/
listAllChildElements(elementType){
   const allInputChildItems=$$(elementType);
   const childlist=allInputChildItems.map(eachitem=>{
     if (elementType==='input' || elementType=== 'select'){
      return [eachitem.getAttribute('name'), eachitem.getAttribute('id'),'#'+eachitem.getAttribute('id')];
        }
     if (elementType==='label'){
      return [eachitem.getAttribute('innerText'),eachitem.getAttribute('htmlFor'),'#'+eachitem.getAttribute('htmlFor')];
        }
     if (elementType==='option'){
          return [eachitem.getText(),eachitem.getAttribute('value')];
        }
  })
  console.table(childlist);
}

  exportLabelDescriptionToFile(){
    const labelChildItems=$$('label');
    const outputfile= labelChildItems.map(items=>{return items.getAttribute('innerText');});
    console.table(outputfile);
    return outputfile;
   }

list2dDataSet(datatable){
  const datatablemap=dataset.rows().map(item=>{return [item[0],item[1]];});
  console.table(datatablemap);
}
//Comments: this below method can be used to fill any textboxes,tickcheckboxes or select items from drop downs

/*This below command can be used on browser by pressing f12 and going to console - to list all label descriptions
console.log($$('label').forEach(function test(a){console.log(a.innerText)}))
This output is what needs to go to feature file*/

fillFormViaLabelNames(datatable){ // passed the cucumber data table
  const datatablemap=datatable.rows().map(item=>{return [item[0],item[1]];}); // converted the cucumber datatable with map into a const 2D array
  const allInputChildItems=$$('label'); // passed every single label element from this page into a const
  for (let i = 0; i < datatablemap.length; i++) { // outer loop to go thru each field from cucumber data table (feature file)
    for (let ii = 0; ii < allInputChildItems.length; ii++) { //inner loop to check each item one by one from data table and find a match on corresponding page element
       if (datatablemap[i][0]===allInputChildItems[ii].getAttribute('innerText')){ // if a match is found, depending on attribute type or tag type relevant action is carried out
                  const getIdForTextBox=("#"+allInputChildItems[ii].getAttribute('htmlFor'));
                  switch($(getIdForTextBox).getAttribute('type')){
                    case "text":
                    case "password":
                            $(getIdForTextBox).clearValue();
                            $(getIdForTextBox).setValue(datatablemap[i][1]);
                            while (($(getIdForTextBox).getValue()) === '') {
                              $(getIdForTextBox).setValue(datatablemap[i][1]);
                            }
                            break;
                    case "checkbox":
                            $(getIdForTextBox).click();
                            break;
                    default:
                          if ($(getIdForTextBox).getTagName()==='select'){
                           $(getIdForTextBox).selectByVisibleText(datatablemap[i][1]);
                          }
                  }
          }
    } 
  }
  cucumberJson.attach("Taking Screenshot for record - after all the codeless data entry, please review if all data was entered or not...");
  cucumberJson.attach(browser.takeScreenshot(), 'image/png');
}

writeDataIntoAFile(data){
fs.writeFile('mynewfile1.csv', data, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
}

compareDataTblColumnWithAnyList(datatable,columnNumberFromDataTable,selectorWithChildren){
  //datatable  (Pass Cucumber Data Table)
  //columnNumberFromDataTable (Pass Column Number to compare i.e. 0 for very first column from data table, 1 for second column)
  /*SelectorWithChildItems (Pass the selector which has got child items, so that the output from each child i.e.
  innerText or getText() can be extracted to compare)*/
  const selector = (typeof selectorWithChildren==='string') ? $$(selectorWithChildren) : selectorWithChildren;
  const columnFromDataTable=datatable.rows().map(eachColItem=>{
    return eachColItem[columnNumberFromDataTable];
  });
  const columnFromSelector =selector.map(eachChild=> {
    return eachChild.getText();
  });
  // compare and assert the data
  assert.deepEqual(columnFromDataTable,columnFromSelector);
  //logging on console to see the output in table format
  console.table(columnFromDataTable);
  console.table(columnFromSelector);
  }

  generateRandomEmail() {
    let r = Math.random().toString(36).substring(7);
    console.log("random", r);
    this.randomEmail = r.concat('@example.mailosaur.net');
    console.log('random email is :'+ this.randomEmail);
  }
  getRandomEmail() {
    let r = Math.random().toString(36).substring(7);
    console.log("random", r);
    return r.concat('@example.com');
  }
  getOpenAmTokenId(){
    var res=request('POST', Config.openam_sso_apilink, {
      headers: {       
          'X-OpenAM-Username': Config.xopenam_username ,
          'X-OpenAM-Password': Config.xopenam_password
          },
        
      json :{
            
          }
      });
       return JSON.parse(res.getBody().toString('utf8')).tokenId;
  }
checkForCookiesPopup() {
  if($(this.acceptCookiePopup).isDisplayed()) {
    this.acceptCookiePopup.click();
  }
}

  waitForUntil (element) {
    browser.waitUntil(function(){return element.isDisplayed()},
            {
                timeout: 60000,
                timeoutMsg: "expected to see "+element.selector+" visible on page",
                interval: 3000
            });
  }

  waitForUntilWithTime (element,time) {
    browser.waitUntil(function(){return element.isDisplayed()},
            {
                timeout: time,
                timeoutMsg: "expected to see "+element.selector+" visible on page",
                interval: 3000
            });
  }

  waitUntilListPopulates(selector) {
    browser.waitUntil(function(){return $$(selector).length>0},
            {
                timeout: 40000,
                timeoutMsg: "expected to see "+selector+" with populated items",
                interval: 3000
            });
  }

  matchTextAndClickFromList(textToMatch,selector){
    browser.pause(2000); //waiting for all the data to be correctly populated as there is sometimes delay in getting
      var listItems=$$(selector);
        try{
          for (let i = 0; i <listItems.length; i++) {
               console.log("Finding Match: ",textToMatch," With ",listItems[i].getText());
                 if (listItems[i].getText() === textToMatch){
                   console.log("Found Match: ",textToMatch," With ",listItems[i].getText());
                    listItems[i].click();
                     return;
                    }
               }
            throw "Unable to match any address";
      }catch(err){
          console.log("Retry Mode for Matching the text: ");
           if (err==="Unable to match any address"){
            var listItems=$$(selector);
             for (let i = 0; i <listItems.length; i++) {
              console.log("Finding Match: ",textToMatch," With ",listItems[i].getText());
               if (listItems[i].getText() === textToMatch){
                    console.log("Found Match: ",textToMatch," With ",listItems[i].getText());
                     listItems[i].click();
                      return;
               }
             }
          }
          assert.fail("Was not able to match any results: Caught Exception: "+err); 
        }
      }

    charByCharTypeText(text,element){
      this.waitForUntil(element);
      element.clearValue();
      for(let i=0;i<=text.length;i++){
        element.addValue(text[i]);
      }
      browser.pause(2000);
    }
  
  verifyTextOnPage (text) {
    expect(browser.getPageSource()).toContain(text);
  }

  clickOnLink (link) {
    this.waitForUntil($("a*="+link+""));
    $("a*="+link+"").click();
  }

  isLinkVisiblByText (link) {
    this.waitForUntil($("a*="+link+""));
  }

  verifyCheckBoxORRadioButtonCheckedORNot(element) {
    var status = element.getAttribute("checked");
    if (!status) {
        throw new Error(element +" not selected on page");
    }
  }

  clickOnButton (buttonName) {
    this.waitForUntil($("[value='"+buttonName+"']"));
    $("[value='"+buttonName+"']").click();
  }
  
}