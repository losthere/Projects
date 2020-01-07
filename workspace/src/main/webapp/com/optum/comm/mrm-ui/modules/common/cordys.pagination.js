/**
 * Pagination Plugin
 *
 * Copyright (c) 2013 Cordys
 */
;(function (window, $, undefined) {
	
	if (!$.cordys) {
		throw new Error("The Cordys HTML5 SDK is required, please ensure it is loaded properly");
	}

	$.cordys.pagination = function(settings){

		var self = this;
		self.masterData = $.isArray(settings.masterData) ? settings.masterData : settings.masterData;
		self.cursorSize = settings.pageSize || 25;
		
		self.totalRecords = self.masterData? ($.isArray(self.masterData) ? self.masterData.length : 1) : 0;


		self.numberOfPages = self.totalRecords > 0 ? Math.ceil(self.totalRecords/self.cursorSize)  : 0;
		
		self.__isinitialized= false;
		self.scope = settings.scope;
		self.callBackHandler   = settings.callBackHandler;


		
		this.initialize = function(htmls){
			self.currentPosition = 1;
			if ( htmls ){
				for(var i=0, length= htmls.length; i < length; i++){
					$(htmls[i], "#paginationCurr").find(".ux-pagi-first").on("click", self.first);
					$(htmls[i], "#paginationCurr").find(".ux-pagi-prev").on("click", self.previous);
					$(htmls[i], "#paginationCurr").find(".ux-pagi-next").on("click", self.next);
					$(htmls[i], "#paginationCurr").find(".ux-pagi-last").on("click", self.last);
					$(htmls[i], "#paginationCurr").find(".js_curr_page").on("change", self.changePage);
					$(htmls[i], "#paginationCurr").find(".js_curr_page").val(self.currentPosition);
					$(htmls[i], "#paginationCurr").find(".ux-pagi-detail").find(".js_totalPages").html(self.numberOfPages);
				}
				self.__htmls = htmls;
			}
			
			if ( ! self.__isinitialized ){
				var filteredData = [];
				filteredData =  $.grep(self.masterData, function(value, index){
					var startIndex = 0;
					var endIndex = startIndex + self.cursorSize;
					return index >= startIndex && index < endIndex;
				});
				this.updateData(filteredData);
				self.__isinitialized = true;
			}
			
			if ( ! self.masterData || self.masterData.length == 0 || self.numberOfPages == 1){
				self._enableDisableAll(true);
				if ( ! self.masterData || self.masterData.length == 0 ) self.setPage("");
			}else{
				self._enableDisableAll(false);
				this._disableLink("ux-pagi-first");
				this._disableLink("ux-pagi-prev");
			}
		}
		
		this._disableLink = function(className){
			for(var i=0, length= self.__htmls.length; i < length; i++){
					var element = $(self.__htmls[i], "#paginationCurr").find("." + className + " a");
					if ( ! element.hasClass('underlinedis') ) element.addClass('underlinedis');
					element.removeClass('underline');
			}
		}
		
		this._enableLink = function(className){
			for(var i=0, length= self.__htmls.length; i < length; i++){
					var element = $(self.__htmls[i], "#paginationCurr").find("." + className + " a");
					element.removeClass('underlinedis');
					if ( ! element.hasClass('underline') ) element.addClass('underline');
			}
		}

		this._enableDisableAll = function(isDisable){
			if ( isDisable ){
				self._disableLink("ux-pagi-first");
				self._disableLink("ux-pagi-prev");
				self._disableLink("ux-pagi-next");
				self._disableLink("ux-pagi-last");
				for(var i=0, length= self.__htmls.length; i < length; i++){
					$(self.__htmls[i], "#paginationCurr").find(".js_curr_page").prop('disabled', true);
				}
			}else{
				self._enableLink("ux-pagi-first");
				self._enableLink("ux-pagi-prev");
				self._enableLink("ux-pagi-next");
				self._enableLink("ux-pagi-last");
				for(var i=0, length= self.__htmls.length; i < length; i++){
					$(self.__htmls[i], "#paginationCurr").find(".js_curr_page").prop('disabled', false);
				}
			}
		}		

		this.changePage = function(event){
			self.showError("");
			var pageNumber = event.target.value - 0;
			if ( pageNumber < 1 || pageNumber > self.numberOfPages ){
				return;

			}
			var filteredData =  $.grep(self.masterData, function(value, index){
					var startIndex = self.cursorSize * ( pageNumber -  1 );
					var endIndex = startIndex + self.cursorSize;
					return index >= startIndex && index < endIndex;
				});
			self.currentPosition = pageNumber ;
			self.setPage(self.currentPosition);
			self.updateData( filteredData );
			if ( self.currentPosition == self.numberOfPages ){
				self._disableLink("ux-pagi-next");
				self._disableLink("ux-pagi-last");	
			}else{
				self._enableLink("ux-pagi-next");
				self._enableLink("ux-pagi-last");
			}
			if ( self.currentPosition == 1 ){
				self._disableLink("ux-pagi-first");
				self._disableLink("ux-pagi-prev");	
			}else{
				self._enableLink("ux-pagi-first");
				self._enableLink("ux-pagi-prev");
			}
		}

		this.showError = function(message){
			if ( self.scope  ){
				self.scope.errorMessage = message;
				self.scope.$apply(self.scope.errorMessage);
			}
		}

		this.setPage = function(pageNumber){
			for(var i=0, length= self.__htmls.length; i < length; i++){

				$(self.__htmls[i], "#paginationCurr").find(".js_curr_page").val(pageNumber);
			}
		}
		
		this.updateData = function(data){
			if ( self.callBackHandler  ){
				self.callBackHandler(self.scope, data);
				//self.scope.refreshEncountersTable(data)
			}
		}
		
		this.clearResults = function(htmls){
			self.masterData = [];
			self.totalRecords = 0;
			self.numberOfPages = 0;
			this.initialize(htmls);
		}
		
		this.next = function(event){
			var filteredData = [];
			if ( self.currentPosition < self.numberOfPages ){
				filteredData =  $.grep(self.masterData, function(value, index){
					var startIndex = self.currentPosition * self.cursorSize;
					var endIndex = startIndex + self.cursorSize;
					return index >= startIndex && index < endIndex;
				});
				self.currentPosition += 1;
				self.setPage(self.currentPosition);
				self.updateData( filteredData );
			}
			if ( self.currentPosition == self.numberOfPages ){
				self._disableLink("ux-pagi-next");
				self._disableLink("ux-pagi-last");	
			}else{
				self._enableLink("ux-pagi-next");
				self._enableLink("ux-pagi-last");
			}
			self._enableLink("ux-pagi-first");
			self._enableLink("ux-pagi-prev");
			event.preventDefault();
		}
		
		this.last = function(){
			var filteredData = [];
			if ( self.currentPosition < self.numberOfPages ){
				filteredData =  $.grep(self.masterData, function(value, index){
					var startIndex = self.totalRecords - self.cursorSize;
					var endIndex = startIndex + self.cursorSize;
					return index >= startIndex && index < endIndex;
				});
				self.currentPosition = self.numberOfPages;
				self.setPage(self.currentPosition);
				self.updateData( filteredData );

			}
			self._disableLink("ux-pagi-last");
			self._disableLink("ux-pagi-next");
			if ( self.numberOfPages > 1 ){
				self._enableLink("ux-pagi-first");
				self._enableLink("ux-pagi-prev")
			}
			return filteredData;
		}
		
		this.previous = function(){
			var filteredData = [];
			if ( self.currentPosition > 1 ){
				self.currentPosition--;
				filteredData =  $.grep(self.masterData, function(value, index){
					var startIndex = ( self.currentPosition - 1 ) * self.cursorSize;
					var endIndex = startIndex + self.cursorSize;
					return index >= startIndex && index < endIndex;
				});
				self.setPage(self.currentPosition);
				self.updateData( filteredData );
			}
			if ( self.currentPosition == 1 ){
				self._disableLink("ux-pagi-first");
				self._disableLink("ux-pagi-prev");	
			}else{
				self._enableLink("ux-pagi-first");
				self._enableLink("ux-pagi-prev");
			}
			self._enableLink("ux-pagi-last");
			self._enableLink("ux-pagi-next");			
			return filteredData;
		}
		
		this.first = function(){
			var filteredData = [];
			if ( self.currentPosition > 1 ){
				filteredData =  $.grep(self.masterData, function(value, index){
					var startIndex = 0;
					var endIndex = startIndex + self.cursorSize;
					return index >= startIndex && index < endIndex;
				});
				self.currentPosition = 1;
				self.setPage(self.currentPosition);
				self.updateData( filteredData );

			}
			self._disableLink("ux-pagi-first");
			self._disableLink("ux-pagi-prev");
			if ( self.numberOfPages > 1 ){
				self._enableLink("ux-pagi-next");
				self._enableLink("ux-pagi-last")
			}
			return filteredData;
		}
		return self;
	}
})(window, jQuery)
