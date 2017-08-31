function displaySuccess(id) {
    displayStatus(id, "Device is Ready", "#4B946A");
}

function displayFailed(id) {
    displayStatus(id, "Update Failed!", "#CC0000");
}

function displayProgress(id) {
    displayStatus(id, "Updating ...", "#FF8800");
}

function update() {
    console.log("Update called");
    displayProgress('.received');

    // Create downloads
    window.resolveLocalFileSystemURL(getStorageLocation(), function(fileSystem) {
        fileSystem.getDirectory('Download', {create: true, exclusive: false}, 
            onDirectoryCreatedSuccess, errorCallback);
    }, errorCallback);
}

function onDirectoryCreatedSuccess(directory) {
    directory.getFile(apkName, {create: true, exclusive: false}, onFileCreatedSuccess, errorCallback);
}

function onFileCreatedSuccess(fileEntry) {
    console.log("File path is: " + fileEntry.fullPath);
    var path = fileEntry.fullPath.replace(apkName, "");
    fileEntry.remove();
    var fileTransfer = new FileTransfer();
    fileTransfer.download(apkURL, fileEntry.nativeURL, onDownloadSuccess, errorCallback);
}

function onDownloadSuccess(theFile) {
    console.log("File Downloaded Successfully " + theFile.toURL());
    startActivity(theFile.nativeURL);
}

function startActivity(url) {
    displaySuccess('.received');
    
    window.plugins.webintent.startActivity({
        action: window.plugins.webintent.ACTION_VIEW,
        url: url,
        type: 'application/vnd.android.package-archive'
    }, function(){
        // On success kill the app
        navigator.app.exitApp();
    }, function(e) { 
        console.log("Failed to open URL via Android Intent. URL: " + e); 
        displayStatus('.received', "Failed. Run this app as APK on android device or emulator", "#CC0000");
    });        
}

function errorCallback(e) {
    displayFailed('.received');
    console.log("Error: " + e);
}