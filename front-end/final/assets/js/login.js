$(function() {
	$('#login-button').on('click',function (event) {

		//event.preventDefault();
		
	     $("#login").validate({
	    
	        // Specify the validation rules
	        rules: {
	            phone: {
	            	required : true,
	            	minlength : 10,
	            	maxlength : 10
	            },
	            password: {
	                required: true,
	                minlength: 5
	            }
	        },
	        
	        // Specify the validation error messages
	        messages: {
	            phone: {
	            	required : "Please provide a phone number",
	            	minlength : "Enter a valid phone number"
	            },
	            password: {
	                required: "Please provide a password",
	                minlength: "Your password must be at least 5 characters long"
	            }
	        },
	        
	        submitHandler: function(form) {

	        	
	        	
	        	var formData = $("#login").serializeArray();
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

						$('#data').val(json);

						form.submit();
						

					}

				}
				

	        }
	    });

	});
});