var canvas = document.getElementById("myCanvas");
		var context = canvas.getContext("2d");


		var drops = [];

		function rain() {
			for(var i=0;i<=400;i++){
				drops.push({
					x: Math.floor(Math.random()*canvas.width),
					y: 0,
					width: 0,
					height: Math.floor(Math.random()*10),
					yspeed: Math.floor(Math.random()*40)+1,
					xspeed: Math.floor(Math.random()*2)
				})
			}
		    
		}

		function show(){
			context.clearRect(0, 0, canvas.width, canvas.height);
			for(var i=0;i<400;i++){
				context.beginPath();
				context.rect(drops[i].x, drops[i].y, drops[i].width, drops[i].height);
				context.strokeStyle = "#FFFFFF ";
				context.stroke();
			}
			fall();
		}

		function fall(){
			for(var j=0;j<400;j++){
				drops[j].y += drops[j].yspeed;
				drops[j].x += drops[j].xspeed;


				if(drops[j].y>canvas.height){
					drops[j].y = 0;
					drops[j].x = Math.floor(Math.random()*canvas.width)
				}
			}
		}

		setInterval(show,30);