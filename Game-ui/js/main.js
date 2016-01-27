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
var connections;
var server_status;
var count = 0;
var turntime = 100;
var turn =0;

function drawBG(){
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = pattern;
    context.fill();
}

function drawServers(){
	//Have to check from the REPLAY. Currently just getting it from the game start
	for(var i =0;i<GAME_START.servers.length;i++){
		var x = (GAME_START.servers[i].pos[0])*width;
		var y = GAME_START.servers[i].pos[1]*height;
		context.drawImage(serverImages[i],x,y);
		console.log(serverImages[i]);
	}
}

function drawHealth(){
	for(var i =0;i<GAME_START.servers.length;i++){
		var x = ((GAME_START.servers[i].pos[0])*width)-20;
		var y = (GAME_START.servers[i].pos[1]*height)+34;
		context.font = '6pt Calibri';
		context.fillStyle = colors[i];
      	context.fillText(servers[i].reserve, x, y);
		console.log(serverImages[i]);
	}
}

function drawSignals(){
	for(var i=0;i<connections.length;i++){
		var con = connections[i];
		console.log(con);
			var ratio = con.length/con.fdist;

			var dis_x = GAME_START.servers[con.sink].pos[0] - GAME_START.servers[con.src].pos[0] ;
			var dis_y = GAME_START.servers[con.sink].pos[1] - GAME_START.servers[con.src].pos[1];
			var point_x =  (GAME_START.servers[con.src].pos[0] + ratio*(dis_x))*width;
			var point_y =  (GAME_START.servers[con.src].pos[1] + ratio*(dis_y))*height;
			context.beginPath();
		        context.setLineDash([1,2]);
		        context.strokeStyle = "black";
		        context.moveTo((GAME_START.servers[con.src].pos[0]*width)+12,(GAME_START.servers[con.src].pos[1]*height)+12);
		        context.lineTo(point_x+12,point_y+12);
		    context.stroke();
	}
}

function render(turn){
	servers = get_servers_status(turn);	
	servers_status = REPLAY[turn].alive;
	connections = get_connections(turn);
	drawBG();
	drawServers();
	drawHealth();
	drawSignals();
}

function main(){

	var current = Date.now();	
	var dt = (current - lastTime)/1000.0;
	lastTime = current;
	if(count % turntime == 0){
		turn++;
	}
	if(turn > 30){
		turn = 30;
	}
	count++;
	console.log(turn);
	render(turn);
	requestAnimFrame(main);

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

    //reset();
    lastTime = Date.now();
    //start();
    main();
}

init();