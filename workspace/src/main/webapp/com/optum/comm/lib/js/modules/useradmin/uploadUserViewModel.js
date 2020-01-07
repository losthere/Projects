angular.module("uploadUserViewModel", []).factory("uploadUserViewModel",function() {

	return {
        records : [],
        totalRecordsCount :0,
        pagination : { 
        	currentPageNumber : 1, 
        	paginationWindow : 5, 
        	recordsPerPage : 5,
        	recordsPerPageChoices : [5, 15, 25]
        }, 
        columns : [
            {
                columnId : 'firstName',
                label :'<p>First Name<span class="cux-icon-asterisk"><span class="tk-icon-glyph"></span></span></p>',
                layoutOrder : 1,
                sortable: true,
                sortOrder: 0,
                cellTemplate : '<input  type="text" ng-pattern="/^[\'a-zA-Z0-9 -]*$/" ng-model="record.firstName" ng-change="record.isFirstNameNotValid=false" ng-class="{error1: !record.firstName,error2:record.firstName.length>50}"/>'
					+'<div role="alert"><span class="error1" style="color:red" ng-show="(record.firstName==null || record.firstName==\'\') && record.firstName.length==0">FirstName (DTL-1) is Required but missing.</span></div>'
					+'<div role="alert"><span class="error2" style="color:red" ng-show="record.firstName.length>50">Max character length of 50 exceeded (DTL-1)</span></div>'
					+'<div role="alert"><span  style="color:red" ng-show="!record.firstName.match(nameRegExp) || record.isFirstNameNotValid">Special characters not allowed (DTL-1)</span></div>'
            },
            {
                columnId : 'lastName',
                label :'<p>Last Name<span class="cux-icon-asterisk"><span class="tk-icon-glyph"></span></span></p>',
                layoutOrder : 2,
                sortable: true,
                sortOrder: 0,
                cellTemplate : '<input type="text" ng-pattern="/^[\'a-zA-Z0-9 -]*$/" ng-model="record.lastName" ng-change="record.isLastNameNotValid=false" ng-class="{error1: !record.lastName,error2: record.lastName.length>50}"/>'
                	+'<div role="alert"><span class="error1" style="color:red" ng-show="(record.lastName==null || record.lastName==\'\') && record.lastName.length==0 ">LastName (DTL-2) is Required but missing.</span></div>'
                	+'<div role="alert"><span class="error2" style="color:red" ng-show="record.lastName.length>50">Max character length of 50 exceeded (DTL-2)</span></div>'
                	+'<div role="alert"><span style="color:red" ng-show="!record.lastName.match(nameRegExp) ||record.isLastNameNotValid">Special characters not allowed (DTL-2)</span></div>'
            },
            {
                columnId : 'email',
                label :'<p>Email<span class="cux-icon-asterisk"><span class="tk-icon-glyph"></span></span></p>',
                layoutOrder : 3,
                sortable: true,
                sortOrder: 0,
                style : "width: 400px;",
                cellTemplate : '<input type="text" ng-model="record.email" ng-pattern="/^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{1,})$/" ng-change="record.isEmailNotValid=false" ng-class="{error1: !record.email,error2: record.email.length>50}"/>'
                	+'<div role="alert"><span class="error1" style="color:red" ng-show="(record.email==null || record.email==\'\') && record.email.length==0">Email (DTL-3) is Required but missing.</span></div>'
                	+'<div role="alert"><span class="error2" style="color:red" ng-show="record.email.length>50">Max character length of 50 exceeded (DTL-3)</span></div>'
                	+'<div role="alert"><span style="color:red" ng-show="!record.email.match(emailRegExp) || record.isEmailNotValid">Invalid Email format entered (DTL-3).</span></div>'
            },
            {
                columnId : 'organizationName*',
                label :'<p>Organization Name<span class="cux-icon-asterisk"><span class="tk-icon-glyph"></span></span></p>',
                layoutOrder : 4,
                sortable: true,
                sortOrder: 0,
                cellTemplate : '<input type="text"  ng-model="record.organizationName" ng-class="{error1: !record.organizationName,error2: record.organizationName.length>250}"/>'
                	+'<div role="alert"><span class="error1" style="color:red" ng-show="(record.organizationName==null || record.organizationName==\'\') && record.organizationName.length==0">OrganizationName (DTL-4) is Required but missing.</span></div>'
                	+'<div role="alert"><span class="error2" style="color:red" ng-show="record.organizationName.length>250">Max character length of 250 exceeded (DTL-4)</span></div>'
            },
            {
                columnId : 'role',
                label :'<p>Role<span class="cux-icon-asterisk"><span class="tk-icon-glyph"></span></span></p>',
                layoutOrder : 5,
                sortable: true,
                sortOrder: 0,
                cellTemplate : '<input type="text" ng-model="record.role" ng-class="{error1: !record.role,error2: record.role.length>250}"/>'
                	+'<div role="alert"><span class="error1" style="color:red" ng-show="(record.role==null || record.role==\'\') && record.role.length==0">Role (DTL-5) is Required but missing.</span></div>'
                	+'<div role="alert"><span class="error2" style="color:red" ng-show="record.role.length>250">Max character length of 250 exceeded (DTL-5)</span></div>'
            },
            {
                columnId : 'reportingManager',
                label :'<p>Reports To Manager UserId<span class="cux-icon-asterisk"><span class="tk-icon-glyph"></span></span></p>',
                layoutOrder : 6,
                sortable: true,
                sortOrder: 0,
                cellTemplate : '<input type="text" ng-model="record.reportsToUserID" ng-class="{error1: !record.reportsToUserID,error2: record.reportsToUserID.length>50}"/>'
                	+'<div role="alert"><span class="error1" style="color:red" ng-show="(record.reportsToUserID==null || record.reportsToUserID==\'\') && record.reportsToUserID.length==0">ReportsToManagerUserId (DTL-6) is Required but missing.</span></div>'
                	+'<div role="alert"><span class="error2" style="color:red" ng-show="record.reportsToUserID.length>50">Max character length of 50 exceeded (DTL-6)</span></div>'
                	
            },
            {
                columnId : 'address1',
                label : 'Contact Address 1',
                layoutOrder : 7,
                sortable: true,
                style: "width: 8%;",
                sortOrder: 0,
                cellTemplate : '<input type="text"  ng-pattern="/^[\#\,\.\,\_a-zA-Z0-9 -]*$/" ng-model="record.contactAddress1"  ng-change="record.isContactAddress1NotValid=false" ng-class="{error: record.contactAddress1.length>50}"/>'
                	+'<div role="alert"><span class="error" style="color:red"  ng-show="record.contactAddress1.length>50">Max character length of 50 exceeded (DTL-7)</span></div>'
                	+'<div role="alert"><span style="color:red" ng-show="!record.contactAddress1.match(addressRegExp) || record.isContactAddress1NotValid">Special characters not allowed (DTL-7)</span></div>'
                	
                	
            },
            {
                columnId : 'address2',
                label : 'Contact Address 2',
                layoutOrder : 8,
                style: "width: 10%;",
                sortable: true,
                sortOrder: 0,
                cellTemplate : '<input type="text" ng-pattern="/^[\#\,\.\,\_a-zA-Z0-9 -]*$/" ng-model="record.contactAddress2"  ng-change="record.isContactAddress2NotValid=false" ng-class="{error: record.contactAddress2.length>50}"/>'
                	+'<div role="alert"><span class="error" style="color:red" ng-show="record.contactAddress2.length>50">Max character length of 50 exceeded (DTL-8)</span></div>'
                	+'<div role="alert"><span style="color:red" ng-show="!record.contactAddress2.match(addressRegExp) || record.isContactAddress2NotValid">Special characters not allowed (DTL-8)</span></div>'
            },
            {
                columnId : 'contactCity',
                label : 'Contact City',
                layoutOrder : 9,
                style: "width: 10%;",
                sortable: true,
                sortOrder: 0,
                cellTemplate : '<input type="text"  ng-pattern="/^[\#\,\.\,\_a-zA-Z0-9 -]*$/" ng-model="record.contactCity"  ng-change="record.isContactCityNotValid=false" ng-class="{error: record.contactCity.length>50}"/>'
                	+'<div role="alert"><span class="error" style="color:red" ng-show="record.contactCity.length>50">Max character length of 50 exceeded (DTL-9)</span></div>'
                	+'<div role="alert"><span style="color:red" ng-show="!record.contactCity.match(addressRegExp) || record.isContactCityNotValid">Special characters not allowed (DTL-9)</span></div>'
            },
            {
                columnId : 'contactState',
                label : 'Contact State',
                layoutOrder : 10,
                style: "width: 10%;",
                sortable: true,
                sortOrder: 0,
                cellTemplate : '<input type="text" maxlength="2" ng-pattern="/^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/" ng-model="record.contactState" ng-change="record.isContactStateNotValid=false"/>'
                	+'<div role="alert"><span style="color:red" ng-show="!record.contactState.match(statesRegExp) || record.isContactStateNotValid">Invalid ContactState (DTL-10) abbreviation entered.</span></div>'
                	
            },
            {
                columnId : 'contactZipcode',
                label :'<p>Contact Zipcode<span class="cux-icon-asterisk"><span class="tk-icon-glyph"></span></span></p>',
                layoutOrder : 11,
                style: "width: 10%;",
                sortable: true,
                sortOrder: 0,
                cellTemplate : '<input type="text" minlength="5"   ng-keypress="$event.keyCode != 32 ? $event:$event.preventDefault()"  ng-pattern="/^[0-9\-]+$/"  ng-model="record.contactZipCode"  ng-change="record.isContactZipCodeNotValid=false" ng-class="{error1: !record.contactZipCode,error2: record.contactZipCode.length>10}"/>'
                	+'<div role="alert"><span class="error2" style="color:red" ng-show="record.contactZipCode.length>10">Max character length of 10 exceeded (DTL-11)</span></div>'
                	+'<div role="alert"><span  style="color:red" ng-show="!record.contactZipCode.match(zipCodeRegExp) || record.isContactZipCodeNotValid">Invalid format entered (DTL-11).</span></div>'
                	+'<div role="alert"><span class="error1" style="color:red" ng-show="(record.contactZipCode==null || record.contactZipCode==\'\') && record.contactZipCode.length==0 ">ContactZip (DTL-11) is Required but missing.</span></div>'
            },
            
        ]
	}
	
});
