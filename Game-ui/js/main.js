// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();

// Create the canvas	
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 800;//setting width
canvas.height = 450;//setting height
width = canvas.width;
height = canvas.height;
document.body.appendChild(canvas);
var startState;
var serverImages = [];
var lastTime;
var servers;
var colors = ['black','red','blue','green'];
var pattern;
var imageObj;
var server_status;
var count = 0;
var turntime = 10;
var turn =0;
var animate;
var next_connections;
var current_connections;
var current_servers;
var next_servers;

function drawBG(){
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = pattern;
    context.fill();
}

function drawServers(){
	//Have to check from the GAME_REPLAY. Currently just getting it from the game start
	for(var i =0;i<GAME_START.servers.length;i++){
		var x = (GAME_START.servers[i].pos[0])*width;
		var y = GAME_START.servers[i].pos[1]*height;
		var imgOBJ;
		switch(GAME_REPLAY[turn].servers[i].owner){
			case 0 :
				imgOBJ = serverImages[0];
				break;
			case 1 :
				imgOBJ = serverImages[1];
				break;
			case 2 :
				imgOBJ = serverImages[2];
				break;
			default :
				imgOBJ = serverImages[2];
				break;	
		}
		context.drawImage(imgOBJ,x,y)

	}
}

function drawHealth(){
	for(var i =0;i<GAME_START.servers.length;i++){
		var x = ((GAME_START.servers[i].pos[0])*width)+8;
		var y = (GAME_START.servers[i].pos[1]*height)+36;
		switch(GAME_REPLAY[turn].servers[i].owner){
			case 0 :
				context.fillStyle = colors[0];
				break;
			case 1 :
				context.fillStyle = colors[1];
				break;
			case 2 :
				context.fillStyle = colors[2];
				break;
			default :
				context.fillStyle = colors[2];
				break;	
		}
		context.font = '8pt Calibri';
		
      	context.fillText(Math.floor(servers[i].reserve), x, y);
	}
}

function drawSignals(){
	for(var i=0;i<connections.length;i++){
		var con = connections[i];
			var ratio = con.length/con.fdist;

			var dis_x = GAME_START.servers[con.sink].pos[0] - GAME_START.servers[con.src].pos[0] ;
			var dis_y = GAME_START.servers[con.sink].pos[1] - GAME_START.servers[con.src].pos[1];
			var point_x =  (GAME_START.servers[con.src].pos[0] + ratio*(dis_x))*width;
			var point_y =  (GAME_START.servers[con.src].pos[1] + ratio*(dis_y))*height;
			context.beginPath();
		        context.setLineDash([1,2]);
		        switch(GAME_REPLAY[turn].servers[con.src].owner){
					case 0 :
						context.strokeStyle = colors[0];
						break;
					case 1 :
						context.strokeStyle = colors[1];
						break;
					case 2 :
						context.strokeStyle = colors[2];
						break;
					default :
						context.strokeStyle = colors[2];
						break;	
				}

		        context.moveTo((GAME_START.servers[con.src].pos[0]*width)+12,(GAME_START.servers[con.src].pos[1]*height)+12);
		        context.lineTo(point_x+12,point_y+12);
		    context.stroke();
	}
}

function render(turn){
	drawBG();
	drawServers();
	drawHealth();
	drawSignals();
	if(turn == 84){
		console.log("turn");
				console.log(turn);
				console.log(connections);
	}
}

function main(){

	var current = Date.now();	
	var dt = (current - lastTime)/1000.0;
	lastTime = current;
	if((count % turntime == 0) && turn < GAME_REPLAY.length-1){
		turn++;
		animate = 0;
		current_servers = get_servers_status(turn);		
		servers_status = GAME_REPLAY[turn].alive;
		current_connections = get_connections(turn);
		if(turn <GAME_REPLAY.length -1){
			next_connections = get_connections(turn+1);
			next_servers = get_servers_status(turn+1);
		}
		connections = current_connections;
		servers = current_servers;
	}
	/*
	else{
		for(var i=0;i<next_connections.length;i++){
			connections[i].length = current_connections[i].length + (dt)*(next_connections[i].length -current_connections[i].length);
		}
		for(var i=0;i<servers.length;i++){
			servers[i].reserve +=  dt*(next_servers[i].reserve - servers[i].reserve);
		}
		animate  = ((count%turntime)/turntime);
		if(animate > 1){
			animate = 1;
		}
	}*/
	if(turn < GAME_REPLAY.length-1){
		count++;
		render(turn);
		requestAnimFrame(main);
	}else{
		$('#display_score').show( "slow", function() {
			var score = "";
			for(var i=0;i<GAME_START.bot_count;i++){
				score += "<p>Bot "+ (i+1) + ":"+ END_DATA.scores[i] +"</p>";
			}
		    $('#score').html(score);
		});
	}
	
	

}
 

 function init() {

    imageObj = new Image();
      imageObj.onload = function() {
        pattern = context.createPattern(imageObj, 'repeat');

        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = pattern;
        context.fill();
    };
    imageObj.src = 'img/terrain.png';

    
    for (var i = 0; i < GAME_START.servers.length; i++) {
    	serverImages.push(new Image());
    	serverImages[serverImages.length-1].src = "img/server"+ i +".png";   	
    };

    lastTime = Date.now();
    main();
}

init();