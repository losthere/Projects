/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.13.0
 */
angular.module('uitk.component.uitkFileUpload', ['uitk.component.uitkNavigable','uitk.uitkUtility'])
    .directive('uitkFileUpload', function($parse,$timeout,$compile){

        function link($scope, $element, attr) {

            $scope.uploadCount = 0;
           // $scope.model.onLoad();
            $scope.model.fileUploadButtonFocus = false;
            var digits_to_words = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen ', 'twenty '];
            
            var mandatoryFields = ['id','acceptFileTypes','uploadUrl'];
            _.forEach(mandatoryFields, function(attr){ if(attr && !$scope.model.hasOwnProperty(attr)){
                throw {
                    name : 'MandatoryFieldMissingException',
                    message : attr + ' mandatory field is missing'
                };
            }});
            


            // $scope.show = false;
            // $scope.hide = function(){
            //     $scope.show = false;
            // }
            
            if(!$scope.model.maxFileSize) {
                $scope.model.maxFileSize = "5";
            }

            if(!$scope.model.maxFileNumber) {
                $scope.model.maxFileNumber = "999";
            }

            $scope.model.selectFilesBtn = $scope.model.selectFilesBtn || "Select Files";
            $scope.model.tablePlaceholderValue = $scope.model.tablePlaceholderValue || "Select files to upload.";

            if(bowser && bowser.name === "Internet Explorer" && bowser.version==="9.0"){
                /*fix for IE9 security issue. (IE9 does not allow to click on the input file button programatically)*/
                $scope.enableFileUploadButton = true;
            }else{
                $scope.enableFileUploadButton = false;
            }


            if(parseInt($scope.model.maxFileNumber, 10) > 999) {
                throw {
                    name : 'MaxFileNumberException',
                    message : attr + ' cannot be more than 20'
                };
            }

            if(!$scope.model.validFileNameRegEx) {
                $scope.model.validFileNameRegEx = "^[\\w^'@{}\\[\\],$=!\\-().~;`_]*$";
            }

            if(!$scope.model.sequentialUploads){
                $scope.model.sequentialUploads = false;
            }

            $scope.blur = function(){
                $scope.model.fileUploadButtonFocus = false;
            };

            $scope.focus = function(){
                $scope.model.fileUploadButtonFocus = true;
            };

            $scope.setFileUploadButtonFocus = function(){
                $scope.model.fileUploadButtonFocus = false;
            };

            $scope.selectFilesEventHandler = function(){
                $timeout(function(){
                    $("#"+$scope.model.id).click();
                },100);
            };

            function sortTable(table) {
                var tbody = table.find('tbody');

                tbody.find('tr').sort(function(a, b) {
                    return $('td:first', a).text().localeCompare($('td:first', b).text());
                }).appendTo(tbody);
            }

            $timeout(function() { // extra code
                $element.find(".oui-upld").each( function( index, element ) {
                        var fileIndexer = 0;
                        var fileUploadCounter = 0; //Used to keep of multiple file count uploaded at a time. Show cancel button until all files are uploaded.
                        var fileCountIndex = 0;
                        var $fileInput = $(element).find( "input[type='file']" ).first();
                        var maxFileNumber = parseInt($fileInput.attr("data-max-file-number"), 10);
                        var placeholderHTML = $compile('<tr><td class="oui-upld-placeholder" translate>{{ model.tablePlaceholderValue }}</td></tr>')($scope);
                        var serverErrorHTML = $compile('<tr><td class="oui-upld-placeholder ux-upld-error" translate>Unable to connect to server.</td></tr>')($scope);
                        var headerHTML = $compile('<thead><tr role="row"><th translate>File Name</th><th translate>Status</th><th translate class="size-col">Size</th><th translate ng-if="!model.hideRemove">Actions</th></tr></thead>')($scope);
                        var rowHTML =  '<td id="" role="rowheader">ImageName.png</td><td><span class="oui-upld-progress-meter" id="oui-upld-index-"><span class="oui-upld-progress-not-started"></span></span></td><td class="size-row"></td>';
                        var errorRowHTML = '<td id="" role="rowheader">ImageName.png</td><td><uitk:icon-font icon="cux-icon-alert_hollow" hidden-text="Alert"></uitk:icon-font><span class="oui-upld-error"></span></td><td>---</td>';

                        //Show/Hide remove link based on hideRemove flag
                        if(!$scope.model.hideRemove) {
                            rowHTML += '<td><a href="#" class="removefile" aria-describedby=""><uitk:icon-font icon="cux-icon-remove"></uitk:icon-font><span>Cancel</span></a></td>';

                            errorRowHTML += '<td><a href="#" class="removefile" aria-describedby=""><uitk:icon-font icon="cux-icon-remove"></uitk:icon-font><span>Remove</span></a></td>';
                        }

                        var maxNoOfFileErrorHTML =  $compile('<td colspan="4" class="oui-upld-placeholder oui-upld-error ux-upld-custom-error ">Only '+digits_to_words[parseInt($scope.model.maxFileNumber, 10)]+'<span translate>files can be uploaded at one time</span></td>')($scope);

                        var $description = $(element).find( ".oui-upld-restrictions" );
                        var maxFileSizeSetting = $fileInput.attr("data-max-file-size");
                        var fileTypeSetting = $fileInput.attr("data-accept-file-types");

                        var descriptionText = $compile("<span><span translate>Maximum file size:</span>" + " " + ($fileInput.attr("data-max-file-size") ? ($fileInput.attr("data-max-file-size")+"MB") : "Any") + "<span translate>. Accepted file types:</span>" + " " + ($fileInput.attr("data-accept-file-types") ? $fileInput.attr("data-accept-file-types").replace(/\|/g,", ") : "All") + "</span>")($scope);
                        $description.html( descriptionText );
                        $fileInput.attr("data-max-file-size", ( maxFileSizeSetting*1048576 ));

                        if (fileTypeSetting !== undefined) {
                            var acceptedFilesRegExp = "(\\.|\\/)(" + $fileInput.attr("data-accept-file-types") + ")$";
                            $fileInput.attr("data-accept-file-types", RegExp(acceptedFilesRegExp, "i"));
                        }

                        var selectFilesButton = '#'+$scope.model.id+"-btn";
                        var fileUploadId = '#'+$scope.model.id;
                        var cancelBtnId = '#'+$scope.model.id+"_CancelBtn";
                        var closeBtnId = '#'+$scope.model.id+"_CloseBtn";
                        //var submitBtnId = '#'+$scope.model.id+"_SubmitBtn";
                        var fileTableId = '#'+$scope.model.id+"_Table";
                        var uploadStatus = '#'+$scope.model.id+"-status";
                        var logStatus = '#'+$scope.model.id+"-log";
                        var isMaxFileUpldDisplayed = false;
                        
                        var validFileChars = new RegExp($scope.model.validFileNameRegEx);
                        $scope.$watch('model.uploadUrl', function (newValue,oldValue) {
                            if(newValue!==oldValue){
                                angular.element(element).find(fileUploadId).fileupload('option',{url:newValue});
                            }
                        }, true);
                        angular.element(element).find(fileUploadId).fileupload({
                            dataType: 'json',
                            autoUpload: false,
                            beforeSend : $scope.model.beforeSend,
                            sequentialUploads : $scope.model.sequentialUploads,
                            limitConcurrentUploads: maxFileNumber,
                            done: function (e, data) {
                            
                             //  data.result = $.parseJSON(_.unescape(data.result)); //IE9 fix. Remove this when migrated to later version browser.
                               var $fileTable = $(e.target).parent().siblings("div.oui-upld-container").first().find("table").first();
                                var rowFileIndexId = "#oui-upld-index-" + data.fileCount;
                                      $.each(data.result.result, function (index, file) {
                                    // Set status column to Uploaded
                                   	var compiledIcon = $compile("<uitk:icon-font icon='cux-icon-checkmark_hollow' hidden-text='Successful' icon-text='Uploaded'></uitk:icon-font>")($scope);
                                    if(!data.result.result[0].error)
										$fileTable.find(rowFileIndexId).find("td").eq(1).html(compiledIcon);
                                    else
										$compile($fileTable.find(rowFileIndexId).find("td").eq(1).addClass("oui-upld-error").html( "<span><uitk:icon-font icon='cux-icon-alert_hollow'></uitk:icon-font></span>"+data.result.result[0].error ))($scope);

                                    function formatFileSize (bytes) {
                                        if (typeof bytes !== 'number') {
                                            return '---';
                                        }
                                        if (bytes >= 1073741824) {
                                            return (bytes / 1073741824).toFixed(1) + 'GB';
                                        }
                                        if (bytes >= 1048576) {
                                            return (bytes / 1048576).toFixed(1) + 'MB';
                                        }
                                        return (bytes / 1024).toFixed(0) + 'KB';
                                    }

                                    if(file.fileName.substring(0,file.fileName.length-4) === $fileTable.find(rowFileIndexId).find("td").eq(0).text().substring(0,$fileTable.find(rowFileIndexId).find("td").eq(0).text().length-4)) {
                                        if (!file.error){
                                            $fileTable.find(rowFileIndexId).find("td").eq(2).html( formatFileSize(file.fileSize) );
                                            if(data.result.result.length === index+1) {
                                                sortTable($(fileTableId));
                                            }
                                            $(logStatus).append("<p> file "+file.fileName+" uploaded successfully. </p>");
                                        } else {
                                            $(logStatus).append("<p> Error occured while uploading file  "+file.name+' due to  '+file.error+"</p>");
                                            $compile($fileTable.find(rowFileIndexId).find("td").eq(1).addClass("oui-upld-error").html( "<span><uitk:icon-font icon='cux-icon-alert_hollow'></uitk:icon-font></span>"+file.error ))($scope);
                                            $fileTable.find(rowFileIndexId).find("td").eq(2).html("---");
                                            $(rowFileIndexId).attr("id", "");
                                        }

                                        data.files[0].newFileName = file.newFileName;
                                        data.files[0].deleteUrl = file.deleteUrl;
                                    }	
									if(data.files[0].name.indexOf(".zip",data.files[0].name.length-4)==-1)
									{
										 if($fileTable.find(rowFileIndexId).find("td").length>0)
										 $fileTable.find(rowFileIndexId).find("td")[3].innerHTML="<a href='#' class='removefile' aria-describedby='oui-upld-index-"+index+"-filename'></a>";								
									}
									if(data.files[0].name.indexOf(".zip",data.files[0].name.length-4)!=-1 && data.result.result[0].error=="")
									{
									  $fileTable.find(rowFileIndexId).find("td").eq(3)[0].lastChild.innerText = '';
									}
                                });

                                $scope.uploadCount = 0;

                                data.result.result.forEach(function(file){
                                    if(!file.error){
                                        $scope.uploadCount++;
                                    }
                                });
                                var errorCount = $(fileTableId).find('tr').length - $scope.uploadCount - 1;
                                $(uploadStatus).html($scope.uploadCount+' of '+($scope.uploadCount + errorCount)+' files uploaded successfully. '+errorCount+' error');
                            },

                            progress: function (e, data) {
                                var progress = parseInt(data.loaded / data.total * 100, 10);
                                var prgbId = "#oui-upld-index-" + (data.fileCount);
                                var prgbWidthPct = progress + "%";

                                var progressBar = $(prgbId).find("span.oui-upld-progress-meter>span");
                                progressBar.removeClass("oui-upld-progress-not-started");
                                progressBar.width(prgbWidthPct);
                                progressBar.addClass("oui-upld-progress");
                                progressBar.find('span').html('<span class="oui-a11y-hidden">'+prgbWidthPct+' uploaded</span>');
                            }

                        }).on('fileuploadadd', function (e, data) {
                            data.fileIndex = fileIndexer;
                            fileIndexer++;
                            //$scope.show = true; ///// show true;
                            data.fileCount = fileCountIndex;
                            fileCountIndex++;
                            $scope.setFileUploadButtonFocus();
                        }).on('fileuploadsubmit', function (e, data) {
                        	delete $scope.model.formData;
                        	$scope.model.formData = new FormData();
                        	for(key in $scope.model.userData){
                        		$scope.model.formData.append(key, $scope.model.userData[key]);
                        	}
                        	for (i = 0; i <data.files.length; i++) {
                        		$scope.model.formData.append("multipartFiles", data.files[i]);
            			    }
                        	data.formData = $scope.model.formData;
                        }).on('fileuploaddelete', function (e, data) {
                            fileIndexer--;
                            data.fileIndex = fileIndexer;
                            $timeout(function(){$(selectFilesButton).focus()},1000);
                        }).on('fileuploadstop', function (e) {
                           
                        }).on('fileuploadprocessalways', function (e, data) {
                        	
                            var file = data.files[0];
                            
                            if($scope.model.maxFileSize>1000)
                            	file.error = "File size is more than 1000MB";                           

                            if(!validFileChars.test()) {
                                file.error = "Invalid File Name";
                            }
                            var flagFileName = false;
                            angular.forEach($scope.model.formData.barcode, function(obj, idx) {  
								//zip file can have any random name
								if(file.name.indexOf(".zip",file.name.length-4)!=-1)
								{
									flagFileName = true;
									return;	
								}
								if(file.name.substring(0,file.name.indexOf(".")-0) === $scope.model.formData.barcode[idx])
								{
									flagFileName = true;
									return;
								}
            				});
                            var strFileName = data.files[0].name.substring(data.files[0].name.length-3,data.files[0].name.length);
            				if(strFileName.toLowerCase() !== 'pdf' && strFileName.toLowerCase() !== 'zip')
            				{	
            					file.error = "Image files must be in a .PDF or .zip format";
            				}
                            
                            var $fileTable = $(e.target).parent().siblings("div.oui-upld-container").first().find("table").first();
                            // Add a row to the table.
                            // If it's the placeholder text then build the header row first.
                            if ( $fileTable.hasClass("oui-upld-placeholder") ) {
                                $fileTable.html( headerHTML );
                                // Then remove the placeholder class
                                $fileTable.removeClass("oui-upld-placeholder");
                                $fileTable.addClass("oui-upld-files");
                                // Then add the tbody.
                                $fileTable.append( $("<tbody></tbody>") );
                            }
                            var invalidFileCount =$(fileTableId+" .oui-upld-error").length- $(fileTableId+" .oui-upld-placeholder").length;
                            var maxNumberFileUploaded = ($scope.uploadCount + data.originalFiles.length > maxFileNumber)? true : false;
                            if($("#FileUploadId_Table .ux-upld-custom-error").length>0){
                                $(".ux-upld-custom-error").remove();
                                isMaxFileUpldDisplayed=false;
                            }

                            var rowFileIndexId = "oui-upld-index-" + data.fileCount;
                            var $tbody = $fileTable.find("tbody");
                            var $thisTR;
                            var progressBarId = "prgb-" + data.fileCount;

                            if (!file.error && !maxNumberFileUploaded) {
                                $(logStatus).append("<p> file "+file.name+" upload started. </p>");
                               // $scope.show === true;
                                fileUploadCounter++;
                                var jqXHR = data.submit()
                                    .success(function (result) {
                                       // result = $.parseJSON(_.unescape(result)); //IE9 fix. Remove this when migrated to later version browser.
                                        var filesLen = result.result.length;
                                        file.error = result.result[filesLen-1].error;
                                        if(file.error) {                                  	
                                        	if($thisTR.find('td').length > 3 && $thisTR.find('td')[3] && $($thisTR.find('td')[3]).find('a') && $($thisTR.find('td')[3]).find('a')[0] && $($thisTR.find('td')[3]).find('a')[0].lastChild){                                        		
                                        		$($thisTR.find('td')[3]).find('a')[0].lastChild.innerText = 'Remove';
                                        	}
                                        }
                                        fileUploadCounter--;
                                        if(fileUploadCounter === 0){
                                            if(typeof $scope.model.onFileUploadError === "function"){
                                                $scope.model.onFileUploadError.call(this,result)
                                            }
                                        }
                                    })
                                    .error(function (jqXHR, textStatus, errorThrown) {
                                        if (errorThrown === 'abort') {
                                            file.error = '<span>Upload Cancelled</span>';
                                            if($scope.uploadCount < parseInt($scope.model.maxFileNumber, 10)){
                                                $(".ux-upld-custom-error").parent().remove();
                                                maxNumberFileUploaded = false;
                                            }
                                            $compile($fileTable.find("#"+rowFileIndexId).find("td").eq(1).addClass("oui-upld-error").html( "<span><uitk:icon-font icon='cux-icon-alert_hollow'></uitk:icon-font></span>"+file.error ))($scope);
                                            $fileTable.find("#"+rowFileIndexId).find("td").eq(2).html("---");
                                            $("#"+rowFileIndexId).attr("id", "");
											if($thisTR.find('td').length > 3 && $thisTR.find('td')[3] && $($thisTR.find('td')[3]).find('a') && $($thisTR.find('td')[3]).find('a')[0] && $($thisTR.find('td')[3]).find('a')[0].lastChild){                                        		
                                        		$($thisTR.find('td')[3]).find('a')[0].lastChild.innerText = 'Remove';
                                        	}
                                        } else {
                                            $tbody.remove();
                                            $fileTable.addClass("oui-upld-placeholder").html( serverErrorHTML );
                                        }
                                        fileUploadCounter--;
                                        if(fileUploadCounter === 0) {
                                            if(typeof $scope.model.onResponseError === "function"){
                                                $scope.model.onResponseError.call(this,jqXHR)
                                            }
                                        }
                                    })
                                    .complete(function () {
                                        if(fileUploadCounter === 0) {
                                            $(cancelBtnId).hide();
                                            $(cancelBtnId).css("visibility", "hidden")
                                           // scope.show == false;
                                            $(cancelBtnId).off('click');
                                        }
                                        	
                                    });
                                $(cancelBtnId).show();
                                $(cancelBtnId).css("visibility", "visible");
                                $(cancelBtnId).click(function () {
                                    if (jqXHR !== undefined && jqXHR !== null && jqXHR.readyState != 4 ) {
                                        jqXHR.abort();
                                        if($scope.model.onCancelUpload){
                                            $scope.model.onCancelUpload(file, data, jqXHR);
                                        }
                                        else{
                                            $(logStatus).append("<p> Files That are in progress of uploading have been canceled.</p>");
                                            jqXHR = null;
                                        }
                                    }
                                    return false;
                                });
                            }
                            
                            if (maxNumberFileUploaded) {
                                fileIndexer--;
                                //fileUploadCounter--;
                                data.fileIndex = fileIndexer;
                                if(!isMaxFileUpldDisplayed) {
                                    $thisTR = $("<tr></tr>").html( maxNoOfFileErrorHTML );
                                    isMaxFileUpldDisplayed = true;
                                    $(logStatus).append("<p>"+maxNoOfFileErrorHTML+"</p>");
                                } else {
                                    return false;
                                }
                            } else if (file.error) {
                                $thisTR = $compile($("<tr role='row'></tr>").html( errorRowHTML ))($scope);
                                $thisTR.find(".oui-upld-error").html( file.error );
                                $thisTR.find("td").first().html( file.name );
                                $(fileUploadId).trigger("fileuploaddelete",data);
                                $timeout(function(){$(logStatus).append("<p> Error occured while uploading file  "+file.name+' due to  '+file.error+"</p>");},1000);
                                //For accessibility
                                $thisTR.find("td").first().attr('id',rowFileIndexId+"-filename");
                                $thisTR.find("a").attr('aria-describedby',rowFileIndexId+"-filename");

                                //For accessibility
                                var errorCount = $(fileTableId).find('tr').length - $scope.uploadCount;
                                $(uploadStatus).html($scope.uploadCount+' of '+($scope.uploadCount + errorCount)+' files uploaded successfully. '+errorCount+' error');
                            } else {
                                $thisTR = $compile($("<tr role='row'></tr>").html( rowHTML ))($scope);
                                $thisTR.find("td").first().html( file.name );
                                $thisTR.find(".ux-prgb").attr("id", progressBarId);
                                $thisTR.attr("id", rowFileIndexId);

                                //For accessibility
                                $thisTR.find("td").first().attr('id',rowFileIndexId+"-filename");
                                $thisTR.find("a").attr('aria-describedby',rowFileIndexId+"-filename");
                            }

                            $thisTR.find(".removefile").click( function(e) {
                                e.preventDefault();
                                if($scope.model.onRemoveFile){
                                    $scope.model.onRemoveFile(file, data, e);
                                }
                                else {
                                    if (file.error) {
                                        if ($(e.target).parents("tr").siblings("tr").length >= 1) {
                                            $(e.target).parents("tr").first().remove();
                                        } else {
                                            $(e.target).closest("table").removeClass("oui-upld-files");
                                            $(e.target).closest("table").addClass("oui-upld-placeholder").html(placeholderHTML);
                                        }
                                        fileIndexer--;
                                        data.fileIndex = fileIndexer;
                                        //For accessibility
                                        var errorCount = $(fileTableId).find('tr').length - $scope.uploadCount - 1;
                                        $(uploadStatus).html($scope.uploadCount + ' of ' + ($scope.uploadCount + errorCount) + ' files uploaded successfully. ' + errorCount + ' error');
                                        $(logStatus).append("<p> file " + file.name + '  removed failed. ' + "</p>");
                                    } else {
                                        $(".ux-upld-custom-error").parent().remove();
										$(".ux-upld-error").parent().remove();
                                        isMaxFileUpldDisplayed = false;
                                        if (jqXHR !== undefined && jqXHR !== null) {
                                            jqXHR.abort();
                                            jqXHR = null;
                                        }

                                        //Consumer can set deleteUrl through which uploaded file will be deleted.
                                        var deleteUrl = file.deleteUrl;

                                        //If consumer like to pass only file ID or filename then append with delete URL passed in model.
                                        if ($scope.model.deleteUrl) {
                                            deleteUrl = $scope.model.deleteUrl + file.deleteUrl;
                                        }

                                       // deleteFile(data, deleteUrl, $fileTable, e);
                                    }
                                }
                            });
                           
                            function deleteFile(data, deleteUrl, fileTable, e) {
                                $.ajax({
                                    url : deleteUrl,
                                    method:'DELETE',
                                    dataType:'json',
                                    contentType: 'application/json; charset=utf-8',
                                    beforeSend: $scope.model.beforeSend,
                                    success : function(result){
                                        if(result){
                                            $thisTR = $("<tr></tr>").html("<td colspan='4' class= 'ux-upld-custom-error'>"+result.result[0].error+"</td>");
                                            if (data.originalFiles.length>1)
                                                fileTable.find( "tbody" ).append( $thisTR );
                                            else
                                                fileTable.find( "tbody" ).prepend( $thisTR );
                                        } else {
                                            if(e) {
                                                if ( $(e.target).parents("tr").siblings("tr").length >= 1 ) {
                                                    $(e.target).parents("tr").first().remove();
                                                } else {
                                                    $(e.target).closest("table").removeClass("oui-upld-files");
                                                    $(e.target).closest("table").addClass("oui-upld-placeholder").html(placeholderHTML);
                                                }
                                            }
                                            $(fileUploadId).trigger("fileuploaddelete",data);
                                        }

                                        //For accessibility
                                        $scope.uploadCount--;
                                        var errorCount = $(fileTableId).find('tr').length - $scope.uploadCount - 1;
                                        $(uploadStatus).html($scope.uploadCount+' of '+($scope.uploadCount + errorCount)+' files uploaded successfully. '+errorCount+' error');
                                        $(logStatus).append("<p> file  removed successfully."+"</p>");
                                    },
                                    error : function() {
                                    }, complete : function (){

                                    }
                                });
                            }

                            if (data.originalFiles.length>1)
                                $fileTable.find( "tbody" ).append( $thisTR );
                            else
                                $fileTable.find( "tbody" ).prepend( $thisTR );
                        })

                });
            }, 100);
        }

        return {
            restrict : 'AE',
            replace : true,
            scope : {
                model : '='
            },
           /* templateUrl : function (element, attrs) {
                return attrs.templateUrl || 'template/uitk-file-upload.html';
            },*/
            templateUrl: '../../../lib/js/common/template/uitk-file-upload.html',
            link : link
        };
    });
