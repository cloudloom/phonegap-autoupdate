function printObject(message, object) {
    var output = '';
    for (var property in object) {
      output += property + ': ' + object[property]+'; ';
    }
    console.log(message + output);
}

function getStorageLocation() {
  var storageLocation = "";
  console.log("Current Platform is: " + device.platform);
  switch (device.platform) {
      case "Android":
          return 'file:///storage/emulated/0/';
      case "iOS":
          return cordova.file.documentsDirectory;
      default:
          return null;
  }
  return null;
}

function displayStatus(id, msg, color) {
    var parentElement = document.getElementById('deviceready');     
    var recievedElement = parentElement.querySelector(id);
    recievedElement.style.backgroundColor = color;
    recievedElement.innerHTML = msg;    
}

var apkURL = 'https://www.dropbox.com/s/1qzzjzzpdrjnaa0/android-debug.apk?dl=1';
var apkName = "test.apk";
var versionURL = 'https://www.dropbox.com/s/pyegqji286xl1bl/current-version.txt?dl=1';
var versionFileName = 'current-version.txt';
var currentVersion = 0;