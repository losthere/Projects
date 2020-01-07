/**
 * 
 */
var sortDefaultCss = "ux-icon-tabl-sort-sortable";
var sortDescCss = "ux-icon-tabl-sort-desc";
var sortAscCss = "ux-icon-tabl-sort-asc";
function Paginator(){
    this.currentPage = 0;
    this.totalPages = 0;
    this.rowsPerPage = 25;
    this.totalRecords = 0;
}
function Sorting(){
    this.sortOrder = '';
    this.sortColumn = '';
}
var paginator = new Paginator();
var sort = new Sorting();
Paginator.prototype.updateCurrPage=function(){
    $('.js_curr_page').val(paginator.currentPage);
};
Paginator.prototype.setTotalPages = function(totPages){
    paginator.reset();
    if(totPages > 0){
        this.totalPages = totPages;
        this.currentPage = 1;
		if(totPages>1)
		{
			disableAll(false);
			disablefirstprevlink(true);
			disablenextlastlink(false);
		}
		else
		{
		disableAll(true);
		}
    }
    $(".js_totalPages").html(this.totalPages);
    this.updateCurrPage();
};
Paginator.prototype.reset = function(){
    this.totalPages = 0;
    this.currentPage = 0;
    this.totalRecords = 0;
    $(".js_totalPages").html(0);
    $('#pagiTotalRecs').html(0);
	disableAll(true);
    this.updateCurrPage();
};
Paginator.prototype.setRowsPerPage = function(rowsPerPage){
    this.rowsPerPage = rowsPerPage;
};
Paginator.prototype.setTotalRecords = function(totalRecords){
    this.totalRecords = totalRecords;
    $('#pagiTotalRecs').html(this.getTotalRecords());
};
Paginator.prototype.getTotalRecords = function(){
   var formated = this.totalRecords.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
   return formated.substr(0,formated.length-2);
};
Sorting.prototype.setSorting = function(sortColumn, sortOrder){
    $('.js_sortable').each(function(){
        var child = $(this).next();
        if(this.id == sortColumn){
            sort.sortColumn = $(this).attr("column");
            if(sortOrder == 'ASC'){
                child.removeClass();
                child.addClass(sortAscCss);
                sort.sortOrder = 'ASC';
            }else{
                sort.sortOrder = 'DESC';
                child.removeClass();
                child.addClass(sortDescCss);
            }
        }else if(child.attr('class') != sortDefaultCss){
            $(this).next().removeClass();
            $(this).next().addClass(sortDefaultCss);
        }
    }
    );
};
Sorting.prototype.reset = function(){
    this.sortColumn = '';
    this.sortOrder = '';
    this.setSorting('', '');
};
$(
    function(){
        $('.ux-pagi-first').click(function(){
            if(paginator.currentPage > 1 ){
                paginator.currentPage = 1;
                paginator.updateCurrPage();
				disablefirstprevlink(true);
				disablenextlastlink(false);
                gotoPage();
            }
        }
        );
        $('.ux-pagi-last').click(function(){
            if(paginator.currentPage != paginator.totalPages){
                paginator.currentPage = paginator.totalPages;
                paginator.updateCurrPage();
				disablefirstprevlink(false);
				disablenextlastlink(true);
                gotoPage();
            }
        }
        );
        $('.ux-pagi-prev').click(function(){
            if(paginator.currentPage > 1){
                paginator.currentPage--;
                paginator.updateCurrPage();
				disablenextlastlink(false);
				if(paginator.currentPage==1)
				{
					disablefirstprevlink(true);
				}
                gotoPage();
            }
        }
        );
        $('.ux-pagi-next').click(function(){
            if(paginator.currentPage != paginator.totalPages){
                paginator.currentPage++;
                paginator.updateCurrPage();
				disablefirstprevlink(false);
				if(paginator.currentPage == paginator.totalPages)
				{
					disablenextlastlink(true);
				}
                gotoPage();
            }
        }
        );
        $('.js_curr_page').keydown(function(e){
            var evt = e || window.event; 
            var charCode=null; 
            if(window.event===undefined){ 
                charCode = (evt.which) ? evt.which : evt.keyCode; 
            } 
            else { 
                charCode = (e.which) ? e.which : e.keyCode; 
            }
            if( charCode == 13){
                var pageNo = parseInt(this.value);
                if( pageNo != paginator.currentPage && pageNo > 0 && pageNo <= paginator.totalPages){
                    paginator.currentPage = this.value;
                    paginator.updateCurrPage();
					if(paginator.currentPage==paginator.totalPages)
					{
						disablefirstprevlink(false);
						disablenextlastlink(true);
					}
					else
					if(paginator.currentPage==1)
					{
						disablefirstprevlink(true);
						disablenextlastlink(false);
					}
					else
					{
						disablefirstprevlink(false);
						disablenextlastlink(false);
					}					
                    gotoPage();
                }else{
                    paginator.updateCurrPage();
                }
                return true;
            }
            if (charCode > 31 && (charCode < 48 || charCode > 57)) { 
                return false; 
            } 
            return true; 
        }
        );
        $('.js_sortable').click(function(){
            var selCol = this.id;
            sort.sortColumn = $(this).attr("column");
            $('.js_sortable').each(function(){
                var child = $(this).next();
                if(this.id == selCol){
                    if($(this).next().attr("class") == sortDefaultCss || $(this).next().attr("class") == sortDescCss){
                        $(this).next().removeClass();
                        $(this).next().addClass(sortAscCss);
                        sort.sortOrder = 'ASC';                     
                    }else{
                        sort.sortOrder = 'DESC';
                        $(this).next().removeClass();
                        $(this).next().addClass(sortDescCss);
                    }
                    gotoPage();
                }else if(child.attr('class') != sortDefaultCss){
                    $(this).next().removeClass();
                    $(this).next().addClass(sortDefaultCss);
                }
            }
            );
        }
        );
    }
);

function disablefirstprevlink(doDisable)
{
	if(doDisable)
	{
		$('.ux-pagi-first a').removeClass('underline');
		$('.ux-pagi-prev a').removeClass('underline');
		$('.ux-pagi-first a').addClass('underlinedis');
		$('.ux-pagi-prev a').addClass('underlinedis');
	}
	else
	{
		$('.ux-pagi-first a').addClass('underline');
		$('.ux-pagi-prev a').addClass('underline');
		$('.ux-pagi-first a').removeClass('underlinedis');
		$('.ux-pagi-prev a').removeClass('underlinedis');
	}
}

function disablenextlastlink(doDisable)
{
	if(doDisable)
	{
		$('.ux-pagi-next a').removeClass('underline');
		$('.ux-pagi-last a').removeClass('underline');
		$('.ux-pagi-next a').addClass('underlinedis');
		$('.ux-pagi-last a').addClass('underlinedis');
	}
	else
	{
		$('.ux-pagi-next a').addClass('underline');
		$('.ux-pagi-last a').addClass('underline');
		$('.ux-pagi-next a').removeClass('underlinedis');
		$('.ux-pagi-last a').removeClass('underlinedis');
	}
}

function disableAll(doDisable)
{
	if(doDisable)
	{
		$('.ux-pagi input').attr('disabled','disabled');
		$('.ux-pagi li a').addClass('underlinedis');
		$('.ux-pagi li span').addClass('underlinedis');
		$('.ux-pagi li a').removeClass('underline');
	}
	else
	{
		$('.ux-pagi input').removeAttr('disabled');
		$('.ux-pagi li a').removeClass('underlinedis');
		$('.ux-pagi li span').removeClass('underlinedis');
		$('.ux-pagi li a').addClass('underline');
	}
}