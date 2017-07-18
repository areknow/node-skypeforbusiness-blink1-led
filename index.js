


//create blink object from known device
var Blink1 = require('node-blink1');
var blink1 = new Blink1();

//build timestamp
var moment = require('moment');
timestamp = moment(+ new Date()).format("MM/DD/YYYY h:mm:ss")

//this is the logfile from skype for business mac
file = "/Users/arnaudcr/Library/Containers/com.microsoft.SkypeForBusiness/Data/Library/Logs/com.microsoft.SkypeForBusiness/sfbmac.log"

//add the module and start tailing
ft = require('file-tail').startTailing(file);

//search for substring each time a new line is caught
ft.on('line', function(line) {
  if(line.indexOf(statusString('Online')) > -1) {
    console.log(timestamp+' -> online detected in log')
    blink1.fadeToRGB(200, 0, 255, 0, 0, null);
  }
  if(line.indexOf(statusString('Busy')) > -1) {
    console.log(timestamp+' -> busy detected in log')
    blink1.fadeToRGB(200, 255, 0, 0, 0, null);
  }
  if(line.indexOf(statusString('Away')) > -1) {
    console.log(timestamp+' -> away detected in log')
    blink1.fadeToRGB(200, 255, 255, 0, 0, null);
  }
  if(line.indexOf(statusString('IdleOnline')) > -1) {
    console.log(timestamp+' -> idle detected in log')
    blink1.fadeToRGB(200, 255, 255, 0, 0, null);
  }
});



//build the required status string
function statusString(status) {
  return '<?xml version="1.0" encoding="utf-8"?>'+
    '<resource rel="presence" href="/ucwa/v1/applications/411195242550/me/presence" '+
    'xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">'+
    '<property name="availability">'+status+'</property></resource>';
}