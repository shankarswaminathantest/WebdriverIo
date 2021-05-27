var request=require('sync-request');
import { Base64 } from 'js-base64';

class MailHog {


  // Get contennt of email by intended recipient
  getPlainEmailTextByEmailTo(emailTo="test@example.com"){
      var res=request('GET', Config.mailhog+":"+Config.mailhogport+"/api/v2/search" +"?kind=to&query="+emailTo,{ });
      var emailmessage = JSON.parse(res.getBody('utf8'));

      var encodedemail = emailmessage.items[0].Content.Body;
      var plaintext="\r\nContent-Type: text/plain; charset = \"UTF-8\"\r\nContent-Transfer-Encoding: base64";
      var htmltext="\r\nContent-Type: text/html; charset = \"UTF-8\"\r\nContent-Transfer-Encoding: base64"
      var str = encodedemail.substring((encodedemail.indexOf(plaintext) + plaintext.length),(encodedemail.indexOf(htmltext)));
      var stringWithLink = Base64.atob(str);
      console.log(Base64.atob(str));
      // return string like
      // from stringWithLink
      var resetlink = stringWithLink.substring(stringWithLink.search("http") , stringWithLink.lastIndexOf("*") );
      return resetlink;
  }

  // Get contennt of email by expected text present inside
  getEmailByContaining(text){
      console.log(Config.mailhog);
      var res=request('GET', Config.mailhog+":"+Config.mailhogport+"/api/v2/search" +"?kind=contianing&query="+"1xjvuo@example.com" , { });

      var emailmessage = JSON.parse(res.getBody('utf8'));
      //check Object returned from request
      console.log(emailmessage);
      //get body content of mail
      console.log(emailmessage.items[0].Content.Body);
  }

  getPlainEmailTextByEmailToOption(emailTo){
    console.log("email to verify is:"+emailTo);
    var res=request('GET', Config.mailhog+":"+Config.mailhogport+"/api/v2/search" +"?kind=to&query="+emailTo,{ });
    var emailmessage = JSON.parse(res.getBody('utf8'));

    var encodedemail = emailmessage.items[0].Content.Body;
    console.log("email content is:"+encodedemail);
    /*var plaintext="\r\nContent-Type: text/plain; charset = \"UTF-8\"\r\nContent-Transfer-Encoding: base64";
    var htmltext="\r\nContent-Type: text/html; charset = \"UTF-8\"\r\nContent-Transfer-Encoding: base64"
    var str = encodedemail.substring((encodedemail.indexOf(plaintext) + plaintext.length),(encodedemail.indexOf(htmltext)));
    console.log(str);
    var email = Base64.atob(str);
    console.log(email);*/
    return encodedemail;
  }

}
export default new MailHog();
