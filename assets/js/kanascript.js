
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
						monthList: "required", /* these 2 lines will not work because this plugin only works with text input*/
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


	/* this function returns card type  but it is not used because it tests the whole value
	of the input box but I only needed the first few letters to be tested */
	function creditCardType( cardNumber)
	{
		var amexReg = /^3[47][0-9]{13}$/,
			visaReg = /^4[0-9]{12}(?:[0-9]{3})?$/,
			masterReg = /^5[1-5][0-9]{14}$/,
			discoverReg = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

			if (amexReg.test(cardNumber))
			{ return 'amex' ;
			}
			else if (visaReg.test(cardNumber))
			{
				return 'visa';
			}
			else if (discoverReg.test(cardNumber))
			{
				return 'discover';
			}
			else if (masterReg.test(cardNumber))
			{
				return 'master';
			}
			else
			{
				return "invalidCardType";
			}

	}

	function changeLock( status)
	{
		switch(status){
			case 'neutual': 
				$('#lock').removeClass();
				break;
			case 'pass':
				$('#lock').removeClass('notPass').addClass('pass');		
				break;
			case 'notPass':
				$('#lock').removeClass('pass').addClass('notPass');
				break;
			default:
				break;
			}
	}

	
	function validateSecCode(event){
		var codeLength = $('#securityCode').val().length;
		var cardType = event.data.name;

		if (cardType == 'amex'){
			if (codeLength === 4) {
				$('#vCode').removeClass().addClass('passImage');
			}
			else
			{
				$('#vCode').removeClass().addClass('errorImage');
				$('#securityCode').removeClass().addClass('error');
			}
		}else if (codeLength === 3){
				$('#vCode').removeClass().addClass('passImage');	
			
		}else
		{	$('#vCode').removeClass().addClass('errorImage');
			
			$('#securityCode').removeClass().addClass('error');
		}
	}



	$('#monthList').blur(function(){
		if ($(this).val() == 'month')
		{	
			changeLock('notPass');
			$(this).removeClass().addClass('error');
		}
		else
		{
			changeLock('neutual');
		}
	});

	$('#yearList').blur(function(){
		if ($(this).val() == 'year')
		{
			changeLock('notPass');
			$(this).removeClass().addClass('error');
		}
		else
		{
			changeLock('neutual');
		}
	});

	function getCreditCardType(accountNumber)
	{
		//start without knowing the credit card type
		var result = "unknown";

		//first check for MasterCard
		if (/^5[1-5]/.test(accountNumber))
		{
		result = "mastercard";}

		//then check for Visa
		else if (/^4/.test(accountNumber))
		{
		result = "visa";//discoverReg = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
		}
		else if (/^6(?:011|5)/.test(accountNumber))
		{
			result = "discover";
		}

		//then check for AmEx
		else if (/^3[47]/.test(accountNumber))
		{
		result = "amex";
		}
		console.log(result);
		return result;
	}

	function disableAllRadios(){
		$('#amexcard').prop('checked', false); 
		$('#visaCard').prop("checked", false); 
		$('#discoverCard').prop("checked", false); 
		$('#masterCard').prop("checked", false); 
	}

	function handleEvent(event)
	{
		var value = event.target.value; 
		console.log(value);

		//if it is blank
		if (value === ''){
			
			$('#vNumber').removeClass().addClass('hidden');
			disableAllRadios();
			return;
		}

		var cardType = getCreditCardType(value);		

		$('#cardNumber').removeClass();

		switch(cardType){
			case 'amex':
				$('#amexcard').prop('checked', true); 
				$('#vNumber').removeClass().addClass('passImage');

				$('#securityCode').on('blur', { name: cardType}, validateSecCode);
				break;

			case 'visa':
				$('#vNumber').removeClass().addClass('passImage');
				$('#visaCard').prop("checked", true); 

				$('#securityCode').on('blur', { name: cardType}, validateSecCode);
				break;

			case 'discover':
				$('#vNumber').removeClass().addClass('passImage');
				$('#discoverCard').prop("checked", true); 
				$('#securityCode').on('blur', { name: cardType}, validateSecCode);
				break;

			case 'mastercard':
				$('#vNumber').removeClass().addClass('passImage');
				$('#masterCard').prop("checked", true); 
				
				$('#securityCode').on('blur', { name: cardType}, validateSecCode);
				break;
			

			default:

				$('#vNumber').removeClass().addClass('errorImage');
				$('#cardNumber').removeClass().addClass('error');
				break;

		}


	}
	
	$('#showPassword').change(function(){
		$('#hiddenPassword').attr('readonly','readonly');
		$('#hiddenPassword').val($('#password').val());
		var isChecked = $(this).prop('checked');
		if (isChecked) {
			$('#password').hide();
			$('#hiddenPassword').show();
		}
		else {
			$('#password').show();
			$('#hiddenPassword').hide();
	}

	});

	document.addEventListener("DOMContentLoaded", function(){
		var textbox = document.getElementById('cardNumber');
		textbox.addEventListener("keyup", handleEvent, false);
		textbox.addEventListener("blur", handleEvent, false);
	}, false);	

})();
