


//create blink object from known device
var Blink1 = require('node-blink1');
var blink1 = new Blink1();

//build timestamp
var moment = require('moment');
var timestamp = moment().toISOString();

//this is the logfile from skype for business
file = "/Users/arnaudcr/Library/Containers/com.microsoft.SkypeForBusiness/Data/Library/Logs/com.microsoft.SkypeForBusiness/sfbmac.log"

//add the module and start tailing
ft = require('file-tail').startTailing(file);

//search for substring each time a new line is caught
ft.on('line', function(line) {
  if(line.indexOf(statusString('Online')) > -1) {
    console.log(timestamp+' -> ONLINE detected in log')
    blink1.fadeToRGB(200, 0, 255, 0, 0, null);
  }
  if(line.indexOf(statusString('Busy')) > -1) {
    console.log(timestamp+' -> BUSY detected in log')
    blink1.fadeToRGB(200, 255, 0, 0, 0, null);
  }
  if(line.indexOf(statusString('DoNotDisturb')) > -1) {
    console.log(timestamp+' -> DND detected in log')
    blink1.fadeToRGB(200, 255, 0, 0, 0, null);
  }
  if(line.indexOf(statusString('Away')) > -1) {
    console.log(timestamp+' -> AWAY detected in log')
    blink1.fadeToRGB(200, 255, 255, 0, 0, null);
  }
  if(line.indexOf(statusString('BeRightBack')) > -1) {
    console.log(timestamp+' -> BRB detected in log')
    blink1.fadeToRGB(200, 255, 255, 0, 0, null);
  }
  if(line.indexOf(statusString('IdleOnline')) > -1) {
    console.log(timestamp+' -> IDLE detected in log')
    blink1.fadeToRGB(200, 255, 255, 0, 0, null);
  }
});



//build the required status string
function statusString(status) {
  return '<property name="availability">'+status+'</property></resource>';
}

