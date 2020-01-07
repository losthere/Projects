/*

	User Experience JavaScript
	Do not modify this file.
	Version 0.9
	$Rev: 7879 $

*/

if (!uxAlreadyLoaded) {
	
	var ux = function () {
		
		var hi_res_suffix = "_ratio2"; // If a standard image is named logo.gif, then the Retina image would be named logo_ratio2.gif
		var hi_res_ext = ".png";
		var hi_res_class = ".ux-img-has-higher-res";
		var hi_res_gif = "ux-img-high-res-gif";
		
		var rtc_class = ".ux-tabl-resizable-columns";
		
		var touchInterface = 'ontouchstart' in window || navigator.msMaxTouchPoints;
		
		return {
			updateImageResolution: function() { 
				// Change the img src of all images with the class ux-img-has-higher-res to the high res version on retina displays
				if (window.devicePixelRatio && window.devicePixelRatio >= 2) {
					$(hi_res_class).each(
						function(){
							
							var img = $(this);
							var old_width;
							$("<img/>")
								.attr("src", $(img).attr("src"))
								.load(function() {
									
									old_width = this.width;
									var image_src = $(img).attr("src");
									var filename_and_path = image_src.slice( 0, image_src.lastIndexOf(".") );
									image_src = filename_and_path + hi_res_suffix;
									if ($(img).hasClass(hi_res_gif)) {
										image_src += ".gif";
									} else {
										image_src += hi_res_ext;
									}
									$(img).attr("src", image_src);
									$(img).css("max-width", old_width);
									
								});
							
						}
					);
				}
			},
			
			applyStyleConveniences: function() {
				// for each ux-table-data; if no alt-row styles set on any rows: add to odd rows.
				$( ".ux-tabl-data" ).each( function( index ) {
					if( $(this).find("tbody > tr.ux-tabl-alt-row").length <= 0 ) {
						$(this).find("tbody > tr:odd" ).addClass("ux-tabl-alt-row");
					} // end if
				}	// end function
				); // end each
																						
				$( ".ux-snav li > ul" ).parent().addClass("ux-snav-has-submenu");
				$( ".ux-pnav li > ul" ).parent().addClass("ux-pnav-has-submenu");

				// if not width set: then measure and round up to nearest "t".
				$( 'input[class*="ux-btn"]' ).not('input[class*="ux-width"]').each( function( index ) {
						var tWidth = 13;
						var thisFieldWidth = $(this).outerWidth();
						var widthAsNextTWidth = Math.ceil(thisFieldWidth / tWidth);
						var widthClassName = "ux-width-" + widthAsNextTWidth + "t";
						$(this).addClass(widthClassName);
				} // end function
				); // end each
			},
			
			oneClickOnly: function() {
				// Makes it so designated buttons can only submit a form once. Subsequent clicks return false.
				$(".ux-js-one-click-only").click(
					function (e) {
						if (!$(e.target).hasClass("ux-js-one-click-only-clicked")) {
							// If this one-click button hasn't already been clicked...
							// ...add the clicked class to it and execute as normal
							$(e.target).addClass("ux-js-one-click-only-clicked");
							return true;
						} else {
							// This button has already been clicked so just return false.
							$(e.target).stopImmediatePropagation();
							return false;
						}
					}
				);
			},
			
			
			cuxDropdowns: function() {
				// Converts standard HTML selects to fancy CUX style ones
				$("select").each(
					function ( index, ogSelect ) {
						
						$(this).addClass( "ux-mirage-dd-original" );
						
						var mirageId = "ux-mirage-dd-" + index;
						var mirageIdQuery = "#" + mirageId;
						var mirageSelectionId = "ux-mirage-dd-" + index + "-selection";
						var mirageSelectionIdQuery = "#" + mirageSelectionId;
						
						// Container
						$("<div>").attr("id",mirageId).addClass("ux-mirage-dd").insertAfter(this);
						$(mirageIdQuery).addClass( $(this).attr("class") );
						$(mirageIdQuery).removeClass( "ux-mirage-dd-original" );
						
						// Selection span
						$("<span>").attr("id",mirageSelectionId).appendTo( $(mirageIdQuery) );
						$(mirageSelectionIdQuery).addClass("ux-mirage-dd-selection").html( $(ogSelect).children("option").eq(0).html() );
						
						// Dropdown list
						$("<ul>").appendTo( $(mirageIdQuery) );
						$(this).children("option").each( function(i,e) {
							var newLI = $("<li>").html( $(ogSelect).children("option").eq(i).html() )
							var q = mirageIdQuery + " ul";
							$(q).append( newLI );
						});

						// Set up event handlers
							/*	
							- Add ux-mirage-dd-active to selection span on click/press
							- Add ux-mirage-dd-li-hover, ux-mirage-dd-li-active to lis on hover and click/press, respectively
							*/
						var bubbleCheck = false;
				
						if (!touchInterface) {
							// Desktop
							$(mirageIdQuery).on("click", function(event) {
								$(this).toggleClass("ux-mirage-dd-active");
								bubbleCheck = true;
							});
								
							$(document).on("click", function(event) {
								if (!bubbleCheck) {
									$(mirageIdQuery).removeClass("ux-mirage-dd-active");
								}
								bubbleCheck = false;
							});
							
							var q = mirageIdQuery + " ul li";
							$(q).on("mouseover", function(event) {
								$(this).addClass("ux-mirage-dd-li-hover");
							});
							$(q).on("mouseout", function(event) {
								$(this).removeClass("ux-mirage-dd-li-hover");
							});
							$(q).on("click", function(event) {
								$(mirageIdQuery).find("*").removeClass("ux-mirage-dd-li-active");
								$(this).addClass("ux-mirage-dd-li-active");
								$(mirageSelectionIdQuery).html($(this).html());
								for (var i=0; i<$(this).parent("ul").children("li").length; i++) {
									if ( $(this).parent("ul").children("li").eq(i).html() == $(this).html() ) {
										$(ogSelect).find("option").attr("selected", false);
										$(ogSelect).find("option").eq(i).attr("selected","selected");
									}
								}
							});
						}
					}
				);
			},
			
			
			resizableTableColumns: function() {
				// Enables resizable table columns. Works on tables with the designated CSS class.
				
				$(rtc_class).each( function(index, element) {
					
					// For each table with the resizable table columns
					// Add the resize handle to each th or td in the top row except the last one.
					
					var tds = $(this).find("tr").first().find("th","td");
					var td_widths = [];
					
					$(tds).each( function(i,e) {
						
						td_widths[i] = $(e).innerWidth() / $(element).innerWidth() * 100;
						$(this).css("width", function() { return td_widths[i] + "%"; });
						
						// Make sure it's not the last one.
						if ( i < tds.length-1 ) {
							
							var handle = $('<span class="ux-tabl-resizable-column-handle"></span>');
							// Use negative margins to put the handle over the border between thsi cell and the one to the right of it.
							
							$(handle).css("height", function() {
								return $(e).innerHeight();
							});
							$(handle).css("margin-top", function() {
								return "-" + $(e).css("padding-top");
							});
							$(handle).css("margin-bottom", function() {
								var total_padding = $(e).innerHeight() - $(e).height();
								return "-" + total_padding + "px";	
							});
							$(handle).css("margin-right", function() {
								var right_offset = $(this).width()/2 + parseInt($(e).css("padding-right").replace("px",""), 10);
								return "-" + right_offset + "px";
							});
							
							$(this).append(handle);
						}
					});
					
					var mouse_x = 0;
					var resizing = false;
					var original_width = 0;
					var td_resizing;
					$(".ux-tabl-resizable-column-handle").mousedown( function(e) {
						// Handle event handler
						mouse_x = e.pageX;
						resizing = true;
						original_width = $(this).parent().innerWidth();
						td_resizing = $(this).parent();
						$("body").toggleClass("ux-tabl-resizable-columns-cursor");
						return false;
					});
					$("body").mousemove( function(e) {
						// Handle event handler
						if (resizing) {
							return false;
						}
					});
					$("body").mouseup( function(e) {
						// Handle event handler
						if (resizing) {
							$(td_resizing).css("width", function() {
								var new_width = original_width + e.pageX - mouse_x;
								new_width = new_width/$(element).innerWidth() * 100;
								return new_width + "%";
							});
							$("body").toggleClass("ux-tabl-resizable-columns-cursor");
							resizing = false;
							
							// Update the widths of the other table cells.
							$(tds).each( function( i, this_td ) {
								if ($(this_td).html() != $(td_resizing).html()) {
									td_widths[i] = $(this_td).innerWidth() / $(element).innerWidth() * 100;
									$(this).css("width", function() { return td_widths[i] + "%"; });
								}
							});
							
							return false;
						}
					});
					
				});
							
			},
			
			
			initializeTableComponent: function() {
				$(".ux-comp-table .ux-tabl-data").each( function(index, element) {
					
					var uniqueTableId = "ux-comp-table-" + index;
					$(this).attr("id", uniqueTableId);
					
					$(this).find("thead th :checkbox").first().attr({
						name: uniqueTableId + "-select-cb",
						value: uniqueTableId + "-select-cb-all",
						title: "Select all"
					}).
					on("click", function(event) {
						var queryString = "input[name='" + uniqueTableId + "-select-cb']";
						if ($(this).attr("checked")) {
							$(this).attr("title", "Unselect all");
							$(queryString).attr("checked", "checked");
							$(queryString).closest("tr").addClass("ux-tabl-selected");
						} else {
							$(this).attr("title", "Select all");
							$(queryString).removeAttr("checked");
							$(queryString).closest("tr").removeClass("ux-tabl-selected");
						}
					});
					
					var adjustedRowIndex = 0;
					$(this).find("tbody > tr").each( function(rowIndex, rowElement) {
						if ( !$(this).hasClass("ux-tabl-expandable-row-child") ) {
							$(this).attr("id", uniqueTableId + "-row-" + adjustedRowIndex);
							++adjustedRowIndex;
						} 
						else {
							--adjustedRowIndex;
							var newClass = uniqueTableId + "-row-" + adjustedRowIndex + "-child";
							$(this).addClass(newClass);
							++adjustedRowIndex;
						}
						
						// Set name/value on select checkboxes, if any exist.
						$(this).find("td :checkbox").first().each( function(checkboxIndex, checkboxElement) {
							$(this).attr({
								name: uniqueTableId + "-select-cb",
								value: uniqueTableId + "-select-cb-" + rowIndex
							});
							$(this).on("click", function(event) {
								if ($(this).attr("checked")) {
									$(this).closest("tr").addClass("ux-tabl-selected");	
								} else {
									$(this).closest("tr").removeClass("ux-tabl-selected");	
								}
							});
						});
					});
					
					// Expandable rows
					$(this).find(".ux-tabl-expandable-row").each( function(adjRowIndex, expandableRow) {
						expandableRow = $(expandableRow);
						var thisRowId = $(this).attr("id");
						var $expandCollapseIcon = $(this).find("td:first-child > a:first-child");
						$expandCollapseIcon.on("click", function(event) {
							var childRowClass = "." + thisRowId + "-child";
							if (expandableRow.hasClass("ux-tabl-expandable-row-expanded")) {
								expandableRow.removeClass("ux-tabl-expandable-row-expanded");
								$(childRowClass).removeClass("ux-tabl-expandable-row-child-expanded");
							}
							else {
								expandableRow.addClass("ux-tabl-expandable-row-expanded");
								$(childRowClass).addClass("ux-tabl-expandable-row-child-expanded");
								if (expandableRow.hasClass("ux-tabl-alt-row")) {
									$(childRowClass).addClass("ux-tabl-alt-row");	
								}
							}
						});
					});
					
					// Editable cells
					$(this).find(".ux-icon-edit").on("click", function(event) {
						
						var $thisRow = $(this).closest("tr");
						var $tdsInRow = $thisRow.find("td");
						var thisRowId = $thisRow.attr("id");
						
						// Switch this icon to the save changes/cancel pair.
						var $saveIcon = $('<a title="Confirm" class="ux-icon-confirm" href="#">Confirm</a>');
						var $cancelIcon = $('<a title="Cancel" class="ux-icon-cancel" href="#">Cancel</a>');
						$saveIcon.insertAfter(this);
						$cancelIcon.insertAfter($saveIcon);
						$(this).hide();
						
						// Change each entry to an input field with the cell contents as the value.
						for (var i=0; i<$tdsInRow.length-1; i++) {
							
							var $thisCell = $tdsInRow.eq(i);
							
							if ($thisCell.find("input").length == 0) {
								var textInThisCell = $thisCell.text();
								if ($.trim(textInThisCell) != "" &&
									textInThisCell.indexOf("Expand") == -1) 
								{
									var $span = $("<span></span>");
									$span.html( $thisCell.html() );
									$span.hide();
									$thisCell.empty();
									$thisCell.append( $span );
									var $newInput = $('<input type="text" />');
									$newInput.val(textInThisCell);
									var thisId = thisRowId + "-col-" + i;
									$newInput.attr("id", thisId);
									$newInput.appendTo($thisCell);
								}
							}
						}
						
						// Add event handlers to the save changes/cancel buttons.
						$tdsInRow.find(".ux-icon-confirm").on("click", function(event) {
							$tdsInRow.each( function(tdIndex, tdElement) {
								var $span = $(this).find("span");
								if ($span.length>0) {
									var $nestedA = $span.find("a");
									if ($nestedA.length>0) {
										$nestedA.html( $(this).find("input").val() );
										$(this).html( $nestedA );
									} else {
										$(this).html( $(this).find("input").val() );	
									}
								}
							});
							$(this).hide();
							$tdsInRow.find(".ux-icon-cancel").hide();
							$tdsInRow.find(".ux-icon-edit").show();
							var $confirmMessage = $('<div class="ux-msg-success ux-util-inline-block ux-margin-none">Edit confirmed.</div>');
							$confirmMessage.css({
								"position": "fixed",
								"left": $(window).width()*0.5 - ($confirmMessage.outerWidth()),
								"top": $(window).height()*0.5 - ($confirmMessage.outerHeight()),
								"z-index": 1,
								"opacity": 0
							});
							$("body").prepend($confirmMessage);
							$confirmMessage.animate({
								opacity: 1
							}, 500, function() {
								$confirmMessage.animate({
										opacity: 1
									}, 3000, function() {
									$confirmMessage.animate({
										opacity: 0	
									}, 1000);
								});
							}
							);
							event.preventDefault();
						});
						$tdsInRow.find(".ux-icon-cancel").on("click", function(event) {
							$tdsInRow.each( function(tdIndex, tdElement) {
								var $span = $(this).find("span");
								if ($span.length>0) {
									$span.siblings().remove();
									$(this).append( $span.html() );
									$span.remove();
								}
							});
							$(this).hide();
							$tdsInRow.find(".ux-icon-confirm").hide();
							$tdsInRow.find(".ux-icon-edit").show();
							var $cancelMessage = $('<div class="ux-msg-error ux-util-inline-block ux-margin-none">Edit cancelled.</div>');
							$cancelMessage.css({
								"position": "fixed",
								"left": $(window).width()*0.5 - ($cancelMessage.outerWidth()),
								"top": $(window).height()*0.5 - ($cancelMessage.outerHeight()),
								"z-index": 1,
								"opacity": 0
							});
							$("body").prepend($cancelMessage);
							$cancelMessage.animate({
								opacity: 1
							}, 500, function() {
								$cancelMessage.animate({
										opacity: 1
									}, 3000, function() {
									$cancelMessage.animate({
										opacity: 0	
									}, 1000);
								});
							}
							);
							event.preventDefault();
						});
						
						event.preventDefault();
					});
					
				});
			},
			
			
			paginationTable: function() {
				// Enables pagination for tables
				
				function paginate(component) {
					// component = jQuery object (table's parent component container)	
					
					// For each table with pagination
					/*
						1. Find
							- # records to display
							- # total records
							- page number
							- total pages
					*/
					
					var $comp = $(component);
					var $tbody = $comp.find("tbody").first();
					
					$comp.find(".ux-comp-table-hidden-row").removeClass("ux-comp-table-hidden-row");
					
					var $recToDisplayField = $comp.find(".ux-pagi-records-to-display").first();
					var recordsToDisplay = $recToDisplayField.find("option:selected").first().text();
					recordsToDisplay = ($.isNumeric(recordsToDisplay)) ? Number(recordsToDisplay) : "All";
					
					var $totalRecordsField = $comp.find(".ux-pagi-total-records").first();
					var totalRecords = $tbody.children("tr:not('.ux-tabl-expandable-row-child')").length;
					totalRecords = Number(totalRecords);
					$totalRecordsField.html( totalRecords );
					
					var $pageNumberField = $comp.find(".ux-pagi-current-page").first();
					var pageNumber = Number($pageNumberField.val());
					
					var $totalPagesField = $comp.find(".ux-pagi-total-pages").first();
					var totalPages = (recordsToDisplay == "All") ? 1 : Math.ceil(totalRecords / recordsToDisplay);
					$totalPagesField.html(totalPages);
					
					/*
						2. Hide leading records
					*/
					
					if (pageNumber != 1 && recordsToDisplay != "All") {
						for (var i=0; i<(pageNumber-1)*recordsToDisplay; i++) {
							var $row = $tbody.children("tr:not('.ux-tabl-expandable-row-child')").eq(i);
							$row.addClass("ux-comp-table-hidden-row");
							// Also hide the row's expanded child rows (they'll have a class that matches the row's id + the "-child" suffix)
							if ($row.hasClass("ux-tabl-expandable-row-expanded")) {
								var childRowClassName = "." + $row.attr("id") + "-child";
								$tbody.children(childRowClassName).addClass("ux-comp-table-hidden-row");
							}
						}
					}
					
					/* 
						3. Hide trailing records 
					*/
					
					if (pageNumber < totalPages && recordsToDisplay != "All") {
						for (var i = (pageNumber * recordsToDisplay); i<totalRecords; i++) {
							var $row = $tbody.children("tr:not('.ux-tabl-expandable-row-child')").eq(i);
							$row.addClass("ux-comp-table-hidden-row");
							// Also hide the row's expanded child rows (they'll have a class that matches the row's id + the "-child" suffix)
							if ($row.hasClass("ux-tabl-expandable-row-expanded")) {
								var childRowClassName = "." + $row.attr("id") + "-child";
								$tbody.children(childRowClassName).addClass("ux-comp-table-hidden-row");
							}
						}
					}
					
					/*
						4. Set up event handlers
					*/
					$comp.find(".ux-pagi-next").on( "click.ux-pagi", function(event) {
						if (pageNumber < totalPages) {
							++pageNumber;
							$pageNumberField.val(pageNumber);
							$comp.find("a").off( "click.ux-pagi" );
							paginate( $comp );
						}
						event.preventDefault();
					});
					$comp.find(".ux-pagi-last").on( "click.ux-pagi", function(event) {
						if (pageNumber != totalPages) {
							pageNumber = totalPages;
							$pageNumberField.val(pageNumber);
							$comp.find("a").off( "click.ux-pagi" );
							paginate( $comp );
						}
						event.preventDefault();
					});				
					$comp.find(".ux-pagi-prev").on( "click.ux-pagi", function(event) {
						if (pageNumber > 1) {
							--pageNumber;
							$pageNumberField.val(pageNumber);
							$comp.find("a").off( "click.ux-pagi" );
							paginate( $comp );
						}
						event.preventDefault();
					});
					$comp.find(".ux-pagi-first").on( "click.ux-pagi", function(event) {
						if (pageNumber != 1) {
							pageNumber = 1;
							$pageNumberField.val(pageNumber);
							$comp.find("a").off( "click.ux-pagi" );
							paginate( $comp );
						}
						event.preventDefault();
					});
					
				
					// Handler for change of number of records to display
					$comp.find(".ux-pagi-records-to-display").on("change.ux-pagi", function(event) {
						$pageNumberField.val(1);
						$comp.find(".ux-pagi-records-to-display").off("change.ux-pagi");
						paginate( $(event.target).parents(".ux-comp-table").first() );
					});
					
				} // end paginate
				
				
				$(".ux-tabl-has-pagination").each( function(index, element) {
					paginate( $(element).closest(".ux-comp-table") );					
				});
							
			},
			
			
			initializeHeader: function() {
				// Add event handlers to header
				
				$(".ux-head").each( function(index, element) {
					
					if (touchInterface) {

						$(".ux-pnav > li > a").on("touchstart", function(event) {
							if ($(this).parent("li").hasClass("ux-pnav-active") ||
								$(this).parent("li").hasClass("ux-pnav-submenu-open")) {
									$(".ux-pnav-active").removeClass("ux-pnav-active ux-pnav-submenu-open ux-pnav-hover");
									$(".ux-pnav-submenu-open").removeClass("ux-pnav-active ux-pnav-submenu-open ux-pnav-hover");
									event.preventDefault();
								}
							else {
								$(this).parents("li").siblings("li").removeClass("ux-pnav-active ux-pnav-submenu-open ux-pnav-hover");
								$(this).parents("li").removeClass("ux-pnav-active ux-pnav-hover");
								$(this).parent("li").addClass("ux-pnav-active ux-pnav-hover");
								if ( $(this).parent("li").hasClass("ux-pnav-has-submenu") ) {
									$(this).parents("li").addClass("ux-pnav-submenu-open");
									event.preventDefault();
								}
							}
						});						
							$(".ux-pnav li li a").on("touchstart", function(event) {
								$(this).parents("li").siblings("li").removeClass("ux-pnav-active ux-pnav-submenu-open ux-pnav-hover");
								$(this).parents("li").removeClass("ux-pnav-active ux-pnav-hover");
								$(this).parent("li").addClass("ux-pnav-active");
								if ( $(this).parent("li").hasClass("ux-pnav-has-submenu") ) {
									$(this).parent("li").toggleClass("ux-pnav-submenu-open");
									event.preventDefault();
								}
							});
						
						$(".ux-unav > li > a").on("touchstart", function(event) {
							if ($(this).parent("li").hasClass("ux-unav-active") ||
								$(this).parent("li").hasClass("ux-unav-submenu-open")) {
									$(".ux-unav-active").removeClass("ux-unav-active ux-unav-submenu-open");
									$(".ux-unav-submenu-open").removeClass("ux-unav-active ux-unav-submenu-open");
									event.preventDefault();
								}
							else {
								$(this).parents("li").siblings("li").removeClass("ux-unav-active ux-unav-submenu-open ux-unav-hover");
								$(this).parents("li").removeClass("ux-unav-active ux-unav-hover");
								$(this).parent("li").addClass("ux-unav-active ux-unav-hover");
								if ( $(this).parent("li").hasClass("ux-unav-has-submenu") ) {
									$(this).parents("li").addClass("ux-unav-submenu-open");
									event.preventDefault();
								}
							}
						});						
							$(".ux-unav li li a").on("touchstart", function(event) {
								$(this).parents("li").siblings("li").removeClass("ux-unav-active ux-unav-submenu-open ux-unav-hover");
								$(this).parents("li").removeClass("ux-unav-active ux-unav-hover");
								$(this).parent("li").addClass("ux-unav-active");
								if ( $(this).parent("li").hasClass("ux-unav-has-submenu") ) {
									$(this).parent("li").toggleClass("ux-unav-submenu-open");
									event.preventDefault();
								}
							});
						
						$(document).on("touchstart", function(event) {
							if ( !$(event.target).is(".ux-pnav li a") ) {
								$(".ux-pnav-active").removeClass("ux-pnav-active");
								$(".ux-pnav-submenu-open").removeClass("ux-pnav-submenu-open");
								$(".ux-pnav-hover").removeClass("ux-pnav-hover");
							}
							if ( !$(event.target).is(".ux-unav li a") && !$(event.target).is(".ux-unav li span") ) {
								$(".ux-unav-active").removeClass("ux-unav-active");
								$(".ux-unav-submenu-open").removeClass("ux-unav-submenu-open");
								$(".ux-unav-hover").removeClass("ux-unav-hover");
							}
						});
						
						/* Notifications Drop-Down */
						$(".ux-ntfy tr").on("touchstart", function(event) {
							if ( $(event.target).parents("tr").find("td").length > 0  &&  $(event.target).parents("tr").find("a").length > 0 ) {
								window.location = $(event.target).parents("tr").find("a").first().attr("href");
							}
						});
												
					} else {
						
						$(".ux-unav > li").on("mouseover", function(event) {
							$(this).parents("li").removeClass("ux-unav-hover");
							$(this).addClass("ux-unav-hover");
						});
							$(".ux-unav li li").on("mouseover", function(event) {
								$("ux-unav-hover").removeClass("ux-unav-hover");
								$(this).siblings("li").removeClass("ux-unav-submenu-open");
								$(this).addClass("ux-unav-hover");
								if ( $(this).hasClass("ux-unav-has-submenu") ) {
									$(this).addClass("ux-unav-submenu-open");	
								}
							});
						
						$(".ux-unav li").on("mouseout", function(event) {
							$(this).removeClass("ux-unav-hover");
							$(this).removeClass("ux-unav-active");
						});
						
						$(".ux-unav > li > a").on("click", function(event) {
							if ($(this).parent("li").hasClass("ux-unav-active") ||
								$(this).parent("li").hasClass("ux-unav-submenu-open")) {
									$(".ux-unav-active").removeClass("ux-unav-active ux-unav-submenu-open");
									$(".ux-unav-submenu-open").removeClass("ux-unav-active ux-unav-submenu-open");
									//$(this).parent("li").addClass("ux-unav-active");
									event.preventDefault();
								}
							else {
								$(this).parents("li").siblings("li").removeClass("ux-unav-active ux-unav-submenu-open ux-unav-hover");
								$(this).parents("li").removeClass("ux-unav-active ux-unav-submenu-open ux-unav-hover");
								$(this).parent("li").addClass("ux-unav-active ux-unav-submenu-open");
								if ( $(this).parent("li").hasClass("ux-unav-has-submenu") ) {
									$(this).parent("li").parents("li").addClass("ux-unav-submenu-open");
									event.preventDefault();
								}
							}
						});						
							$(".ux-unav li li a").on("click", function(event) {
								$(this).parent("li").parents("li").siblings("li").removeClass("ux-unav-active ux-unav-submenu-open ux-unav-hover");
								$(this).parent("li").parents("li").removeClass("ux-unav-active ux-unav-submenu-open ux-unav-hover");
								$(this).parent("li").toggleClass("ux-unav-active");
								if ( $(this).parent("li").hasClass("ux-unav-has-submenu") ) {
									$(this).parent("li").toggleClass("ux-unav-submenu-open");
									$(this).parent("li").parents("li").addClass("ux-unav-submenu-open");
									event.preventDefault();
								}
							});
						
						var $lastFocusedNavItem, $lastFocusedNotificationRow;
						
						$(".ux-unav li > a, .ux-pnav li > a, .ux-vnav li > a, .ux-snav li > a").on("focus", function(event) {
							var $this = $(this);
							$this.on("blur", function(e) {
								$lastFocusedNavItem = $this;
							});
						});
						
						$(".ux-unav .ux-ntfy a").on("focus", function(event) {
							var $this = $(this);
							var $dad = $(this).parents("tr").first();
							
							$dad.addClass("ux-ntfy-focus");
							
							$this.on("blur", function(e) {
								$lastFocusedNotificationRow = $this.parents("tr").first();
								$dad.removeClass("ux-ntfy-focus");
							});
						});
						
						$("*").on("focus", function(event) {
							var $this = $(this);
							
							// *nav handler (not notifications table)
							if ($lastFocusedNavItem) {
								
								// My name is This. My dad's name is Li, my grandpa's name is Ul, and my great-grandpa's name is Li.
								// This guy $lastFocusedNavItem and I might be related.
								var $dadLi = $this.parent("li");
								var $grampsUl = $dadLi.parent("ul");
								var $greatGrampsLi = $grampsUl.parent("li");
								var $hisDadLi = $lastFocusedNavItem.parent("li");
								var $hisGrampsUl = $hisDadLi.parent("ul");
								var $hisGreatGrampsLi = $hisGrampsUl.parent("li");
								var $hisGreatGreatGrampsUl = $hisGreatGrampsLi.parent("ul");
								if (($this.parents(".ux-unav, .ux-pnav, .ux-vnav, .ux-snav").length > 0) &&
									$grampsUl &&
									$hisGrampsUl &&
									$grampsUl.text() == $hisGrampsUl.text()) {
										// this is a sibling of lastFocusedNavItem
										$hisDadLi.removeClass("ux-unav-submenu-open ux-pnav-submenu-open ux-snav-submenu-open us-vnav-submenu-open ux-unav-active ux-pnav-active ux-snav-active ux-vnav-active");
								} else {
									// this is NOT a sibling of lastFocusedNavItem
									if ( $greatGrampsLi.text() == $hisDadLi.text() ) {
										// this is a CHILD of lastFocusedNavItem
									} else {
										// this is NEITHER a child nor a sibling of lastFocusedNavItem
										if (!$lastFocusedNavItem.siblings(".ux-ntfy").length > 0) {
											$lastFocusedNavItem.parents(".ux-unav-submenu-open, .ux-pnav-submenu-open, .ux-vnav-submenu-open, .ux-snav-has-submenu.ux-snav-hover").first().removeClass("ux-unav-submenu-open ux-unav-active ux-pnav-submenu-open ux-pnav-active ux-vnav-submenu-open ux-snav-submenu-open ux-snav-hover ux-snav-active");
											// If this is not lastFocusedNavItem's uncle you should repeat the previous step
											if ( $hisGreatGreatGrampsUl &&
												$grampsUl.text() != $hisGreatGreatGrampsUl.text() ) {
												$lastFocusedNavItem.parents(".ux-unav-submenu-open, .ux-pnav-submenu-open, .ux-vnav-submenu-open, .ux-snav-submenu-open, .ux-snav-has-submenu.ux-snav-hover").removeClass("ux-unav-submenu-open ux-unav-active ux-pnav-submenu-open ux-pnav-active ux-vnav-submenu-open ux-snav-submenu-open ux-snav-hover ux-snav-active");
											}
										}
									}
								}
							}
							
							// unav notifications table handler
							if ($lastFocusedNotificationRow) {
								if ($this.parents(".ux-ntfy").length > 0) {
									// This is also in the notifications table.	
								} else {
									// This is not in the notifications table.
									$(".ux-ntfy").parents("li.ux-unav-submenu-open").removeClass("ux-unav-active ux-unav-submenu-open");
								}
							}
							
						});
												
						$(document).click( function(event) {
							if ( !$(event.target).is(".ux-unav li a") && !$(event.target).is(".ux-unav li span") ) {
								$(".ux-unav-active").removeClass("ux-unav-active");
								$(".ux-unav-submenu-open").removeClass("ux-unav-submenu-open");
							}
						});
						
						$(".ux-pnav > li").on("mouseover", function(event) {
							$(this).parents("li").removeClass("ux-pnav-hover");
							$(this).addClass("ux-pnav-hover");
						});
							$(".ux-pnav li li").on("mouseover", function(event) {
								$("ux-pnav-hover").removeClass("ux-pnav-hover");
								$(this).siblings("li").removeClass("ux-pnav-submenu-open");
								$(this).addClass("ux-pnav-hover");
								if ( $(this).hasClass("ux-pnav-has-submenu") ) {
									$(this).addClass("ux-pnav-submenu-open");	
								}
							});
						
						$(".ux-pnav li").on("mouseout", function(event) {
							$(this).removeClass("ux-pnav-hover");
							$(this).removeClass("ux-pnav-active");
						});
						
						$(".ux-pnav > li > a").on("click", function(event) {
							if ($(this).parent("li").hasClass("ux-pnav-active") ||
								$(this).parent("li").hasClass("ux-pnav-submenu-open")) {
									event.preventDefault();
									$(".ux-pnav-active").removeClass("ux-pnav-active ux-pnav-submenu-open");
									$(".ux-pnav-submenu-open").removeClass("ux-pnav-active ux-pnav-submenu-open");
									//$(this).parent("li").addClass("ux-pnav-active");
								}
							else {
								$(this).parents("li").siblings("li").removeClass("ux-pnav-active ux-pnav-submenu-open ux-pnav-hover");
								$(this).parents("li").removeClass("ux-pnav-active ux-pnav-submenu-open ux-pnav-hover");
								$(this).parent("li").addClass("ux-pnav-active ux-pnav-submenu-open");
								if ( $(this).parent("li").hasClass("ux-pnav-has-submenu") ) {
									event.preventDefault();
									$(this).parent("li").parents("li").addClass("ux-pnav-submenu-open");
								}
							}
						});						
							$(".ux-pnav li li a").on("click", function(event) {
								$(this).parent("li").parents("li").siblings("li").removeClass("ux-pnav-active ux-pnav-submenu-open ux-pnav-hover");
								$(this).parent("li").parents("li").removeClass("ux-pnav-active ux-pnav-submenu-open ux-pnav-hover");
								$(this).parent("li").toggleClass("ux-pnav-active");
								if ( $(this).parent("li").hasClass("ux-pnav-has-submenu") ) {
									event.preventDefault();
									$(this).parent("li").toggleClass("ux-pnav-submenu-open");
									$(this).parent("li").parents("li").addClass("ux-pnav-submenu-open");
								}
							});
												
						$(document).click( function(event) {
							if ( !$(event.target).is(".ux-pnav li a") ) {
								$(".ux-pnav-active").removeClass("ux-pnav-active");
								$(".ux-pnav-submenu-open").removeClass("ux-pnav-submenu-open");
								$(".ux-pnav-hover").removeClass("ux-pnav-hover");
							}
						});
						
						/* Notifications Drop-Down */
						$(".ux-ntfy tr").on("click", function(event) {
							if ( $(event.target).parents("tr").find("td").length > 0  &&  $(event.target).parents("tr").find("a").length > 0 ) {
								window.location = $(event.target).parents("tr").find("a").first().attr("href");
							}
						});
						
					}
										
				});
				
			},
			
			
			initializeSecondaryHorizontalNav: function() {
				// Add event handlers to secondary horizontal navigation
				
				$(".ux-snav").each( function(index, element) {
					
					// Make sure there is a ux-snav-has-submenu class on the correct elements.
					$(".ux-snav li").each( function(idx, el) {
						if ( $(el).children("ul").length > 0 ) {
							$(el).addClass("ux-snav-has-submenu");	
						}
					});
					
					// Make any drop-down menus at least as wide as the parent tab
					$(".ux-snav > li").each( function(idx, el) {
						var adjustment = $(el).hasClass("ux-snav-selected") ? 2 : 0;
						var parentWidth = $(el).innerWidth()-adjustment + "px";
						var childWidth = $(el).children("ul").children("li").children("a").css("min-width", parentWidth);
					});
					
					if (touchInterface) {
						
						$(".ux-snav li a").on("touchstart", function(event) {
							if ( !$(this).parents("li").hasClass("ux-snav-disabled") ) {
								$(this).parents("li").siblings("li").removeClass("ux-snav-hover");
								$(this).parents("li").siblings("li").removeClass("ux-snav-active");
								$(this).parents("li").addClass("ux-snav-hover");
								$(this).parents("li").addClass("ux-snav-active");
								if ( $(this).parent("li").hasClass("ux-snav-has-submenu") ) {
									event.preventDefault();
								}
							} else {
								event.preventDefault();
							}
						});
						
						$(document).on("touchstart", function(event) {
							if ( !$(event.target).is(".ux-snav li a") ) {
								$(".ux-snav-hover").removeClass("ux-snav-hover");
								$(".ux-snav-active").removeClass("ux-snav-active");
							}
						});
												
					} else {
						
						// Note about mouseover and mouseout functions below: it's done this less intuitive way because IE was flickering when going between lis.
						$(".ux-snav li").on("mouseover", function(event) {
							$(this).addClass("ux-snav-hover");
							$(this).siblings("li").removeClass("ux-snav-hover");
						});
						
						$(".ux-snav").on("mouseout", function(event) {
							$(".ux-snav-hover").removeClass("ux-snav-hover");
							$(".ux-snav-active").removeClass("ux-snav-active"); 
						});

						// Automatic close of sub-menus when focus-on a sibling:
						$(".ux-snav li").on("focusin", function(event) {
							$(this).siblings("li").removeClass("ux-snav-hover");
							$(this).siblings("li").removeClass("ux-snav-active");
						});
	
						$(".ux-snav li a").on("click", function(event) {
							if ( !$(this).parents("li").hasClass("ux-snav-disabled") ) {
								$(this).parents("li").siblings("li").removeClass("ux-snav-active");
								$(this).parent("li").addClass("ux-snav-active");
								if ( $(this).parent("li").hasClass("ux-snav-has-submenu") ) {
									if ( $(this).parent("li").hasClass("ux-snav-hover") ) {
										$(this).parent("li").removeClass("ux-snav-hover");
										$(this).parent("li").removeClass("ux-snav-active");
									}
									else {
										$(this).parent("li").addClass("ux-snav-hover");
									}

									event.preventDefault();
								}
							} else {
								event.preventDefault();
							}
						});
												
						$(document).click( function(event) {
							if ( !$(event.target).is(".ux-snav li a") ) {
								$(".ux-snav-active").removeClass("ux-snav-active");
							}
						});
						
					}
										
				});
				
			},
			
			
			initializeVerticalNavigation: function() {
				// Add event handlers to vertical navigation
				
				$(".ux-vnav").each( function(index, element) {
					
					// Add the has-selected class if necessary
					$(this).find(".ux-vnav-selected").parents("li").addClass("ux-vnav-has-selected");
					
					// Add submenu classes if they don't already exist
					$(this).children("li").each( function(lii, li) {
						var $li = $(li);
						if ( $li.find("ul").length > 0 ) {
							// This list item has a submenu
							if ( $li.hasClass("ux-vnav-submenu-open") || $li.hasClass("ux-vnav-submenu-closed") ) {
								// This list item already has a submenu state defined, so leave it alone	
							} else {
								// This list item needs a submenu state defined
								if ( $li.find(".ux-vnav-selected").length > 0 ) {
									// li contains the selected item, so make it open by default
									$li.addClass("ux-vnav-submenu-open");	
								} else {
									$li.addClass("ux-vnav-submenu-closed");	
								}
							}
						}
					});
					
					if (touchInterface) {
						
						var timeoutId;
						
						$(".ux-vnav li > a").on("touchstart", function(event) {
							if ( !$(this).parents("li").hasClass("ux-vnav-disabled") ) {
								$(element).find("li").removeClass("ux-vnav-active");
								$(this).parent("li").addClass("ux-vnav-active");
								
								function fadeOut() { $parentLI.removeClass("ux-vnav-active") };
									var timeoutId = window.setTimeout(
											fadeOut,
											500
								);
								
							} else {
								event.preventDefault();
							}
						});
												
						$(document).on("touchstart", function(event) {
							if ( !$(event.target).is(".ux-vnav li > a") ) {
								$(".ux-vnav-active").removeClass("ux-vnav-active");
							}
						});
												
					} else {
						
						$(".ux-vnav li a").on("mouseover", function(event) {
							if ( !$(this).parents("li").hasClass("ux-vnav-disabled") ) {
								$(this).parent("li").toggleClass("ux-vnav-hover");
							}
						});
						
						$(".ux-vnav li a").on("mouseout", function(event) {
							$(this).parent("li").removeClass("ux-vnav-hover ux-vnav-active");
						});
						
						$(".ux-vnav li > a").on("click", function(event) {
							if ( !$(this).parents("li").hasClass("ux-vnav-disabled") ) {
								$(element).find("li").removeClass("ux-vnav-active");
								$(this).parent("li").addClass("ux-vnav-active");
				
								//return false;
							} else {
								event.preventDefault();
							}
						});
												
						$(document).click( function(event) {
							if ( !$(event.target).is(".ux-vnav li > a") ) {
								$(".ux-vnav-active").removeClass("ux-vnav-active");
							}
						});
						
					}
										
				});
				
			},
			
			
			initializeTabbedPanels: function() {
				// Add event handlers to tabbed panels
				
				$(".ux-tpnl").each( function(index, element) {
					
					// Initialize ARIA attributes
					var idPrefix = "tpnl" + index;
					var $ul = $(this).find("ul").first();
					$ul.attr({
						"id": idPrefix,
						"role": "tablist"
					});
					$ul.children("li").each( function(liIndex, thisLi) {
						var $li = $(thisLi);
						$li.attr("role", "presentation");
						var isSelected = ($li.hasClass("ux-tpnl-selected")) ? true : false;
						var aId = idPrefix + "-" + liIndex;
						var contentId = aId + "-content";
						$li.children("div:first").attr({
							"id": contentId,
							"role": "tabpanel",
							"aria-labelledby": aId,
							"aria-hidden": (!isSelected),
							"aria-expanded": isSelected
						});
						$li.children("a:first").attr({
							"id": aId,
							"role": "tab",
							"aria-selected": isSelected,
							"aria-expanded": isSelected,
							"aria-controls": contentId
						});
						// Focus anchor added to content
						var $focusAnchor = $('<span class="ux-a11y-hidden" tabindex="-1"></span>')
						$focusAnchor.html( $("#" + aId).text() );
						$focusAnchor.prependTo( $("#" + contentId) );
					});
					
					// Set the content pane initially to the selected tab's content.
					$(this).children("div.ux-tpnl-content").replaceWith( 
						$(this).find("li.ux-tpnl-selected > div").addClass("ux-tpnl-content") 
					);
						
					// Make sure the content panel's minimum width is always at least as wide as the tabs.
					var tabWidth = 0;
					var $lis = $(this).children("ul").children("li");
					for (var i=0; i<$lis.length; i++) {
						tabWidth += $lis.eq(i).innerWidth();	
					}
					$(this).children("div.ux-tpnl-content").css("min-width", tabWidth);
					
					
					
					if (touchInterface) {
						
						var timeoutId;
						
						$(".ux-tpnl > ul > li > a").on("touchstart", function(event) {
							if ( !$(this).parents("li").hasClass("ux-tpnl-disabled") ) {
								// First move the existing selected content back to its tab.
								$(element).find("li.ux-tpnl-selected").append(
									$(element).find("div.ux-tpnl-content").removeClass("ux-tpnl-content")
								);
								$(this).parents("li").siblings("li").removeClass("ux-tpnl-selected ux-tpnl-active");
								$(this).parents("li").addClass("ux-tpnl-selected ux-tpnl-active");
								var $parentLI = $(this).parent("li");
								function fadeOut() { $parentLI.removeClass("ux-tpnl-active") };
								timeoutId = window.setTimeout(
										fadeOut,
										500
									);
								$(element).append(
									$(this).siblings("div").addClass("ux-tpnl-content")
								);
							} 
							event.preventDefault();
						});
						
						$(document).on("touchstart", function(event) {
							if ( !$(event.target).is(".ux-tpnl > ul > li > a") ) {
								$(".ux-tpnl-active").removeClass("ux-tpnl-active");
							}
						});
												
					} else {
						// Desktop interface
						$(".ux-tpnl > ul > li").on("mouseover", function(event) {
							$(this).siblings("li").removeClass("ux-tpnl-hover");
							$(this).addClass("ux-tpnl-hover");
						});
						
						$(".ux-tpnl > ul > li").on("mouseout", function(event) {
							$(this).removeClass("ux-tpnl-hover ux-tpnl-active");
						});
						
						$(".ux-tpnl > ul > li > a").on("blur", function(event) {
							$(this).parent("li").removeClass("ux-tpnl-hover ux-tpnl-active");
						});
						
						$(".ux-tpnl > ul > li > a").on("click", function(event) {
							event.preventDefault();
							if ( !$(this).parents("li").hasClass("ux-tpnl-disabled") ) {
								
								// First move the existing selected content back to its tab.
								$(element).find("li.ux-tpnl-selected").append(
									$(element).find("div.ux-tpnl-content").removeClass("ux-tpnl-content").attr({
										"aria-hidden": "true",
										"aria-expanded": "false"
									})
								);
								
								// Update the aria values on both the previously selected tab and the newly selected one
								$(element).find("li.ux-tpnl-selected").find("a:first").attr({
									"aria-selected": "false",
									"aria-expanded": "false"
								});
								
								$(this).attr({
									"aria-selected": "true",
									"aria-expanded": "true"
								});
								
								// Reset tab index
								$(element).find("li > a").removeAttr("tabindex");
								
								// Update tab status
								$(this).parents("li").siblings("li").removeClass("ux-tpnl-selected ux-tpnl-active");
								$(this).parent("li").addClass("ux-tpnl-selected ux-tpnl-active");
								
								// Update content
								$(element).append(
									$(this).siblings("div").addClass("ux-tpnl-content").attr({
										"aria-hidden": "false",
										"aria-expanded": "true"
									})
								);
								
								// Set focus to the hidden anchorFocus
								$(element).find(".ux-tpnl-content > .ux-a11y-hidden:first").focus();
							} 
						});
												
						$(document).click( function(event) {
							if ( !$(event.target).is(".ux-tpnl > ul > li > a") ) {
								$(".ux-tpnl-active").removeClass("ux-tpnl-active");
							}
						});
						
					}
										
				});
				
			},
			
			
			initializeTrees: function() {
				// Add event handlers to tree components
				
				$(".ux-tree").each( function(index, element) {
					
					$(this).find("li").each ( function(idx, emt) {
						if ($(this).find("ul").length > 0) {
							$(this).addClass("ux-tree-has-submenu");
						}
					});
					
					// Desktops use click!				
					$(this).find("li.ux-tree-has-submenu > a").on("click", function(event) {
						$(this).parent("li").toggleClass("ux-tree-has-submenu-open");
						if ( $(this).parent("li").hasClass("ux-tree-has-submenu-open") ) {
							$(this).siblings("ul").slideDown( "fast" );
						} else {
							$(this).siblings("ul").slideUp( "fast" );
						}
						event.stopImmediatePropagation();
						event.preventDefault();
					});

					// Tablets use touch!				
					$(this).find("li.ux-tree-has-submenu > a").on("touchstart", function(event) {
						$(this).parent("li").toggleClass("ux-tree-has-submenu-open");
						if ( $(this).parent("li").hasClass("ux-tree-has-submenu-open") ) {
							$(this).siblings("ul").slideDown( "fast" );
						} else {
							$(this).siblings("ul").slideUp( "fast" );
						}
						event.stopImmediatePropagation();
						event.preventDefault();
					});
					
				});
				
			},
			
			
			initializeFloatingHeader: function() {
				// This function enables panel headers (like patient records) to remain on screen even after scrolling
				$(".ux-phdr-poc").each( function(index, header) {
					
					var floatingHeadEnabled = false;
					
					// Set-up for floating page head option
					if ( $(this).hasClass( "ux-phdr-poc-pin-nav" ) ) {
						floatingHeadEnabled = true;
						$("#ux-wrapper").addClass("ux-wrapper-fixed");
					}
					
					// Event handlers for the tabs
					$(this).find( ".ux-phdr-header-tabs > li" ).each( function( tabsetIndex, tabsElement ) {
						$(this).on( "mouseover", function( event ) {
							$(this).siblings( "li" ).removeClass( "ux-phdr-header-tabs-focus ux-phdr-header-tabs-active" );
							$(this).addClass( "ux-phdr-header-tabs-hover" );
						});
						$(this).on( "mouseout", function( event ) {
							$(this).removeClass( "ux-phdr-header-tabs-hover" );
						});
					});
					
					$(this).find( ".ux-phdr-header-tabs > li > a" ).each( function( tabsetIndex, tabsElement ) {
						$(this).on( "focus", function( event ) {
							$(this).parent("li").addClass( "ux-phdr-header-tabs-focus" );
						});
						$(this).on( "blur", function( event ) {
							$(this).parent("li").removeClass( "ux-phdr-header-tabs-focus" );
						});
						$(this).on( "click", function( event ) {
							event.preventDefault();
							$(this).parent("li").siblings("li").removeClass( "ux-phdr-header-tabs-selected ux-phdr-header-tabs-active ux-phdr-header-tabs-hover ux-phdr-header-tabs-focus" );
							$(this).parent("li").addClass( "ux-phdr-header-tabs-selected ux-phdr-header-tabs-active" );
							$(header).find( ".ux-phdr-content" ).removeClass( "ux-util-hidden" );
						});
					});
					
					$(this).find( ".ux-phdr-content-close" ).on( "click", function( event ) {
						event.preventDefault();
						$(header).find(".ux-phdr-header-tabs > li").removeClass( "ux-phdr-header-tabs-selected ux-phdr-header-tabs-active ux-phdr-header-tabs-hover ux-phdr-header-tabs-focus" );
						$(this).parent(".ux-phdr-content").addClass( "ux-util-hidden" );
					});
					
					// Wrap the patient header (which is the whole component) in a new div.
					$(this).wrap( "<div class='ux-phdr-wrapper'></div>" );
					
					var $wrapper = $(this).parent(".ux-phdr-wrapper");
					var $og = $(this).first(".ux-phdr");
					var $clone = $og.clone(true, true);
					var offset = $og.offset();
					var offsetY = offset.top - (floatingHeadEnabled ? 96 : 7);
					var headerWidth = $og.outerWidth();
					var pinned = false;
					
					// Keep the header the same width as it will be once it rejoins the flow of the document.
					$(window).resize( function() {
						// Adjust the offset value. We have to remove visibility:hidden to query that value.
						$clone.removeClass("ux-phdr-hidden-clone");
						$wrapper.innerWidth( $clone.outerWidth() );
						offset = $clone.offset();
						offsetY = offset.top - (floatingHeadEnabled ? 96 : 7);
						$clone.addClass("ux-phdr-hidden-clone");
					});
					
					$(window).scroll( function() {
						var scrollAmount = $(window).scrollTop();
						if (scrollAmount > offsetY) {
							// We've scrolled far enough that the header would be off screen. Pin it.
							$wrapper.addClass("ux-phdr-wrapper-locked");
							/* Add the gradient
							if (!pinned) {
								$wrapper.append('<div class="ux-phdr-overlay"></div>');
								pinned = true;
							}*/
						} else {
							$wrapper.removeClass("ux-phdr-wrapper-locked");
							/* Remove the gradient
							$wrapper.find(".ux-phdr-overlay").remove();
							pinned = false;*/
						}
					});
					
					$wrapper.innerWidth( headerWidth );
					$clone.insertBefore($wrapper);
					// Hide the clone, but let it keep its place in the document flow
					$clone.attr("aria-hidden", "true");
					$clone.addClass("ux-phdr-hidden-clone");
					$og.addClass("ux-phdr-og");
					
				});
				
			},
			
			
			initializeHoverPanels: function() {
				// Add event handlers to hover panels
				
				$(".ux-hovr").each( function(index, element) {
					if( $(this).children( "a" ).length <= 0 ) {
						
							$(this).html('<a href="javascript:// Hover panel access" title="Focus on this link to show hover panel content" class="ux-hovr-helper">' + $(this).html() + '</a>');
						}
					
					// Desktops use click!				
					$(this).on("mouseover", function(event) {
						$(".ux-hovr-show").removeClass("ux-hovr-show");	
						$(this).toggleClass("ux-hovr-show");
						event.stopImmediatePropagation();
					});
					$(this).on("mouseout", function(event) {
						$(".ux-hovr-show").removeClass("ux-hovr-show");
					});

					// keyboards use focus!				
					$(this).on("focusin", function(event) {
						$(".ux-hovr-show").removeClass("ux-hovr-show");	
						$(this).toggleClass("ux-hovr-show");
						event.stopImmediatePropagation();
					});
					$(this).on("focusout", function(event) {
						$(".ux-hovr-show").removeClass("ux-hovr-show");
					});

					// Tablets use touch!				
					$(this).on("touchstart", function(event) {
						$(".ux-hovr-show").removeClass("ux-hovr-show");	
						$(this).toggleClass("ux-hovr-show");
						//event.stopImmediatePropagation();
					});
					$(document).on("touchstart", function(event) {
						$(".ux-hovr-show").removeClass("ux-hovr-show");
					});
					
				});
				
			},

			initializeExpandCollapsePanels: function() {
				// Add event handlers and keyboard access to expand/collapse panels
				// Note: there is separate behavior in the context of an accordion
				$(".ux-panl-open, .ux-panl-closed").each( function(index, element) {
					$(this).children(".ux-panl-header").children("h1, h2, h3, h4").prepend('<a href="javascript:// Open or close panel" title="Open or close panel" class="ux-panl-helper">&nbsp;</a>');

					if (touchInterface) {
						
						$(this).find(".ux-panl-header").on("touchstart", function(event) {
							$(this).closest(".ux-panl-open, .ux-panl-closed").toggleClass('ux-panl-open ux-panl-closed');
							if ( $(this).parents(".ux-acrd").length > 0 ) {
								$(element).siblings(".ux-panl").removeClass("ux-panl-open").addClass("ux-panl-closed");
							}
							event.stopImmediatePropagation();
						});
						$(this).find(".ux-panl-header a").on("touchstart", function(event) {
							$(this).closest(".ux-panl-open, .ux-panl-closed").toggleClass('ux-panl-open ux-panl-closed');
							if ( $(this).parents(".ux-acrd").length > 0 ) {
								$(element).siblings(".ux-panl").removeClass("ux-panl-open").addClass("ux-panl-closed");
							}
							event.stopImmediatePropagation();
						});
						
					} else {

						$(this).find(".ux-panl-header").on("click", function(event) {
							$(this).closest(".ux-panl-open, .ux-panl-closed").toggleClass('ux-panl-open ux-panl-closed');
							if ( $(this).parents(".ux-acrd").length > 0 ) {
								$(element).siblings(".ux-panl").removeClass("ux-panl-open").addClass("ux-panl-closed");
							}
							event.stopImmediatePropagation();
						});
						$(this).find(".ux-panl-header a").on("click", function(event) {
							$(this).closest(".ux-panl-open, .ux-panl-closed").toggleClass('ux-panl-open ux-panl-closed');
							if ( $(this).parents(".ux-acrd").length > 0 ) {
								$(element).siblings(".ux-panl").removeClass("ux-panl-open").addClass("ux-panl-closed");
							}
							event.stopImmediatePropagation();
						});
					
					}
					
					
				});
				
			},
			

			initializeTooltips: function() {
					$(".ux-ttip").each(function() {
					$(this).wrap('<span class="ux-ttip-anchor"></span>');
					var $ttip = $('<span class="ux-ttip-content"></span>').text( $(this).attr("title") );
					$(this).removeAttr("title");
					$(this).closest("span.ux-ttip-anchor").append($ttip);
				});
				
				$(".ux-ttip-anchor").on("mouseover", function(ev) {
					var $content = $(this).find(".ux-ttip-content");
					var wrapWidth = $("#ux-wrapper").width() - ev.pageX - $(this).width() - 50;
					$content.css("white-space","nowrap");
					if ( wrapWidth < $content.width() ) {
						$content.width(wrapWidth);	
					}
					$content.css("white-space","normal");
					$content.show();
					
				});
				
				$(".ux-ttip-anchor").on("mouseout", function(ev) {
					$(this).find(".ux-ttip-content").hide();
				});	
			},
			

			initializeFileUpload: function() {
				// First fetch blueimp's stuff
				$.getScript( "http://uitoolkit.optum.com/uimf2/js/file-upload/vendor/jquery.ui.widget.js", function( data, textStatus, jqxhr ) {
					$.getScript( "http://uitoolkit.optum.com/uimf2/js/file-upload/jquery.iframe-transport.js", function( data, textStatus, jqxhr ) {
						$.getScript( "http://uitoolkit.optum.com/uimf2/js/file-upload/jquery.fileupload.js", function( data, textStatus, jqxhr ) {
							$.getScript( "http://uitoolkit.optum.com/uimf2/js/file-upload/jquery.fileupload-process.js", function( data, textStatus, jqxhr ) {
								$.getScript( "http://uitoolkit.optum.com/uimf2/js/file-upload/jquery.fileupload-validate.js", function( data, textStatus, jqxhr ) {

									$(".ux-upld").each( function( index, element ) {
										$(function () {
											var fileIndexer = 0;
											var defaultMaxSize = 5;
											var placeholderHTML = '<tr><td class="ux-upld-placeholder">Select files to upload.</td></tr>';
											var serverErrorHTML = '<tr><td class="ux-upld-placeholder ux-upld-error">Unable to connect to server.</td></tr>';
											var headerHTML = '<thead><tr><th>Filename</th><th>Status</th><th>Size</th><th class="ux-upld-actions"><span>Actions</span></th></tr></thead>';
											var rowHTML = '<td>ImageName.png</td><td><span class="ux-prgb" id="prgb-"><span></span></span></td><td></td><td><a href="" title="Remove" class="ux-icon-close"></a></td>';
											var errorRowHTML = '<td>ImageName.png</td><td class="ux-upld-error">File type not permitted</td><td>&nbsp;&nbsp;--&nbsp;</td><td><a href="" title="Remove" class="ux-icon-close"></a></td>';
											
											$(this).find( 'input[type="button"]' ).first().click( function() {
												$(this).blur();
												$(element).find( "input[type='file']" ).first().click();
											});
											
											var $fileInput = $(element).find( "input[type='file']" ).first();
											var $description = $(element).find( ".ux-upld-description" );
											var maxFileSizeSetting = $fileInput.attr("data-max-file-size");
											var fileTypeSetting = $fileInput.attr("data-accept-file-types");
											maxFileSizeSetting = (maxFileSizeSetting == "") ? defaultMaxSize : maxFileSizeSetting;
											
											var descriptionText = "(Maximum file size: " + ($fileInput.attr("data-max-file-size") ? ($fileInput.attr("data-max-file-size")+"MB") : "Any") + ". Accepted file types: " + ($fileInput.attr("data-accept-file-types") ? $fileInput.attr("data-accept-file-types").replace(/\|/g,", ") : "All") + ")";
											$description.html( descriptionText );
											$fileInput.attr("data-max-file-size", ( maxFileSizeSetting*1048576 ));
											
											if (fileTypeSetting != undefined) {
												var acceptedFilesRegExp = "(\\.|\\/)(" + $fileInput.attr("data-accept-file-types") + ")$";
												$fileInput.attr("data-accept-file-types", RegExp(acceptedFilesRegExp, "i"));
											}
											
											
										$("#fileupload").fileupload({
												dataType: 'json',
												
												autoUpload: false,
												
												done: function (e, data) {
													$.each(data.result.files, function (index, file) {
														var $fileTable = $(e.target).siblings("div.ux-upld-container").first().find("table").first();
														var rowFileIndexId = "#ux-upld-index-" + data.fileIndex;
														// Set status column to 100%
														$fileTable.find(rowFileIndexId).find("td").eq(1).html( "100%" );
														
														function formatFileSize (bytes) {
															if (typeof bytes !== 'number') {
																return ' -- ';
															}
															if (bytes >= 1073741824) {
																return (bytes / 1073741824).toFixed(1) + ' GB';
															}
															if (bytes >= 1048576) {
																return (bytes / 1048576).toFixed(1) + ' MB';
															}
															return (bytes / 1024).toFixed(0) + ' KB';
														}
														
														if (!file.error){
														$fileTable.find(rowFileIndexId).find("td").eq(2).html( formatFileSize(file.size) );
														} else {
															//alert('Error in done!');
															$fileTable.find(rowFileIndexId).find("td").eq(1).addClass("ux-upld-error").html( file.error );
															$fileTable.find(rowFileIndexId).find("td").eq(2).html("&nbsp;&nbsp;--&nbsp;");
														}
													});
												},
												
												progress: function (e, data) {
													var progress = parseInt(data.loaded / data.total * 100, 10);
													var prgbId = "#prgb-" + (data.fileIndex);
													var prgbWidthPct = progress + "%";
													$(prgbId).find("span").width(prgbWidthPct);
												}
												
											}).on('fileuploadadd', function (e, data) {
												
												data.fileIndex = fileIndexer;
												fileIndexer++;
													
											}).on('fileuploadprocessalways', function (e, data) {
												
												var file = data.files[0];
												
												var $fileTable = $(e.target).siblings("div.ux-upld-container").first().find("table").first();
												// Add a row to the table.
												// If it's the placeholder text then build the header row first.
												if ( $fileTable.hasClass("ux-upld-placeholder") ) {
													$fileTable.html( headerHTML );
													// Then remove the placeholder class
													$fileTable.removeClass("ux-upld-placeholder");
													// Then add the tbody.
													$fileTable.append( $("<tbody></tbody>") );
												}
												
												var rowFileIndexId = "ux-upld-index-" + data.fileIndex;
												var $tbody = $fileTable.find("tbody");
												var $thisTR;
												var progressBarId = "prgb-" + data.fileIndex;
													
												if (!file.error) {
												
													var jqXHR = data.submit()
														.success(function (result, textStatus, jqXHR) {
															})
														.error(function (jqXHR, textStatus, errorThrown) {
																$tbody.remove();
																$fileTable.addClass("ux-upld-placeholder").html( serverErrorHTML );
																
															})
														.complete(function (result, textStatus, jqXHR) {
															});
														
												}
												
												if (file.error) {
													$thisTR = $("<tr></tr>").html( errorRowHTML );
													$thisTR.find(".ux-upld-error").html( file.error );
												} else {
													$thisTR = $("<tr></tr>").html( rowHTML );
													$thisTR.find(".ux-prgb").attr("id", progressBarId);
												}
												$thisTR.attr("id", rowFileIndexId);
												$thisTR.find("td").first().html( file.name );
												$thisTR.find(".ux-icon-close").click( function(e) {
													e.preventDefault();
													if ( $(e.target).parents("tr").siblings("tr").length >= 1 ) {
														$(e.target).parents("tr").first().remove();
													} else {
														$(e.target).parents("table").addClass("ux-upld-placeholder").html(placeholderHTML);	
													}
													if (jqXHR!=undefined)
													jqXHR.abort();
												});
												
												if (data.originalFiles.length>1)
													$fileTable.find( "tbody" ).append( $thisTR );
												else
												$fileTable.find( "tbody" ).prepend( $thisTR );
									
											}).on('fileuploaddone', function (e, data) {
												// done
											}); //.fileupload
										}); // anonymous function
									}); // end each ux-upld component

								
								});
							});
						});
					});
				});

				
			},
			
			
			initializeDragAndDrop: function() {
				// Add event handlers for Drag and Drop
				var boolDragActive = false;
				var $draggee = null;
				var $ghost = null;
				var $currentDropzone = null;
				var $panelAfter = null;
				var $targetIndicator = $('<div class="ux-drag-target"></div>');
				var cursorX = 0;
				var cursorY = 0;
				var deltaX = 0;
				var deltaY = 0;
				
				var $noDiceIcon = $('<div class="ux-drag-no-dice"></div>');
				$noDiceIcon.hide().appendTo("body");
				
				function thisInThat( thisCoordinates, thisBox ) {
					// helper function that checks to see if a pair of x,y coordinates are in thisBox
					if ( thisCoordinates.x > thisBox.left &&
						 thisCoordinates.x < thisBox.right &&
						 thisCoordinates.y > thisBox.top &&
						 thisCoordinates.y < thisBox.bottom ) {
						return true;		 
					} else {
						return false;	
					}
				}
				
				$(".ux-drag-dropzone").each( function(index, element) {
					
					$(this).on("mouseover", function(event) {
						/*
							This is a little tricky. When we're dragging a panel the mouse is over that panel as we move it around the screen. Unfortunately this means the mouseenter event doesn't fire on the drop zone when we want it to. So whenever we move the mouse we have to trigger an artificial mouseenter event on all drop zones, so it's the responsibility of this function to make sure that the cursor really is over this object (div) before we do anything.
						*/
						cursorX = event.pageX;
						cursorY = event.pageY;
						var cursorPosition, dropBox;
						cursorPosition = {
							x: cursorX,
							y: cursorY	
						}
						dropBox = {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0
						}
						dropBox.left = $(this).offset().left;
						dropBox.top = $(this).offset().top;
						dropBox.right = dropBox.left + $(this).width();
						dropBox.bottom = dropBox.top + $(this).height();
						
						if ( thisInThat(cursorPosition, dropBox)) {
							if (boolDragActive) {
								$currentDropzone = $(this);
								$ghost.css({ "left": cursorX+deltaX, "top": cursorY+deltaY});
								//event.stopPropagation();
								event.preventDefault();
							}
						}
					});
					
				});
				
				$(".ux-drag-draggable > .ux-panl-header").each( function(index, element) {
					
					$(this).on("mousedown", function(event) {
						boolDragActive = true;
						$draggee = $(this).parent(".ux-drag-draggable");
						
						// Build the ghost
						$ghost = $draggee.clone();
						$ghost.addClass("ux-drag-initiated-ghost");
						$ghost.width( $draggee.width() );
							// Figure out distance from header upper left corner to cursor position
							deltaX = $(this).offset().left - cursorX;
							deltaY = $(this).offset().top - cursorY;
						$ghost.css({ "left": cursorX+deltaX, "top": cursorY+deltaY});
						$("body").append($ghost);
						$overlay = $('<div class="ux-drag-initiated-ghost-overlay"></div>');
						var overlayWidth = $ghost.innerWidth() + "px";
						var overlayHeight = $ghost.innerHeight() + "px";
						var overlayMargin = "-" + $ghost.innerHeight() + "px";
						$overlay.css({ 
							"width": overlayWidth,
							"height": overlayHeight,
							"margin-bottom": overlayMargin
						});
						$overlay.insertBefore( $ghost.find(".ux-panl-header") );
						
						// Update the original
						$draggee.addClass("ux-drag-initiated-original");
						event.preventDefault();
						return false;
					});
								
				});

				$("body").on("mousemove", function(event) {
					//$(".ux-drag-dropzone-in-field").removeClass("ux-drag-dropzone-in-field");
					//$currentDropzone = null;
					cursorX = event.pageX;
					cursorY = event.pageY;
					if (boolDragActive && $ghost != null) {
						$noDiceIcon.hide();
						$currentDropzone = null;
						$ghost.css({ "left": cursorX+deltaX, "top": cursorY+deltaY});
						var e = jQuery.Event( "mouseover" , { pageX: cursorX, pageY: cursorY } );
						jQuery(".ux-drag-dropzone").trigger( e );
						if ($currentDropzone == null) {
							$noDiceIcon.css({ "left": (cursorX-40), "top": (cursorY-12)});
							$noDiceIcon.show();
							$targetIndicator.detach();
						} else {
							$currentDropzone.find(".ux-drag-draggable").addClass("ux-drag-initiated-after");
							
							// Figure out panelAfter (the panel that'll be right after the draggee after we drop it).
							var $panels = $currentDropzone.find(".ux-drag-draggable");
							$panelAfter = null;
							
							var midline = 0;
							for (var i=0; i<$panels.length; i++) {
								// Calculate the midline height of each panel.
								midline = $panels.eq(i).offset().top + (.5 * $panels.eq(i).height());
								if (cursorY < midline) {
									$panelAfter = $panels.eq(i);
									break;
								}
							}
							if ($panelAfter == null) {
								$targetIndicator.appendTo($currentDropzone);
							} else {
								$targetIndicator.insertBefore($panelAfter);
							}
						}
						event.preventDefault();
					}
				});
				$("body").on("mouseup", function(event) {
					if (boolDragActive) {
						$targetIndicator.detach();
						$noDiceIcon.hide();
						if ($currentDropzone != null) {
							// Drag was active, and we're in a valid drop zone. Figure out where to put it by calculating the vertical midline of what will be its peer panels.
							var $panels = $currentDropzone.find(".ux-drag-draggable");
							
							// Move it
							var postAnimationHeight = $draggee.height();
							$draggee.css({"height": "0"});
							if ($panels.length < 1) {
								$draggee.prependTo($currentDropzone);
							} else {
								var midline = 0;
								for (var i=0; i<$panels.length; i++) {
									// Calculate the midline height of each panel.
									midline = $panels.eq(i).offset().top + (.5 * $panels.eq(i).height());
									if (cursorY < midline) {
										$panelAfter = $panels.eq(i);
										break;
									}
								}
								
								if ($panelAfter == null) {
									$draggee.appendTo($currentDropzone);
								} else {
									$draggee.insertBefore($panelAfter);
								}
							}
							// Animate
							$ghost.animate({
								left: $draggee.offset().left,
								top: $draggee.offset().top
							}, 250, "swing",
							function() {
								$ghost.remove();
								$ghost = null;
							});
							$draggee.animate({
								height: postAnimationHeight	
							}, 250, "swing",
							function() {
								$draggee.removeAttr("style");
								$draggee = null;
							});
						} else {
							// Drag was active, but we ended in an invalid drop zone. Move the panel back where it started.
							$ghost.animate({
								left: $draggee.offset().left,
								top: $draggee.offset().top	
							}, 250, "swing", 
							function () {
								$ghost.remove();
								$ghost = null;
								$draggee = null;
							});
						}
						$draggee.removeClass("ux-drag-initiated-original");
						boolDragActive = false;
					}
				});				
			}
		};
		
	};
	
	function ux_selectTab(tabName) {
		return;	
	}
	
		
	$(document).ready(function(){
		
		var uxo = ux(); // UX object
		uxo.initializeTableComponent();
		uxo.updateImageResolution();
		uxo.applyStyleConveniences();
		uxo.oneClickOnly();
		uxo.resizableTableColumns();
		uxo.paginationTable();
		uxo.initializeHeader();
		uxo.initializeSecondaryHorizontalNav();
		uxo.initializeHoverPanels();
		//uxo.cuxDropdowns();
		uxo.initializeTabbedPanels();
		uxo.initializeExpandCollapsePanels();
		uxo.initializeVerticalNavigation();
		uxo.initializeDragAndDrop();
		uxo.initializeTooltips();
		uxo.initializeTrees();
//		uxo.initializeFileUpload();
		uxo.initializeFloatingHeader();
		
	});
	
	var uxAlreadyLoaded = true;
	
}