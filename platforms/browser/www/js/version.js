function displayVersion(id, message, versionId) {
    displayStatus(id, message + versionId, "#4B946A");
}

function checkVersionUpdate() {
    console.log("checkVersionUpdate called");

    // Create downloads
    window.resolveLocalFileSystemURL(getStorageLocation(), function(fileSystem) {
        fileSystem.getDirectory('Download', {create: true, exclusive: false}, 
            onVersionDirectoryCreatedSuccess, errorCallback);
    }, errorCallback);
}

function onVersionDirectoryCreatedSuccess(directory) {
    directory.getFile(versionFileName, {create: true, exclusive: false}, onVersionFileCreatedSuccess, errorCallback);
}

function onVersionFileCreatedSuccess(fileEntry) {
    console.log("File path is: " + fileEntry.fullPath);
    var path = fileEntry.fullPath.replace(versionFileName, "");
    fileEntry.remove();
    var fileTransfer = new FileTransfer();
    fileTransfer.download(versionURL, fileEntry.nativeURL, onVersionDownloadSuccess, errorCallback);
}

function onVersionDownloadSuccess(theFile) {
    console.log("File Downloaded Successfully " + theFile.toURL());
    theFile.file(readFile);
}

function readFile(file) {
	var reader = new FileReader();	

    reader.onloadend = function(e) {
        console.log("Current version is: "+this.result);
        initiateUpdateIfNecessary(this.result);
    }

    reader.readAsText(file);    
}

function initiateUpdateIfNecessary(downloadedVersion) {
	if(currentVersion === 0) {
		displayVersion('.received', "Current version: ", downloadedVersion);
		currentVersion = downloadedVersion;
		return;
	}

	if(currentVersion >= downloadedVersion) {
		displayVersion('.received', "You already have the latest version. Version: ", currentVersion);
		return;
	}

	currentVersion = downloadedVersion;
	update();
}
