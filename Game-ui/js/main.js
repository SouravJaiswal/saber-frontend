$(document).ready(function(){

	var canvas = $('#game').get(0);

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	b = canvas.width;

	l = canvas.height;

	//read logs from the pythonanywhere to get the data and display

	var gameState = {

		no_of_bots : 2,

		colors : ["yellow","red"],

		bots : [
			[{

				x : 10,	

				y : 10,

				signals : [{

					bot_type : 1,

					bot_no : 1,

				}]	,

				health : 26,			

			},

			{

				x : 20,	

				y : 40,

				health : 0,

			},

			{

				x : 30,	

				y : 80,


				health : 0,

			}],

			[{

				x : 90,	

				y : 90,


				health : 0,


			},

			{

				x : 50,	

				y : 40,


				health : 0,

			},

			{

				x : 60,	

				y : 70,

				signals : [{

					bot_type : 0,

					bot_no : 1,

				}]	,

				health : 0,

			}]

		],

		scores : [100,200], 


	};

	var routers = [];


	if(canvas.getContext){

		var game = canvas.getContext('2d');

		/*

		var img = new Image();

		img.width = 20;

		img.height = 20;

		game.imageSmoothingEnabled = true;

		img.src = 'img/server.png';

		console.log(img);

		img.onload = function () {
			game.drawImage(img,60,60,10,10);

			game.drawImage(img,300,300,30,30);
		}

		*/
	
		// Creating a signal
		// 
		
		function drawScene () {

            /*
			var xcors = 0;
			var ycors = 0;
			while( ycors <= $('canvas')[0].height){
				xcors = 0;
			  	while(xcors <= $('canvas')[0].width){
			    	$('canvas').drawRect({
			    		layer: true,
			        	fillStyle : '#0C0C0C',
			          	x: xcors, y: ycors,
			          	width: 7,
  						height: 7,
			          	/*
			          	mouseover: function(layer) {
						    layer.radius = 4;
						},
					  mouseout: function(layer) {
					    $(this).animateLayer(layer, {
					      radius : 2
					    }, 0);
					  },
					  
			    	});
			  	xcors += 8;
			  }
			  ycors += 8;
			}

            */

			/*

				$('canvas').drawBezier({
				  strokeStyle: 'red',
				  strokeWidth: 5,
				  x1: 25, y1: 50, // Start point
				  cx1: 175, cy1: 50, // Control point
				  cx2: 25, cy2: 150, // Control point
				  x2: 60, y2: 40, // Start/end point
				  
				  cx3: 275, cy3: 150, // Control point
				  cx4: 125, cy4: 1, // Control point
				  x3: 90, y3: 60 // Start/end point
			});

		*/
    

        //Image background. No cubes
        //
        //
                    $('canvas').drawImage({
              source: 'img/usa.png',
              x: b/2, y: l/2
            });
		}
		
		function drawBots(){

			var i = 0;

			gameState.bots.forEach(function (bots) {

				
				bots.forEach(function (bot) {

					var xcors = (bot.x*b)/100;

					var ycors = (bot.y*l)/100;

					$('canvas').drawRect({
			    		layer: true,
			        	fillStyle : gameState.colors[i],
			          	x: xcors, y: ycors,
			          	width: 21,
						height: 21,
                        opacity : 0.5,
						
					});	
					
				});

				i++;	

			});

	
		
			

		}

		function drawScore () {

			var i = 0;

			game.font = "20px serif";

			game.fillStyle = "white";

			game.fillText("Scores", (90*canvas.width)/100, (10*canvas.height)/100);
			
			gameState.scores.forEach(function (score) {

				game.fillStyle = gameState.colors[i];
					
				game.fillText("Bot "+ i.toString() + ":" + score.toString(), (90*canvas.width)/100, (((10+((i+1)*5))*canvas.height)/100));

				i++;	

			});

		}

        var j = 0;

		function drawSignals () {

            var i = 0;
			
            

			gameState.bots.forEach(function (bots) {
				
				bots.forEach(function (bot) {

					if(bot.signals){
					
						bot.signals.forEach(function(signal){

							//good way of drawing line
							//
							/*

							game.strokeStyle = "white";

							game.beginPath();

							var to = gameState.bots[signal.bot_type][signal.bot_no];

							var distance_x = Math.abs(((bot.x*b)/100)-((to.x*b)/100));

							var distance_y = Math.abs(((bot.y*l)/100)-((to.y*l)/100));

							game.moveTo(((bot.x*b)/100)+8,((bot.y*l)/100)+8);

							//bad logic change needed

							game.lineTo(((bot.x*b)/100)+(distance_x*i),((bot.y*l)/100)+(distance_y*i));

							game.stroke();

							/*

							if( (i*100) % 10 === 0){

								routers.push
							if( (i*100) % 10 === 0){

								routers.push([((bot.x*b)/100)+(distance_x*i),((bot.y*l)/100)+(distance_y*i)]);

							}

							routers.forEach(function (router) {
								

								game.beginPath();
				
								game.strokeStyle = "white";

								game.arc(router[0],router[1],5,0,Math.PI*2,true);

								game.stroke();	

								console.log(router);


							});
	
							*/
                        
                            var to = gameState.bots[signal.bot_type][signal.bot_no];

                            var distance_x = Math.abs(((bot.x*b)/100)-((to.x*b)/100));

                            var distance_y = Math.abs(((bot.y*l)/100)-((to.y*l)/100));

                            var xcors = (bot.x*b)/100;

                            var ycors = (bot.y*l)/100;

                            $('canvas').drawLine({
                              strokeStyle: gameState.colors[i],
                              strokeWidth: 5,
                              strokeDash: [5],
                              strokeDashOffset: 0,
                              opacity : 0.6,            
                              x1: xcors, y1: ycors, // Start point
                              x2: xcors + ((to.x*b)/100)*j, y2: ycors +((to.y*l)/100)*j
                            });


						});

					}

				});

                i++;

			});

            if ( j >= 1.0){

                j = 1;

            }else{

                j += 0.1;

            }


		}

		function drawMap(){

			

			drawScene();

			drawBots();

			drawScore();

			drawSignals();

		}

		
        
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(drawMap, 60);
        
       
       drawMap();
		
 
	}


});