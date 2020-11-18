var colors = document.querySelectorAll(".gameEasy");
var disappear = document.querySelectorAll(".disappear");
var displayColor = document.getElementById("displayColor");
var jumbotron = document.getElementsByClassName("jumbotron")[0];
var message = document.getElementById("message");
var newColor = document.getElementById("newColor");
var easy = document.getElementById("easy");
var hard = document.getElementById("hard");

var redArray = [];
var greenArray = [];
var blueArray = [];



function randomColor(){
	var red = Math.floor(Math.random() * 220);
	var green = Math.floor(Math.random() * 220);
	var blue = Math.floor(Math.random() * 220);

	redArray.push(red);
    greenArray.push(green);
    blueArray.push(blue);
	
	var RED = red.toString(16);
	if(RED.length==1){
		RED = "0" + RED;
	}
    var GREEN = green.toString(16);
    if(GREEN.length==1){
		GREEN = "0" + GREEN;
	}
    var BLUE = blue.toString(16);
    if(BLUE.length==1){
		BLUE = "0" + BLUE;
	}

    var rgb = RED + GREEN + BLUE;
    var shade = "#" + rgb;
    return shade;
}
newColor.textContent = "NEW COLORS";

function execution(){
	if(this.style.background!=displayColor.textContent){
		this.style.background = "#232323";
		message.classList.add("label-danger");
		message.textContent = "Try Again";
	}
	else{
		for(var j=0;j<colors.length ; j++){
			colors[j].style.background = this.style.background;
		}
		jumbotron.style.background = this.style.background;
		message.classList.remove("label-danger");
		message.classList.add("label-success");
		message.textContent = "Correct!!";
		newColor.textContent = "PLAY AGAIN";
	}
}

easy.addEventListener("click", function(){
	for(var i=0 ; i<colors.length ; i++){
		colors[i].removeEventListener("click",execution);
	}
	colors =  document.querySelectorAll(".gameEasy");
	for(var i=0; i<disappear.length ;i ++){
		disappear[i].style.background = "#232323";
	}

    run(colors);
});

hard.addEventListener("click", function(){
	colors =  document.querySelectorAll(".game");
	run(colors);
});

newColor.addEventListener("click", function(){
	run(colors);
});




function run(colors){
	newColor.textContent = "NEW COLORS";
	message.classList.remove("label-danger");
	message.classList.remove("label-success");
	redArray.length = 0;  
	greenArray.length = 0;
    blueArray.length = 0;
	for(var i=0;i<colors.length;i++){
		colors[i].style.background = randomColor();
	}

	var index = Math.floor(Math.random() * colors.length);
	displayColor.textContent ="rgb(" +  redArray[index] + ", " + greenArray[index] + ", " + blueArray[index] + ")";

	for(var i=0 ; i<colors.length ; i++){
		colors[i].addEventListener("click",execution);
	}
	
}

run(colors);