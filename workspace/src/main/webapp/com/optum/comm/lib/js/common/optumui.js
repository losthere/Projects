
var system = new Object();
var userData = new Object();
var userRoles = {};
var errorMessage = '';
var baseURL = "";

if ( typeof( optumUI ) == "undefined" ) optumUI = new OptumUI();

function _addStyleSheet(url)
{
	var defaultStyle = document.getElementsByTagName("head")[0].appendChild(document.createElement("link")); //NOMBV
	defaultStyle.setAttribute("rel", "stylesheet");
	defaultStyle.setAttribute("type","text/css");
	defaultStyle.setAttribute("media","screen,print");
	defaultStyle.setAttribute("href", url); //NOMBV
}
//Script tag has to be used in encoded mode.. If we have any issues with this approach then every form has to include Jquery instead of using document.write
function _addJquery(url)
{
	document.write("\x3Cscript src='"+url+"' type='text/javascript'>\x3C/script>");
}

function _addScript(_scriptURLs)
{
	for(var s=0, length = _scriptURLs.length; s < length; s++)
	{
		document.write("\x3Cscript src='"+_scriptURLs[s]+"' type='text/javascript'>\x3C/script>");
	}
}

var CordysRoot = {};
//this is required for non-Cordys applications like html5
if ( window.parent != window)
{
	CordysRoot = window.parent;
}else{
	CordysRoot = window;
}

window.onload = function()
{
	addBaseFormEvents();
	//only for xforms
	if ( window._webform_EventHandlers )
	{
		if ( typeof(window._webform_EventHandlers['xforms_init']) == "undefined" )
		{
			  window._webform_EventHandlers['xforms_init'] = [];
		}
		window._webform_EventHandlers['xforms_init'][window._webform_EventHandlers['xforms_init'].length] = _form_initHandler;
	}

	if ( typeof(application) != "undefined" )
	{
	   /*
	   Only for XForms
	  */
	  _resetNotificiations(application);
	}

	if ( typeof(CordysRoot) != "undefined" && CordysRoot.__notInitialized && typeof(CordysRoot.application) != "undefined" )
	{
		_resetNotificiations(CordysRoot.application);
	}
}

function _resetNotificiations(applicationObject)
{
	applicationObject.___showError = application.showError;
	applicationObject.___inform = application.inform;
	applicationObject.___notify = application.notify;
	applicationObject.showError = _custom_showErrorHandler;
	applicationObject.inform = _custom_showInformHandler;
	applicationObject.notify 	=  _custom_showNotifyHandler;
}

function addBaseFormEvents()
{
	  //add onmousedown , onkeydown events

	  document.onmousedown = function(){ 
		  if ( typeof(CordysRoot) != "undefined") CordysRoot.resetTimer({}, true);
	  }
	  document.onkeydown = function(eventObject)
	  {
		  if ( typeof(eventObject) == 'undefined' ) eventObject = window.event;
		  //only for enter
		  if ( eventObject && eventObject.keyCode == 13 )
		  {
			  eventObject.continueBubbling = true;
			  eventObject.cancelBubble = true; //NOMBV
			  //for non-IE, didn't use cordys code here
			  if ( eventObject.stopPropagation ) eventObject.stopPropagation();
		  }
		  //prevent backspace
		 var elid = $(document.activeElement).is('input[type="text"]:focus, textarea:focus');
   		 if(eventObject.keyCode === 8 && !elid){
    			  return false;
   		 };
		if ( typeof(CordysRoot) != "undefined" && typeof(CordysRoot.system) != 'undefined' )
		{
			if(eventObject.altKey)
			{
				CordysRoot.resetTimer(eventObject, true);
			}
			CordysRoot.resetTimer({}, true);
		}
	}

}

function _form_initHandler()
{
  var formModels = WebForm.getAllModels( application.container.applicationId );
  //for all models add "onhttperror" event
  for(var model in formModels)
  {
	formModels[model].addListener("xforms-onrequest", _on_modelrequestHandler(formModels[model]));
  	formModels[model].addListener("xforms-onsoapfault", _on_modelsoapfault(formModels[model]));
  }
}

function _on_modelrequestHandler(xformsModel)
{

}

function _custom_showErrorHandler(message)
{
	//overriding application.showError at CordysRoot level
	if ( message && (message.indexOf("Empty response received with") >= 0 ) )
	{
		message = "Connection failed. Please check Connection.";
		var isHttpError = true;
	}
    optumUI.showError(message, false);
    CordysRoot.system.raiseEvent("onoptumservererror", message);
}

function   _custom_showInformHandler(message)
{
   optumUI.showMessage(message, true);
}

function _custom_showNotifyHandler(message)
{
   optumUI.showMessage(message, true);
}

function _on_modelsoapfault(xformsModel)
{
	return function(eventObject)
	{
		xformsModel.__isErrorShown = true;
		if ( xformsModel.dontShowError == true ) return;
		eventObject.showError = false;
		optumUI.showError( eventObject.faultString, false);
	}
}

function OptumUI()
{
}

OptumUI.prototype.getAuthUser = function(refresh)
{
	return userData.userId;
}

OptumUI.prototype.getDisplayName = function()
{
	var displayName = userData.firstName + " " + userData.lastName;
	return displayName;
}

OptumUI.prototype.getUserCN = function()
{
	return userData.userName;
}

function getRolevendors(userKey, groupKey){
	var obj = { loggedInUserKey: userKey, groupKey: groupKey};
	var roleVenObj = {};
	 $.ajax({
         type: "POST",
         url: "/gcm-app-services/useradmin/getUserVendorByGroupKey",
         async : false,
         timeout: 30000,
         data: jQuery.param(obj) ,
         contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
         crossDomain: true,
         success: function (data, status, jqXHR) {
        	 roleVenObj = data.result;
         },

         error: function (jqXHR, status) {
             console.log(jqXHR);
         }
      });
	 return roleVenObj;
}

function getRegions(userKey, groupKey){
	var obj = { loggedInUserKey: userKey, groupKey: groupKey};
	var regionsList = {};
	 $.ajax({
         type: "POST",
         url: "/gcm-app-services/useradmin/getUserRegionsByGroupKey",
         async : false,
         timeout: 30000,
         data: jQuery.param(obj) ,
         contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
         crossDomain: true,
         success: function (data, status, jqXHR) {
        	 regionsList = data.result;
         },

         error: function (jqXHR, status) {
             console.log(jqXHR);
         }
      });
	 return regionsList;
}


function createUser(){// pass your data in method
	var userData = null;
	var errorMessage = null;
	var isError = false;
    $.ajax({
            type: "POST",
            url: "/gcm-app-services/useradmin/createUser",
            async : false,
            timeout: 30000,
            data: JSON.stringify(""),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {
            	if(data.status == "ERROR"){
            		errorMessage = data.errorMessage;
            		window.localStorage.setItem("error",errorMessage);
            	}else{
            		userData = data.result;
            	}
            	if(userData)
            	sessionStorage.setItem("userData",JSON.stringify(userData));
            	var data = userData.gcmUserVendorRole;
        		var resultLength = userData.gcmUserVendorRole.length;
        		for(var i = 0; i < resultLength; i++)
        		{
        				var role = {
        					roleName : data[i].gcmRoleName,
        					roleCode : data[i].gcmRoleCode
        				} ;
        				userRoles[role.roleCode]=role;
        		}
        		
        		if ( ! userData.gcmUserGroup ) return;
        		var groupKey = '';
        		for(var groupCode in userData.gcmUserGroup ){
        			if (userData.gcmUserGroup[groupCode].groupName != "" && userData.gcmUserGroup[groupCode].isDefaultGroupSW == "Y"){
        				groupKey = userData.gcmUserGroup[groupCode].groupKey;
        				break;
        			}
        		}
        		userData.groupKey = groupKey;
        		userData.roleVendorList = getRolevendors(userData.userKey,groupKey);
            },

            error: function (jqXHR, status) {
            	isError = true;
            	if(jqXHR.status == 403){
            		userData = 'Error403';
            	} else {
            		userData = 'Error';
            	}
            }
         });
    if(isError){
    	return userData;
    }
    if(errorMessage == '' || errorMessage == null){
    	 return userData;
    }else{
    	OptumUI.prototype.replaceWithErrorAtLogin();
    }
   }


OptumUI.prototype.preLogin = function(userName, email, refresh, rootData)
{
	if ( typeof(refresh) == "undefined" ) refresh = true;
	var xhr = null;
	var data = null;	
	userData = createUser();
	if(userData == null || userData == ''){
		OptumUI.prototype.replaceWithErrorAtLogin();
	} else if(userData == 'Error'){
		OptumUI.prototype.replaceWithErrorPage("/crp/error500.htm");
	} else if(userData == 'Error403'){
		OptumUI.prototype.replaceWithErrorPage("/crp/error403.htm"); // change this page.
	} else{
		rootData.userData = userData;
	}
}

OptumUI.prototype.replaceWithError = function()
{
	//error occured re-direct complete page
	var url = document.location.origin+("/crp/errorstatus.htm");
	if ( typeof(CordysRoot) != "undefined" )
	{
		 CordysRoot.parent.location.replace(url);
	}
	else
	{
		window.parent.location.replace(url);
	}
}

//if user is not configured properly and createUser throws an exception.
OptumUI.prototype.replaceWithErrorAtLogin = function()
{
	//error occured re-direct complete page
	var url = document.location.origin+("/crp/userConfigError.htm");
	if ( typeof(CordysRoot) != "undefined" )
	{
		 CordysRoot.parent.location.replace(url);
	}
	else
	{
		window.parent.location.replace(url);
	}
}

//500 error
OptumUI.prototype.replaceWithErrorPage = function(pageName)
{
	//CreateUser service throws a 500 error then re-direct this page
	var url = document.location.origin+(pageName);

	if ( typeof(CordysRoot) != "undefined" )
	{
		CordysRoot.parent.location.replace(url);
	}
	else
	{
		window.parent.location.replace(url);
	}
}

OptumUI.prototype.replaceWithDisableUserError = function()
{
	//error occured re-direct complete page
	var url = document.location.origin+("/crp/errorForDisabledUser.htm");
	if ( typeof(CordysRoot) != "undefined" )
	{
		CordysRoot.parent.location.replace(url);
	}
	else
	{
		window.parent.location.replace(url);
	}
}

OptumUI.prototype.getQualifiedURL = function(url)
{
	var div = document.createElement('div');
	div.innerHTML = "<a></a>";
	div.firstChild.href = url; // Ensures that the href is properly escaped (this will not convert the url to absolute)
	div.innerHTML = div.innerHTML; // Run the current innerHTML back through the parser (that will actually converts a relative url to absolute)
	return div.firstChild.href;
}

OptumUI.prototype.__isUserDataExists = function()
{
	if(userData)
		return true; 
}

OptumUI.prototype.getUser = function(refresh, fromPreLogin)
{
 if ( ! this.__isUserDataExists() )
  {
  	if ( this.user ) this.user.clear();
        if ( ! fromPreLogin ){
			this.preLogin(this.getAuthUser());
			return this.getUser(true, false);
        }
       return;
  }
  if ( ! this.user || refresh )
  {
	  this.user = new User(userData);
  }
  //check group code initialized or not
  this.user.getCurrentGroupCode();
  return this.user; 

}

OptumUI.prototype.getElementsByClassName = function(classNames, element)
{
	//returns elements which are there at first level with className
	if ( ! element ) element =  this._getParentElement();
	return $(element).find(classNames);
}


OptumUI.prototype.hideMessage = function(  )
{
        var currentHtmlDoc = document;
 	var messageElement = currentHtmlDoc.getElementById("__xbody_msg_group_element");
    	if ( messageElement  )
    	{
 		if (  this.showErrorOnTop ) this._getXBodyGroup().style.top = "0px";
       		messageElement.style.display = "none";
    	}
}

OptumUI.prototype.showError = function( text, autoHide, element)
{
	//"ux-msg-error"
	this._prepareMessage(text, "ux-msg-error", autoHide, element);
}

OptumUI.prototype.showValidationMessage = function( text, autoHide, element)
{
	this._pareMessage(text, "ux-msg-success", autoHide, element);
}

OptumUI.prototype.showMessage = function( text, autoHide, element)
{
	this._prepareMessage(text, "ux-msg-success", autoHide, element);
}

OptumUI.prototype._getParentElement = function()
{
   var currentHtmlDoc = document;
  var bodyElement = currentHtmlDoc.getElementsByTagName("body");
  return bodyElement[0];
}

OptumUI.prototype._getXBodyGroup = function()
{
   var currentHtmlDoc = document;
   //in case of XForms
   var firstElement = currentHtmlDoc.getElementById("xbody_group");
   if ( ! firstElement )
   {
      //look for first element
      firstElement = this._getParentElement().firstChild;

   }
  return firstElement;
}


OptumUI.prototype._prepareMessage = function( messageText, className, autoHide, element)
{
	var currentHtmlDoc = document;
	var messageElement = element ? element : currentHtmlDoc.getElementById("__xbody_msg_group_element");
	var parentElement = this._getParentElement();
	var firstChildElements ;
	var firstElement = this._getXBodyGroup();
	if ( ! messageElement )
	{
		this.showErrorOnTop = true;
		messageElement = currentHtmlDoc.createElement("div");
		if ( firstElement )
		{
			parentElement.insertBefore(messageElement , this._getXBodyGroup());
		}
		else
		{
			parentElement.appendChild( messageElement );
		}
		messageElement.className = className;
		messageElement.id = "__xbody_msg_group_element";
	}
	else
	{
		messageElement.className = className;
		messageElement.style.display = "block";
	}
		messageElement.innerHTML = messageText;
		$(messageElement).css('line-height','15px')
	//This is only for XForms and also if inside XForms if user would like to show error in between controls then no need to set top
	if ( firstElement &&  this.showErrorOnTop )
		{
			this._getXBodyGroup().style.top = $(messageElement).outerHeight(true)+"px";
		}
	    //cordys.setTextContent(messageElement, messageText);
        //don't set this
        //window.location.hash = '#__xbody_msg_group_element';
        if ( typeof( autoHide )  == "undefined" ) autoHide = "true";
        if (  this.__timerId ) clearTimeout( this.__timerId);
        if ( autoHide  == "true" )
        {
                 this.__timerId = setTimeout("optumUI.hideMessage()", 5000);
         }
}

OptumUI.prototype.loadApplication = function(applicationObject, dataObject, forceReload)
{
	if(applicationObject &&
			applicationObject.frameContainer &&
					applicationObject.applicationId &&
					applicationObject.url &&  applicationObject.frameId )
	{
		if ( typeof(forceReload) == "undefined" ) forceReload = true;
		var applicationXML = CordysRoot.cordys.loadXMLDocument("<Application />");
		optumUI_addElements(applicationXML,"id",applicationObject.applicationId);
		optumUI_addElements(applicationXML,"url",applicationObject.url);
		var frameElement = optumUI_addElements(applicationXML, "frame", applicationObject.frameId);
		if ( applicationObject.features ) frameElement.setAttribute("features", applicationObject.features);
		if ( applicationObject.width ) frameElement.setAttribute("features", applicationObject.width);
		if ( applicationObject.height ) frameElement.setAttribute("features", applicationObject.height);
		optumUI_addElements(applicationXML,"caption",applicationObject.caption);
		optumUI_addElements(applicationXML,"description",applicationObject.description);
		var frameContainer = applicationObject.frameContainer;
		if(!CordysRoot.system.containers[applicationObject.applicationId])
		{

			var frame = CordysRoot.cordys.getElementById(frameContainer, applicationObject.frameId) ;
			if(!frame)
			{
				frame = document.createElement("IFRAME");
				frame.setAttribute("id",applicationObject.frameId);
				frame.setAttribute("src","about:blank");
				frame.setAttribute("class","container");
				frame.setAttribute("frameborder","0px");
				frameContainer.appendChild(frame);
				application.addType(frame, "wcp.library.system.IFrameContainer");
			}
		}
		this.hideIframes(frameContainer, applicationObject.frameId);
		if ( ! CordysRoot.system.windows[applicationObject.applicationId] || forceReload )
		{
			application.select(applicationXML.documentElement, dataObject);
		}
	}
	else
	{
		optumUI.showError("Invalid application object.");
	}
}

OptumUI.prototype.hideIframes = function(frameContainer, frameId)
{
	if(frameContainer)
	{
		var iframes = frameContainer.getElementsByTagName("iframe");
		for(var i=0; i < iframes.length ; i++)
		{
			var iframeId = iframes[i].id;
			var systemContainer = CordysRoot.system.containers[ iframeId ];
			if ( ! systemContainer ) continue;
			if( iframeId !=  frameId )
            {
				iframes[i].style.display = "none";
				systemContainer.hide();
            }
			else
           {
				iframes[i].style.display = "block";
				systemContainer.show();
			}
		}
	}
}
OptumUI.prototype.unRegisterTabContextMenu = function(tabControl)
{
    if(tabControl && tabControl.tabStrip)
        tabControl.tabStrip.oncontextmenu = null;
}
function optumUI_addElements(appXML,elementName,elementValue)
{
	var newNode = CordysRoot.cordys.createElementNS(appXML, "", elementName);
    CordysRoot.cordys.setTextContent(newNode,elementValue);
    CordysRoot.cordys.appendXMLNode(newNode,appXML.documentElement);
	return newNode;
}

function OptumUI_parseHTMLElements(htmlElement, className, elements)
{
	if ( ! htmlElement ) return;
	var element;
	for(var child = htmlElement.firstChild; child; )
	{
		if( child.nodeType != 3 ) //text node not required to parse
		{
			if ( WebForm.htmlUtil.hasClassName(className, child) )
			{
				if ( ! elements )
				{
					return child;
				}
				elements[ elements.length ] = child;
			}
			element = OptumUI_parseHTMLElements(child, className, elements);
		}
		if ( ! element ) child = child.nextSibling;
		else
		{
			return element;
		}
	}
}

function User( userData )
{
  if ( userData  )
  {
	this.__userData = userData;
  	this.email = userData.userEmail;//CordysRoot.cordys.getNodeText(userResponseXml, ".//*[local-name()='userEmail']");
  	this.userKey = userData.userKey; //CordysRoot.cordys.getNodeText(userResponseXml, ".//*[local-name()='userKey']");
  	this.userFullName = userData.userName;//CordysRoot.cordys.getNodeText(userResponseXml, ".//*[local-name()='userName']");
	this.getUserGroups();
	this.getUserVendors();
	this.isExternalUser();
  }
}

User.prototype.clear = function()
{
	this.status = null;  	this.email = null;
	this.location = null;
	this.message = "";
  	this.__userTasks = null;
	this.enabled=null;

}

User.prototype.getUserGroups = function(){
	userData = JSON.parse(sessionStorage.getItem("userData"));
	if (  userData && ! this.userGroups)
	{
		 this.userGroups = {};
          var userGroup = userData.gcmUserGroup;
          for(var u=0, length = userGroup.length; u < length; u++){
    			var group = {
    				groupKey 			: userGroup[u].groupKey,
    				groupName 			: userGroup[u].groupName,
    				groupCode 			: userGroup[u].groupCode,
    				isDefaultGroupSW 	: userGroup[u].isDefaultGroupSW,
    				isInternalGroup 	: userGroup[u].isInternalGroup,
    				spotlightUrl 		: userGroup[u].spotlightUrl
    	       } 
    	 this.userGroups[group.groupCode] = group;
          }
	}    
	return userData.gcmUserGroup; 
}

// returns the user's default group
User.prototype.getCurrentGroupCode = function(){
	if ( ! this.userGroups ) return;
	this.currentGroupCode = '';
	for(var groupCode in this.userGroups ){
		if (this.userGroups[groupCode].groupName != "" && this.userGroups[groupCode].isDefaultGroupSW == "Y"){
			this.currentGroupCode = this.userGroups[groupCode].groupCode;
			break;
		}
	}
	return this.currentGroupCode;	
} 

//returns whether the user is Internal or External
User.prototype.isExternalUser = function(){
	var returnValue = false;
	if ( ! this.userGroups ) return returnValue;
	this.currentGroupCode = '';
	for(var groupCode in this.userGroups ){
		if (this.userGroups[groupCode].groupName != "" && this.userGroups[groupCode].isDefaultGroupSW == "Y" && this.userGroups[groupCode].isInternalGroup == "N"){
			returnValue =  true;
		}else if (this.userGroups[groupCode].groupName != "" && this.userGroups[groupCode].isDefaultGroupSW == "Y" && this.userGroups[groupCode].isInternalGroup == "Y"){
			returnValue = false;
		}
	}
	return returnValue;
}

//returns whether the user is Internal or External
User.prototype.getSpotLightURL = function(){
	if ( ! this.userGroups ) return false;
	var spotLightUrl = '';
	for(var groupCode in this.userGroups ){
		if (this.userGroups[groupCode].groupName != "" && this.userGroups[groupCode].isDefaultGroupSW == "Y"){
			spotLightUrl = this.userGroups[groupCode].spotlightUrl;
		}
	}
	return spotLightUrl;	
}


// Get user vendor
User.prototype.getUserVendors = function(){
 //  if (  system.data.__userResponseXml && ! this.userVendors)
	userData = JSON.parse(sessionStorage.getItem("userData"));
	if (userData && !this.userVendors)
   {
		 this.userVendors = {};		 
		 var userVendor = userData.gcmUserVendor;
         for(var u=0, length = userVendor.length; u < length; u++){
   			var vendor = {
   				vendorKey : userVendor[u].gcmVendorKey,
   				vendorName : userVendor[u].vendorName,
   				vendorCode : userVendor[u].vendorCode,
   				isDefaultVendor : userVendor[u].isDefault
   	       } 
   			this.userVendors[vendor.vendorKey] = vendor;
         }
   }      
   return userData.gcmUserVendor;
}   


function reqParams(params) {
	var queryParams = "";
	for ( var key in params) {
		queryParams += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
	}
	return queryParams;
}
var config = {
	headers : {
		'Content-Type' : 'application/x-www-form-urlencoded'
	}
};

OptumUI.prototype.getUserGroups=function(userData){
	return userData.gcmUserGroup;
}

OptumUI.prototype.getUserVendors=function(userData){
	return userData.gcmUserVendor;
}

OptumUI.prototype.getUserRoles = function(userData){	
	 return userRoles;
} 


User.prototype.getDefaultVendorKey = function(){
	if ( ! this.userVendors ) return;
	for(var vendorKey in this.userVendors ){
		this.defaultVendorKey = vendorKey;
		break;
	}
	return this.defaultVendorKey;
}

User.prototype.getLoggedInUserKey = function(){
	return userData.userKey;
}

User.prototype.setLoggedInUserKey = function(userKey){
	this.userKey = userKey;
}

OptumUI.prototype.setUserSelectedRole = function(roleName){
	this.currentUserRole = roleName;
}

OptumUI.prototype.getUserSelectedRole = function(){
	return this.currentUserRole;x
}

User.prototype.getCurrentGroupKey = function(){	
	if ( ! this.userGroups ) return;
	// Change this logic if user belongs to multiple groups
	this.currentGroupKey = '';
	for(var groupCode in this.userGroups ){
		if (this.userGroups[groupCode].groupName != "" && this.userGroups[groupCode].isDefaultGroupSW == "Y"){
			this.currentGroupKey = this.userGroups[groupCode].groupKey;
			break;
		}
	}
	return this.currentGroupKey;
}
	
User.prototype.getApplicationTasks = function()
{
   if (  CordysRoot.__optumInternalData &&  CordysRoot.__optumInternalData.__userResponseXml )
   {
         this.__userTasks = CordysRoot.cordys.selectXMLNode(CordysRoot.__optumInternalData.__userResponseXml, ".//*[local-name()='Tasks']");
   }
   return this.__userTasks;
}

OptumUI.prototype.hasRole = function(roleName)
{
	var boolHasRole = false;

var roleModel = new $.cordys.model({
			objectName : "userHasRole", // Name of the Business Object
			dataType : "json",
			isReadOnly : true,
			read : {
					// Settings for the read method
					namespace : 'http://schemas.optum.com/optum/mrm/comm/useradmin/1.0',
					method : "UserHasRole",
					async:false,
					parameters : {
					'roleName':roleName
					}
				}
		});
		roleModel.read().done(function(e){
		if(e)
			boolHasRole = e[0].userHasRole;
		});
		return boolHasRole;
}
OptumUI.prototype.isViewOriginalAccessible = function(){
	
	if ( typeof( CordysRoot.isViewOrgAccessible ) != 'undefined') return CordysRoot.isViewOrgAccessible;
	
	var  userDN = CordysRoot.system.getUser().organizations[ application.organization ].userDN;
	CordysRoot.isViewOrgAccessible = false;
	var roleModel = new $.cordys.model({
			objectName : "Role", // Name of the Business Object
			dataType : "json",
			isReadOnly : true,
			read : {
					// Settings for the read method
					namespace : 'http://schemas.optum.com/optum/mrm/comm/useradmin/1.0',
					method : "GetAllUserRoles",
					async:false,
					parameters : {
					'userDN':userDN
					}
				}
		});
		roleModel.read().done(function(e){
				if(e && e.length > 0){
					for(var i = 0; i < e.length; i++)
					{
						if(e[i].roleCode == 'SUP' || e[i].roleCode == 'MR' || e[i].roleCode == 'PM' || e[i].roleCode == 'SA')
						{
							CordysRoot.isViewOrgAccessible = true;
							break;
						}
					}
				}
		});
	
	return CordysRoot.isViewOrgAccessible;
}


OptumUI.prototype.addHyperLink  = function(element, value, onClickHandler)
{

        //get parent node
    var parentElement = element.parentNode;
    if ( ! parentElement  ) return;
    var hyperElement = parentElement.getElementsByTagName("a");
    if ( hyperElement.length == 0 )
    {
       hyperElement = document.createElement("a");
       hyperElement.className = "underline";
       parentElement.appendChild( hyperElement );
       CordysRoot.cordys.setTextContent(hyperElement, value);
       CordysRoot.cordys.addDOMListener(hyperElement, "onclick", onClickHandler);
    }
    else
    {
      hyperElement = hyperElement[0];
      CordysRoot.cordys.setTextContent(hyperElement, value);
    }
element.style.display = "none";

}

OptumUI.prototype.addHtmlControl = function(element, id, type, tagName, name,  value, onClickHandler)
{

        //get parent node
    var parentElement = element.parentNode;
    if ( ! parentElement  ) return;
    var htmlElement = CordysRoot.cordys.getElementById(parentElement, id);

    if ( ! htmlElement )
    {
       htmlElement = document.createElement(tagName);
       htmlElement.id  = id;
       htmlElement.type = type;
       htmlElement.name = name;
       htmlElement.value = value;
       parentElement.appendChild( htmlElement );

       CordysRoot.cordys.addDOMListener(htmlElement , "onclick", onClickHandler);
    }
    else
    {
      htmlElement.value = value;
    }
element.style.display = "none";
return htmlElement ;

}

OptumUI.prototype.isDataToSave = function()
{
	var allWindows = CordysRoot.system.windows;
	for(var windowName in allWindows)
	{
      var eachWindow = allWindows[windowName ];
	 //look only for XForms
	  if ( ! eachWindow.WebForm ) continue;
	 //get all models
	  var modelReference = eachWindow.WebForm.modelGlobalArray[ eachWindow.application.container.applicationId ];
	  if ( ! modelReference ) continue;
	  var models = modelReference.models;
	  for(var model in models)
	  {
		var xformsModel = models[model];
		 if ( ! xformsModel.noSave(false) )
		 {
			var modifiedTupleXQL = ".//*[local-name()='data']/*/*[local-name()='tuple' and @clientattr:sync_id and (child::*[local-name()='new'])]";
			var modifiedTuples = CordysRoot.cordys.selectXMLNodes(xformsModel.getData(), modifiedTupleXQL);
			if ( modifiedTuples.length == 0 )
			{
				modifiedTupleXQL = ".//*[local-name()='data']/*/*[local-name()='tuple' and @clientattr:sync_id and not(child::*[local-name()='new'])]";
				modifiedTuples = CordysRoot.cordys.selectXMLNodes(xformsModel.getData(), modifiedTupleXQL);
			}
			if ( eachWindow.WebForm.isDataToSynchronize(xformsModel.getData(), xformsModel) && modifiedTuples.length > 0 )
			{
				return true;
			}



		 }
	  }
	}
	return false;
}

/**
	Method to renew the session
**/
OptumUI.prototype.renewSession = function()
{

}//For hiding the empty rows in the table
OptumUI.prototype.formatTableRows = function(TableObject)
{
	if(TableObject && TableObject.tagName =='TABLE')
	{
		//var filledRows = TableObject.getRows();
		var totalRows = TableObject.rows;
		var totalRowsLength = totalRows.length;
		for(var i = totalRows.length-1; i>= 1; i-- )
		{
			var row = TableObject.rows[i];
			if(row.businessObject == null)
				row.style.display = "none";
			else
				{
					row.style.display = "";
					var rowNum = totalRowsLength-i;
					if(rowNum%2==0)
					{
						$(row).addClass('evenrow');
						$(row).removeClass('oddrow');
					}
					else
					{

						$(row).removeClass('evenrow');
						$(row).addClass('oddrow');
					}
				}
		}
	}
}

OptumUI.prototype.getDateRange = function(inputText, preDefDateFormat){
var dateformat = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
var dateRange = {};
    var regEx = new RegExp(dateformat);
    if(regEx.test(inputText))
    {
        var dateArr = inputText.split("/");
        var mm  = parseInt(dateArr[0]);
        var dd = parseInt(dateArr[1]);
        var yy = parseInt(dateArr[2]);
        var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
        if (mm==1 || mm>2)
        {
            if (dd>ListofDays[mm-1])
            {
                dateRange.errorMessage ="Invalid Date. Enter date in "+preDefDateFormat+" format.";
                return dateRange;
            }
        }
        else
        if (mm==2)
        {
            var lyear = false;
            if ( (!(yy % 4) && yy % 100) || !(yy % 400))
            {
                lyear = true;
            }
            if ((lyear==false) && (dd>=29))
            {
                dateRange.errorMessage ="Invalid Date. Enter date in "+preDefDateFormat+" format.";
                return dateRange;
            }
            if ((lyear==true) && (dd>29))
            {
                dateRange.errorMessage ="Invalid Date. Enter date in "+preDefDateFormat+" format.";
                return dateRange;
            }
        }
		 var fromDateUTC = this.getCurrentUTCDateInFormat(new Date(Date.UTC(dateArr[2],dateArr[0]-1,dateArr[1],0,0,0)));
		        var currDateUTC = this.getCurrentUTCDateInFormat(new Date(Date.UTC(dateArr[2],dateArr[0]-1,dateArr[1],23,59,59)));
		        if ( new Date(dateArr[2],dateArr[0]-1,dateArr[1],0,0,0) > ( new Date() ) ){
				dateRange.errorMessage = "Please select valid past date.";
				return dateRange;
			}
		dateRange.fromDate = fromDateUTC;
		dateRange.toDate = currDateUTC;
        return dateRange;  
    }  
    else  
    {  
        dateRange.errorMessage ="Invalid date format. Enter date in "+preDefDateFormat+" format.";  
        return dateRange;  
    } 

}

/*returns UTC Date in "YYYY-MM-DDTHH:mm:SS.s" format*/
OptumUI.prototype.getCurrentUTCDateInFormat = function(displayDate) {
	var UTCDate = displayDate.getUTCFullYear() + "-" + ("0"+(displayDate.getUTCMonth() + 1)).slice(-2) + "-" + ("0"+displayDate.getUTCDate()).slice(-2) + "T" + displayDate.getUTCHours() + ":" + displayDate.getUTCMinutes() + ":" + displayDate.getUTCSeconds() + ".0";
	return UTCDate;
}

OptumUI.prototype.mandatoryControl = function()
{
	var elements = document.getElementsByClassName('js_mandatory');
	for(var i=0;i<elements.length;i++)
	{
		var label = elements[i].getElementsByTagName('label')[0];
		if(label && label != null){
			var labelTxt = label.innerHTML;
			if(labelTxt.lastIndexOf('*') > 0){
				label.innerHTML = labelTxt.substring(0, labelTxt.lastIndexOf('*')) + "<span style=color:red> *</span>"
			}
		}
	}
}

OptumUI.prototype.getRole = function(businessFunctionKey)
{
	return this.getSystemData().getRole(businessFunctionKey);
}

OptumUI.prototype.getUserDisplayName = function()
{
	return userData.userName;
}

OptumUI.prototype.getSystemData = function()
{
}

function SystemData(systemDataXml)
{

}

SystemData.prototype.getBusinessFunctions = function()
{
	//get business functions and key role as business function key as index
	return this._businessFunctions;
}


SystemData.prototype.getUserName = function()
{
	// this method will return the current loggec in user lastname , firstname
	return this._userName;
}

SystemData.prototype.getRole = function(businessFunctionKey)
{
	if ( this._businessFunctions  )
	{
		return this._businessFunctions[businessFunctionKey];
	}
	//return empty function
	return new BusinessFunction(businessFunctionKey, "", "", "");
}

function BusinessFunction(key, name, code, role)
{
	this.key = key;
	this.name = name;
	this.code = code;
	this.role = role;
}
BusinessFunction.prototype.getName = function()
{
	return this.name;
}
BusinessFunction.prototype.getCode = function()
{
	return this.code;
}
BusinessFunction.prototype.getRole = function()
{
	return this.role;
}
BusinessFunction.prototype.getKey = function()
{
	return this.key;
}