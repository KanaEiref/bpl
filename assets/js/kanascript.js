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
	var menu_button_display = $('.menu-button').css('display');
	if (off_canvas_nav_display === 'block') {			
		$("body").removeClass("three-column").addClass("small-screen");				
	} 
	if (off_canvas_nav_display === 'none') {
		$("body").removeClass("active-sidebar active-nav small-screen")
			.addClass("three-column");			
	}	
	
});	

jQuery(document).ready(function($) {
		// Toggle for nav menu
		$('.hours-locations-button').click(function(e) {
			e.preventDefault();
			showVisit();							
		});	
		// Toggle for sidebar
		$('.service-button').click(function(e) {
			e.preventDefault();
			showServices();									
		});							
});
/*
;(function() {

	"use strict";


	if(!Modernizr.input.required) {
					Monderizr.load({
			load: 'assets/js/vendor/jquery.validate.min.js',
			complete: function() {
							$('#kanaform').validate({
					rules: {
						portfolioAddress: "required",
						portfolioTitle: "required",
						name: {
							required: true,
							minlength: 2
						},
						email: {
							required: true,
							email: true
						},
						password: {
							required: true,
							minlength: 5
						},
						cardNumber: "required",
						securityCode: "required",
						monthList: "required", 
						yearList: "required"
					},

					messages:  {
						portfolioAddress: "Please enter your portfolio address",
						portfolioTitle: "Please enter your portfoilo title",
						name: {
							required: "Please enter a name",
							minlength: "Your name must consist of at least 2 characters"
						},
						email: "Please enter a valid email address",
						password: {
							required: "Please provide a password",
							minlength: "Your password must be at least 5 characters long"
						},
						cardNumber: "Please enter your credit card number",
						securityCode: "Please enter your security code",
						monthList: "Please enter your card expiration month",
						yearList:  "Please enter your card expiration year"			
					}
				}); //end of validate 
			} // end of call back function
			});
	}	

})(); */
