/**
 * This JS file is wrapper on top of Snowbound Viewer. It checks whether
 * snowbound is loaded any document or not. If loaded then these functions will
 * be functional.
 */
function ImageViewer() {
	this.myFlexSnap = {};
}

ImageViewer.prototype.isAllowed = function()
{
	return ! ( typeof(this.myFlexSnap.getPageCount) == "unknown" ) ;
}



ImageViewer.prototype.getDocumentViewerInstance = function() {
	return this.myFlexSnap;
}

ImageViewer.prototype.setDocumentViewerInstance = function(snowboundInstance) {
	if (snowboundInstance) {
		this.myFlexSnap = snowboundInstance;
		system.raiseEvent("onsnowboundready", {
			imageViewer : this
		});
	}
}

ImageViewer.prototype.isPageRedacted = function() {
	if (this.myFlexSnap && this.isAllowed() &&  this.myFlexSnap.isPageRedacted)
		this.myFlexSnap.isPageRedacted();
}

ImageViewer.prototype.nextPage = function() {
	if (this.myFlexSnap && this.isAllowed() && this.myFlexSnap.nextPage)
		this.myFlexSnap.nextPage();
}

ImageViewer.prototype.lastPage = function() {
	if (this.myFlexSnap && this.isAllowed() && this.myFlexSnap.lastPage)
		this.myFlexSnap.lastPage();
}

ImageViewer.prototype.previousPage = function() {
	if (this.myFlexSnap && this.isAllowed() && this.myFlexSnap.previousPage)
		this.myFlexSnap.previousPage();
}

ImageViewer.prototype.firstPage = function() {
	if (this.myFlexSnap && this.isAllowed() && this.myFlexSnap.firstPage)
		this.myFlexSnap.firstPage();
}

// placed code in try catch as getting exceptin
ImageViewer.prototype.getPageCount = function() {
	try
	{
		if (this.myFlexSnap && this.isAllowed() && this.myFlexSnap.getPageCount)
		{
			return this.myFlexSnap.getPageCount();
		}
	}
	catch (e)
 	{
	}
}

ImageViewer.prototype.validatePageNumber = function(pageNumberString) {

	var regex = /^[0-9-,\s]+$/;
	if (!pageNumberString)
		return true;
	if (regex.test(pageNumberString)) {
		// Before Saving Encounter Check for Page Number entered is valid or
		// not.
		var str = "";
		// if , alone present throw error
		if (pageNumberString == ",")
			return false;
		;
		// Split individually as a string using comma/space
		var splitStr = pageNumberString.split(/[ ,]+/);

		for (var i = 0; i < splitStr.length; i++) {
			if (splitStr[i].length != 0) {
				// Identify non-negative numbers
				if (splitStr[i].substr(0, 1) == "-") {
					return false;
				}
			}
		}
		// Split individually as a string using minus/comma/space
		var splitNoStr = pageNumberString.split(/[- ,]+/);
		for (i = 0; i < splitNoStr.length; i++) {
			var stInt = parseInt(splitNoStr[i]);
			if (this.myFlexSnap && this.isAllowed() && this.myFlexSnap.getPageCount && this.myFlexSnap.getPageCount() > 0) {
				if (stInt > this.myFlexSnap.getPageCount()) {
					return false;
				}
			}else{
				return true;
			}
		}
	} else {
		return false;
	}
	return true;

}

/**
 * This method returns page number in pdf
 */
ImageViewer.prototype.getPageNumber = function() {
	try
	{
	if (this.myFlexSnap && this.isAllowed() && this.myFlexSnap.getPageCount && this.myFlexSnap.getPageCount() > 0) {
		return this.myFlexSnap.getPageNumber() + 1;
	}
	}
	catch(e)
	{
	}
}
ImageViewer.prototype.setPage = function(pageNumber) {
	if (pageNumber && parseInt(pageNumber) > 0 && this.myFlexSnap && this.isAllowed()
			&& this.myFlexSnap.setPage) {
		this.myFlexSnap.setPage(parseInt(pageNumber) - 1);

	}
}
ImageViewer.prototype.getPagesModifiedSinceInit = function() {
	if (this.myFlexSnap && this.isAllowed() &&  this.myFlexSnap.getPagesModifiedSinceInit
			&& this.myFlexSnap.getPageCount()
			&& parseInt(this.myFlexSnap.getPageCount()) > 0)
		return this.myFlexSnap.getPagesModifiedSinceInit();
}

ImageViewer.prototype.setDocumentId = function(documentId) {
	this.documentId = documentId;
	if (this.myFlexSnap && this.isAllowed() && this.myFlexSnap.setDocumentId)
		this.myFlexSnap.setDocumentId(this.documentId);
}
ImageViewer.prototype.setClientInstanceId = function(clientInstanceId) {
	this.clientInstanceId = clientInstanceId;
	if (this.myFlexSnap && this.isAllowed() && this.myFlexSnap.setClientInstanceId
			&& this.myFlexSnap.getPageCount()
			&& parseInt(this.myFlexSnap.getPageCount()) > 0)
		this.myFlexSnap.setClientInstanceId(this.clientInstanceId);
}
ImageViewer.prototype.getDocumentId = function() {
	return this.documentId;
}
ImageViewer.prototype.getClientInstanceId = function() {
	return this.clientInstanceId;
}
ImageViewer.prototype.rotateLeft = function() {
	if (this.myFlexSnap && this.isAllowed() && this.myFlexSnap.rotateCounter)
		this.myFlexSnap.rotateCounter();
}
ImageViewer.prototype.rotateRight = function() {
	if (this.myFlexSnap && this.isAllowed() && this.myFlexSnap.rotateClock)
		this.myFlexSnap.rotateClock();
}
ImageViewer.prototype.saveDocument = function() {
	if (this.myFlexSnap && this.isAllowed() && this.myFlexSnap.saveDocument)
		this.myFlexSnap.saveDocument();
}
ImageViewer.prototype.releaseLock = function(barCode) {

	if ( typeof(barCode) == 'undefined' && ! barCode && this.myFlexSnap  && this.isAllowed() && this.myFlexSnap.releaseLock)
		this.myFlexSnap.releaseLock();
	else
		{
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.open("POST", "/gcm-imr-viewer/ReleaseLock?documentId="+barCode, false);
			xmlHttp.send(null);
		}
}
ImageViewer.prototype.onPageUpdate = function() {
	if  (this.myFlexSnap && this.isAllowed() && this.myFlexSnap.getPageCount) {
		system.raiseEvent("onsnowboundpagechange", {
			imageViewer : this
		});
	}
}

