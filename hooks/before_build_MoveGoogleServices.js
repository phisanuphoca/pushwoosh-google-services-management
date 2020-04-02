#!/usr/bin/env node

//global variables
var appId = "";

// required node modules
var fs = require('fs');
var path = require('path');

// determine appId (read it from config.xml)
var configFile = "config.xml";
var xmlData = fs.readFileSync(configFile).toString('utf8');

var n = xmlData.search(" id=\"");
if(n > 0)
{
  n += 5;
  var count = 0;
  var cont = true;
  while(cont) {
    if(xmlData[n+count] == "\"") {
      cont = false;
    } else {
      count++;
    }
  }
  appId = xmlData.substring(n, n+count);
  console.log("[PUSHWOOSH HELPER] App Identifier detected: " + appId);
}

//function to copy the file
function copyGoogleServicesFile() {
  var srcFile = path.join("www/google-services", appId, "google-services.zip");
  console.log("[PUSHWOOSH HELPER] Source file path: " + srcFile);
  if(fs.existsSync(srcFile)) {
    console.log("[PUSHWOOSH HELPER] File exists.");
    fs.createReadStream(srcFile).pipe(fs.createWriteStream(path.join("www/google-services/google-services.zip")));
    fs.createReadStream(srcFile).pipe(fs.createWriteStream(path.join("platforms/android/platform_www/google-services/google-services.zip")));
    console.log("[PUSHWOOSH HELPER] File was copied.");
  } else {
    console.log("[PUSHWOOSH HELPER] File doesn't exist.");
  }
};

copyGoogleServicesFile();