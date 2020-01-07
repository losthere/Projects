<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width" />
<meta HTTP-EQUIV="Pragma" CONTENT="no-cache">
<meta HTTP-EQUIV="Expires" CONTENT="-1">
<title>Clinical Review</title>
<link rel="stylesheet" href="../../gcm-app-services/com/optum/comm/lib/css/general2.css" />
<link type="image/x-icon" href="../../gcm-app-services/com/optum/comm/lib/images/favicon.ico"
	rel="icon"></link>
<link type="image/x-icon" href="../../gcm-app-services/com/optum/comm/lib/images/favicon.ico"
	rel="shortcut icon"></link>

<style type="text/css">
ul.b {
	list-style-type: circle;
	font-size: 12px;
	font-family: Arial, Helvetica, sans-serif;;
	float: left;
	text-align: justify;
	padding-right: 1cm;
	margin-left: 1.5cm;
}

.ux-head-cntr-navigation-global {
	font-size: 25px;
	font-family: Arial, Helvetica, sans-serif;
	padding-top: 15px;
}

.h_button {
	background-color: #e6e6e6;
	background: -webkit-linear-gradient(top, #f3f3f3 0%, #cccccc 100%);
	background: -moz-linear-gradient(top, #f3f3f3 0%, #cccccc 100%);
	background: linear-gradient(top, #f3f3f3 0%, #cccccc 100%);
	-moz-box-shadow: inset 0 0 0 1px white;
	-webkit-box-shadow: inset 0 0 0 1px white;
	box-shadow: inset 0 0 0 1px white;
	border: 1px solid #999999;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	border-radius: 3px;
	line-height: 16px;
	color: #333333;
	font-family: Arial, Helvetica, sans-serif;
	margin: 0px .3em;
	padding: 0px .3em;
	width: 7em;
	font-weight: normal;
	font-size: 12px;
	text-align: center;
	height: 2em;
	text-overflow: ellipsis;
}

.h_button:active {
	border: 1px solid #f47b29;
}

.h_button:disabled {
	color: #808080;
	border: 1px solid #999999;
}

.h_button:hover {
	border: 2px solid #F47B29;
	background-color: #e6e6e6;
	color: black;
}

.fontstyle {
	margin-left: 2cm;
	font-size: 12px;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: bold;
	color: #484848;
}
</style>
<script type="text/javascript"
	src="../../gcm-app-services/com/optum/comm/lib/js/common/jquery-3.2.1.min.js"></script>
<script type="text/javascript"
	src="../../gcm-app-services/com/optum/comm/lib/js/common/responsive-layout.js" type="text/javascript"></script>
<script type="text/javascript" src="../../gcm-app-services/com/optum/comm/lib/js/common/ux.js"></script>
<script type="text/javascript">
	// To hide IE context menu from getting displayed on the left-most corner
	document.oncontextmenu = function() {
		return false
	};
	var response = "";
	var GCM = "/gcm/";
	var RelyingAppId = "";
	var Path = "";
	var loginLink = "";
	var RegistrationLink = "";
	var LoadingHtml = "../mrm/default.htm";
	
	var sysRegistrationURL = "https://test-healthid.optum.com/tb/app/index.html?TYPE=33554433&METHOD=GET&REALMOID=06-7c9d83d5-1157-44ab-ba41-d4c75eb543d2&GUID=&SMAGENTNAME=Crsg3rifTQoMCXqmjqGd8RurpA8UBWFDE66fIevw5hgC57GhZ9g9N0ANlfA3bBg1&TARGET=https%3A%2F%2Fgcmtest.optum.com%2Fcomm%2Fmrm%2Fdefault.htm&relyingAppId=GCM89459&SMAUTHREASON=0#/registration";
	var stgRegistrationURL = "https://stg-healthid.optum.com/tb/app/index.html?TYPE=33554433&METHOD=GET&REALMOID=06-fbb7edba-a763-40bd-a8c4-291217dba4a6&GUID=&SMAGENTNAME=%24SM%249dpA3iWTryujRfsChFLBlB%2FUC1Ho3uSkrYMolJLt4nw1Pfz%2FEJ5%2BTAP06zbVzUVQ&TARGET=https%3A%2F%2Fgcmuat.optum.com%2Fcomm%2Fmrm%2Fdefault.htm&relyingAppId=GCM89459&SMAUTHREASON=0#/registration";
	var uatRegistrationURL = "https://stg2-healthid.optum.com/tb/app/index.html?TYPE=33554433&METHOD=GET&REALMOID=06-fbb7edba-a763-40bd-a8c4-291217dba4a6&GUID=&SMAGENTNAME=%24SM%249dpA3iWTryujRfsChFLBlB%2FUC1Ho3uSkrYMolJLt4nw1Pfz%2FEJ5%2BTAP06zbVzUVQ&TARGET=https%3A%2F%2Fgcmuat.optum.com%2Fcomm%2Fmrm%2Fdefault.htm&relyingAppId=GCM89459&SMAUTHREASON=0#/registration";
	var prodRegistrationURL = "https://healthid.optum.com/tb/app/index.html?TYPE=33554433&METHOD=GET&REALMOID=06-34b0940d-bf35-4167-b31d-92c5a16778bf&GUID=&SMAGENTNAME=H0fbO7ysxgAFJz4OaZ3mWdLqWrXvG7HV7NYFkbTA9FQ9zn6VuGW6d4klFGeSu9jy&TARGET=https%3A%2F%2Fmedicalrecordmanager.optum.com%2Fcomm%2Fmrm%2Fdefault.htm&relyingAppId=GCM89459&SMAUTHREASON=0#/registration";
	
	var optumidFrame;
		
	function showHelpDeskNumber() {
		document.getElementById("hdNumber").innerHTML="1-844-752-9438";
	}
	
	
	Path = location.href.split(GCM)[0];
	function getLoginUrl() {
		location.href = LoadingHtml;
	}
	
	
	
	function getRegistrationUrl() {
		if(location.href){
			if(location.href.indexOf("gcmtest.optum.com") > 0){
				location.href = sysRegistrationURL;
			}else if(location.href.indexOf("medicalrecordmanagerstage.optum.com") > 0){
				location.href = stgRegistrationURL;
			}else if(location.href.indexOf("gcmuat.optum.com") > 0){
				location.href = uatRegistrationURL;
			}else if(location.href.indexOf("medicalrecordmanager.optum.com") > 0){
				location.href = prodRegistrationURL;
			}
		}
	}
	
</script>

</head>
<body onload="showHelpDeskNumber()" >
	<div id="__xbody_msg_group_element"></div>
	<div id="ux-wrapper">
		<div class="ux-head">
			<div class="ux-head-cntr-logo">
				<span class="ux-head-logo"><img 
					src="../../gcm-app-services/com/optum/comm/lib/images/clinicalReview.png"
					alt="Clinical Review" />
				</span>
			</div>

			<div class="ux-head-cntr-navigation-primary">
				<ul class="ux-pnav" id="userTasksHeader" style="display: none">
					<li class="ux-pnav-selected"><a></a></li>
					<li><a></a></li>
					<li><a></a></li>
					<li><a></a></li>
				</ul>
			</div>
		</div>
		<p></p>

		<div id="content" style="height: 430px; width: 15cm; float: left;">
			<br>
			<br> <b class="fontstyle">Already existing user? Click Sign
				In</b> <br>
			<br>
			<button type="button" class="h_button" onclick="getLoginUrl()"
				style="margin-left: 75px; background-color: #e6e6e6;">Sign
				In</button>
			<br>
			<br>
			<br> <b class="fontstyle"> New to Clinical Review?
				Click Register</b> <br>
			<br>
			<button type="button" class="h_button" onclick="getRegistrationUrl()"
				style="margin-left: 75px; background-color: #e6e6e6;">Register</button>
			<br />
			<br />
			<br />
			<br /> <b class="fontstyle">For assistance, call the Help Desk:</b>
			<span id='hdNumber' style="color:#333333;text-decoration: none;">1-844-752-9438</span><br />
		</div>
	</div>
	<div id="ux-ftr" style="font-size: 12px;">
		<div>
			© Optum, Inc. All rights reserved. <a href="../mrm/terms.htm"
				id="footerId"
				onclick="newwindow=window.open(this.href, 'privacyPolicy','left=20,top=20,toolbar=no, titlebar=yes, location=no, directories=no, status=no, menubar=no,resizable=1,scrollbars=yes');if (window.focus) {newwindow.focus()}; return false;">Copyright
				& License Information</a>
		</div>
	</div>
</body>
</html>