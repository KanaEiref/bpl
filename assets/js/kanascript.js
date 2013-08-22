var showServices = function() {
	$('body').removeClass("active-left").toggleClass("active-right");
	$('.hours-locations-button').removeClass("active-button");					
	$('.service-button').toggleClass("active-button");
};

var showVisit = function() {
	$('body').removeClass("active-right").toggleClass("active-left");
	$('.service-button').removeClass("active-button");				
	$('.hours-locations-button').toggleClass("active-button");	
};

// add/remove classes everytime the window resize event fires
jQuery(window).resize(function(){
	var off_canvas_nav_display = $('.off-canvas-navigation').css('display');
	
	if (off_canvas_nav_display === 'block') {			
		$("body").removeClass("three-column").addClass("small-screen");				
	} 
	if (off_canvas_nav_display === 'none') {
		$("body").removeClass("active-right active-left small-screen")
			.addClass("three-column");			
	}	
	
});	

jQuery(document).ready(function($) {
		// Toggle for left menu
		$('.hours-locations-button').click(function(e) {
			e.preventDefault();
			showVisit();							
		});	
		// Toggle for right
		$('.service-button').click(function(e) {
			e.preventDefault();
			showServices();									
		});							
});

;(function() {

	"use strict";

	function clickmenuEvent(event){
		$('#mobileMenu').toggleClass("onmenu");
	}

	function clickSearchEvent(event){


		$('#searchbox').toggleClass("onmode");
		$('#searchbox').focus();
		$('#output').toggleClass("onoutput");
	}

	function searchEvent(event){
		$.getJSON('assets/books.json', function(data){

			var books = data.bookwarehouse,
			count = books.length,
			searchValue = $('input').val();

			$('#output').empty();

			if (count > 0 && searchValue != " "){

				
				$.each(books, function (i, obj) {
				if (obj.name.indexOf(searchValue) != -1){
					$('#output').append('<p> <a href="#">' +
						obj.name + '&nbsp;&nbsp;&nbsp;&shy;&nbsp;' + obj.location + '</a><p>').hide().fadeIn();
				}
			});
			}


		}).error(function(){ alert('there was an ajax error');
		}).complete(function(){}); //end of ajax call

	}

	document.addEventListener("DOMContentLoaded", function(){
		var iconsearch = document.getElementById('iconsearch');
		iconsearch.addEventListener("click", clickSearchEvent, false);
		var searchbox = document.getElementById('searchbox');
		searchbox.addEventListener("keyup", searchEvent, false);
		var iconmenu = document.getElementById('iconmenu');
		iconmenu.addEventListener("click", clickmenuEvent, false);

	}, false);	
})();