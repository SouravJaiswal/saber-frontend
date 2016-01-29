
(function($) {

	skel
		.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function($) {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

			 $.timeliner({
				startOpen:['#19550828', '#19630828'],
			});
			$.timeliner({
				timelineContainer: '#timeline-js',
				timelineSectionMarker: '.milestone',
				oneOpen: true,
				startState: 'flat',
				expandAllText: '+ Show All',
				collapseAllText: '- Hide All',
				startOpen: ['#born']
			});
			// Colorbox Modal
			$(".CBmodal").colorbox({inline:true, initialWidth:100, maxWidth:682, initialHeight:100, transition:"elastic",speed:750});


			var nt_example2 = $('#bob').newsTicker({
			row_height: 60,
			max_rows: 1,
			speed: 300,
			duration: 6000,
			prevButton: $('#bob-prev'),
			nextButton: $('#bob-next'),
			hasMoved: function() {
		    	$('#bob-infos-container').fadeOut(200, function(){
		        	$('#bob-infos .infos-hour').text($('#bob li:first span').text());
		        	$('#bob-infos .infos-text').text($('#bob li:first').data('infos'));
		        	$(this).fadeIn(400);
		        });
		    },
		    pause: function() {
		    	$('#bob li i').removeClass('fa-play').addClass('fa-pause');
		    },
		    unpause: function() {
		    	$('#bob li i').removeClass('fa-pause').addClass('fa-play');
		    }
		});
		$('#bob-infos').hover(function() {
		    nt_example2.newsTicker('pause');
		}, function() {
		    nt_example2.newsTicker('unpause');
		});

	});
	
	var errors = [];

	var verify = function(member,phone,password,data){

    	
    	/*
		var URL = $("#myform").attr("action");
		$.post(URL,
		    formData,
		    function(data, textStatus, jqXHR)
		    {
		       //data: Data from server.    
		    }).fail(function(jqXHR, textStatus, errorThrown) 
		    {
		 
		    });
    	 */
    	
    	

    	var json = '{"status":"ok","user":{"id":"2","fest_id":"A1638048","email":"niranjan94@yahoo.com","mobile":"9600514966","name":"Niranjan","college":{"id":"51","name":"Amrita Vishwa Vidyapeetham, Coimbatore"},"city":{"id":"1129","name":"Coimbatore","state":"Tamil Nadu"}},"access_token":"eyJpdiI6IncycWZGU2NOcFVTZnJsWlFaSDR0YlE9PSIsInZhbHVlIjoiSnBacjd4WFBGWkF1NGxUYTVWeGUzRDdkY3RZOUdBSm1nWWZnYkVWYWlwcXZXZTJ5SWptT2w2ZDhwb1VvRWFxayIsIm1hYyI6Ijk2ZGY2MDA4NmJmYjhlZWNhYWY4NzM1NjdhZjJjODc4ODU3ZDFlMDE2OTAyYTg0ZWZkYWNlOTZhNGI1NWI3MTAifQ=="}';
    
    	var data  = JSON.parse(json);
		

		if(data.status == "ok"){

			var verify_json  = JSON.parse('{"status": "ok"}');

			if(verify_json.status == "ok"){

				$("#data"+member+"").val(json);
			}
			else{
				errors.push("Member "+member+" is not registered for the event. Please visit the https://anokha.amrita.edu");
			}

		}else if(data.status == "incorrect"){

			errors.push("Member "+member+"'s password is wrong");
			
		}else if(data.status == "not_registered"){
			errors.push("Member "+member+" is not registered for ANOKHA. Please visit the https://anokha.amrita.edu");
		}        

		console.log(errors);

	}

	// Team

	var members = 1;
	$('#add_new').on('click',function(event){
		
		members++;
		if(members < 4){
			var data = '<div id="mem-'+ members+'"><p>Team Member '+ members+'</p>	<div class="form-group"><label for="phone'+ members+'">Phone No</label><input type="tel" name="phone'+ members+'" class="form-control" id="phone'+ members+'" placeholder="Registered Phone No"></div><div class="form-group"><label for="password'+ members+'">Password</label><input type="password" name="password'+ members+'" class="form-control" id="password'+ members+'" placeholder="Password"></div><div class="form-group"><input type="hidden" name="data'+ members+'" class="form-control" id="data'+ members+'" ></div></div>';
			$('#mem-'+ (members-1)+'').append(data);
		}

		if(members == 3){
			$( "#add_new" ).hide( "slow");
		}
		event.preventDefault();
		
	});

	var validate = {
		rules : {
	            phone1: {
	            	required : true,
	            	minlength : 10,
	            	maxlength : 10
	            },
	            password1: {
	                required: true,
	                minlength: 5
	            },
	            password: {
	                required: true,
	                minlength: 5
	            },
	            team : {
	            	required : true,
	            	maxlength : 255,
	            	minlength : 3,
	            }
	    },
	    messages: {
	            phone1: {
	            	required : "Please provide a phone number",
	            	minlength : "Enter a valid phone number",maxlength : "Enter a valid phone number"
	            },
	            password1: {
	                required: "Please provide a password",
	                minlength: "Your password must be at least 5 characters long"
	            },
	            password: {
	                required: "Please provide a password",
	                minlength: "Your password must be at least 5 characters long"
	            },
	            team: {
	            	required : "Please enter a team name",
	            	minlength : "Your team name should be more than 3",
	            	maxlength : "Your team name should be within 3-255"
	            }
	    },
	    submitHandler: function(form) {
	        	

				for(var i=0;i<members;i++){

					verify(i+1,$('#phone'+i+'').val(),$('#password'+i+'').val());

				}

				if(errors.length == 0){
					form.submit();

				}else{
					$('#errors').html('');
					for(var i=0;i<errors.length;i++){
						$('#errors').append("<p>"+errors[i]+"</p>");
					}
					errors = [];
				}

	        }

	}

	
	

	$('#register-button').on('click',function(event){


		if(members > 1){

		validate.rules.phone2 = {
	            	required : true,
	            	minlength : 10,
	            	maxlength : 10
	            }
	    validate.rules.password2 = {
	                required: true,
	                minlength: 5
	     }

	    validate.messages.phone2 = {
        	required : "Please provide a phone number",
        	minlength : "Enter a valid phone number",maxlength : "Enter a valid phone number"
        },
        validate.messages.password2= {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
        }

        if(members > 2){
        	validate.rules.phone3 = {
	            	required : true,
	            	minlength : 10,
	            	maxlength : 10
	            }
		    validate.rules.password3 = {
		                required: true,
		                minlength: 5
		     }

		    validate.messages.phone3 = {
	        	required : "Please provide a phone number",
	        	minlength : "Enter a valid phone number",maxlength : "Enter a valid phone number"
	        },
	        validate.messages.password3 = {
	            required: "Please provide a password",
	            minlength: "Your password must be at least 5 characters long"
	        }

        }

	}

		$("#register").validate(validate);
	});

	//login.php

	$('#login-button').on('click',function(event){

		$("#register").validate({
		rules : {
	            password: {
	                required: true,
	                minlength: 5
	            },
	            team : {
	            	required : true,
	            	maxlength : 255,
	            	minlength : 3,
	            }
	    },
	    messages: {
	            
	            password: {
	                required: "Please provide a password",
	                minlength: "Your password must be at least 5 characters long"
	            },
	            team: {
	            	required : "Please enter a team name",
	            	minlength : "Your team name should be more than 3",
	            	maxlength : "Your team name should be within 3-255"
	            }
	    },
	    submitHandler: function(form) {


				if(errors.length == 0){
					form.submit();

				}else{
					$('#errors').html('');
					for(var i=0;i<errors.length;i++){
						$('#errors').append("<p>"+errors[i]+"</p>");
					}
					errors = [];
				}

	        }

	});
	});
	
	//Highlight 
	
	hljs.initHighlightingOnLoad();
	

})(jQuery);
