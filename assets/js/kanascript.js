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

	function clickSearchEvent(event){

		console.log(event.type);
		$('#searchbox').toggleClass("onmode");

	}

	document.addEventListener("DOMContentLoaded", function(){
		var iconsearch = document.getElementById('iconsearch');
		iconsearch.addEventListener("click", clickSearchEvent, false);
		//textbox.addEventListener("keyup", handleEvent, false);
		//textbox.addEventListener("blur", handleEvent, false);
	}, false);	
})();