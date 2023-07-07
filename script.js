// Defines Canvas Stuff

const canvas =  document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")
document.body.appendChild(canvas)

canvas.width = 450
canvas.height = 300

// Makes The Class "Thing"

class Thing{
	constructor(y, radius) {
		// x will always be half the canvas width
		this.x = canvas.width/2
		this.y = y
		// will make the radius
		this.rad = radius
		// this.controllable will be true when the flappy thing can be controlled
		this.controllable = true
		this.a = true
		this.jumping = 0
		this.graviting = 4
	}

	draw(ctx) {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.rad, 0, Math.PI*2)
		ctx.fill()
	}

	control() {
		// do some weird stuff that only I know what means
		this.a = true
		if(this.controllable==true){
			window.addEventListener("keydown", (e) => {
				if(this.a){
					this.a = false
					if(e.code=="Space"){
						this.jumping = this.graviting+5
					}
				}
			})
		}
	}

	jump(){
		if(this.jumping<0.2){
			this.jumping = 0
		} else {
			this.y-=this.jumping
			this.jumping-=0.2
		}
	}

	gravity(){
			this.y+=this.graviting
	}
}

// Pipe variables
const pipeWidth = 80;
const pipeGap = 200;
const pipeHeightRange = [50, canvas.height - pipeGap - 50];
let pipes = [];
let frameCount = 0;

// Function to create a new pipe
function createPipe() {
  const pipeHeight = Math.floor(Math.random() * (pipeHeightRange[1] - pipeHeightRange[0])) + pipeHeightRange[0];
  const pipe = {
    x: canvas.width,
    y: 0,
    width: pipeWidth,
    height: pipeHeight
  };
  pipes.push(pipe);
}

// Function to move the pipes
function movePipes() {
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x--;
    if (pipes[i].x + pipeWidth === 0) {
      pipes.shift();
    }
  }
}

// Function to update the pipe heights
function updatePipeHeights() {
  for (let i = 0; i < pipes.length; i++) {
    if (frameCount % 100 === 0) {
      pipes[i].baseHeight = pipes[i].height;
    }
    pipes[i].height = pipes[i].baseHeight + Math.floor(Math.random() * 5) - 2; // Randomly change height by -2 to 2 pixels

    if (pipes[i].height < pipeHeightRange[0]) {
      pipes[i].height = pipeHeightRange[0];
    } else if (pipes[i].height > pipeHeightRange[1]) {
      pipes[i].height = pipeHeightRange[1];
    }
  }
}

// Function to draw the pipes
function drawPipes() {
  ctx.fillStyle = "#000000";
  for (let i = 0; i < pipes.length; i++) {
    ctx.fillRect(pipes[i].x, pipes[i].y, pipeWidth, pipes[i].height);
    ctx.fillRect(pipes[i].x, pipes[i].height + pipeGap, pipeWidth, canvas.height - pipes[i].height - pipeGap);
  }
}

// Defines thing as a Thing
const thing = new Thing(150, 15)
// animates the scene
function animate(){
	// clears the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	// makes the player have controls
	thing.control()
	thing.jump()
	thing.gravity()
	// draws the player/thing
	thing.draw(ctx)
  
  if (frameCount % 300 === 0) {
    createPipe();
  }
  
  updatePipeHeights();
  movePipes();
  drawPipes();
  
  frameCount++;
	// plays every 60th of a second
	requestAnimationFrame(animate)
}

// calls animate function
animate()