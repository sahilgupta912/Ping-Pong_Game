
var canvas;
var canvasContext;
var ballX=60;
var ballY=60;
var ballSpeedX=10
var ballSpeedY=5;

var paddle1Y=250;
var paddle2Y=250;
var PADDLE_HEIGHT=100;
var PADDLE_THICKNESS=20;
var score1=0;
var score2=0;
var end=false;
var winScore=3;
var winShow=false;
var winStreak=0;

//main function     
function main(){

    console.log("Hello World!");
    canvas=document.getElementById('gameboard')
    canvasContext= canvas.getContext('2d');


    
    var framesPerSecond=30;

    draw();
    setInterval(function(){

        move();
        draw();

        score();

    },1000/framesPerSecond); 

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove',
                function(evt){
                    var mousePos= calculateMousePos(evt);
                    paddle1Y = mousePos.y-PADDLE_HEIGHT/2;
                })                        
}

function handleMouseClick(evt){

    if(winShow)
    {
        winShow=false;
        score1=0;
        score2=0;
    }

}

//function for score for both players
function score(){

    canvasContext.font = '150px Arial';
    canvasContext.fillStyle = '#383838';
    if(end)
    {
        end=false;
    }

    if(score1 >= winScore || score2 >= winScore)
    {
        end=true;
        winShow=true;
        return;
    }

    if(winShow)
        return;
    canvasContext.fillText(score1, 200, canvas.height/2);
    canvasContext.fillText(score2, 500,  canvas.height/2);



}

//function for getting mouse position
function calculateMousePos(evt){
    var rect= canvas.getBoundingClientRect();
    var root=document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return{
        x:mouseX,
        y:mouseY
    }
}

//function for paddle2 automatic movement
function paddle2Move(){
    var paddle2YCentre= paddle2Y+(PADDLE_THICKNESS/2);

    if(paddle2YCentre<ballY-20)
        paddle2Y += 6;
    else if(paddle2YCentre>ballY+20)
        paddle2Y -= 6;
}

//function for movement of all things throughout the canvas
function move(){

    if(winShow)
        return;
    paddle2Move();

    //for movement of ball in X-axis
    ballX += ballSpeedX;

    if(ballX>canvas.width-30)
    {
        if(ballY>paddle2Y-10 && ballY<paddle2Y+PADDLE_HEIGHT+10)
        {
            ballSpeedX=-ballSpeedX;
            var deltaY= ballY-(paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY= deltaY*0.35;
        }
        else
        {
            score1++;
            ballReset();
        }
    }
    if(ballX<35)
    {
        if(ballY>paddle1Y-10 && ballY<paddle1Y+PADDLE_HEIGHT+10)
        {
            ballSpeedX=-ballSpeedX;

            var deltaY= ballY-(paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY= deltaY*0.3;
        }
        else
        {
            score2++;
            ballReset();
        }
    }

    //for movement of ball in Y-axis
    ballY +=  ballSpeedY;

    if(ballY>canvas.height)
    {
        ballSpeedY=-ballSpeedY;
    }
    if(ballY< 1)
        ballSpeedY= -ballSpeedY;      
}

//function for reset the ball position when someone wins
function ballReset(){

    ballSpeedX=-ballSpeedX;
    ballSpeedY=5;
    ballX=canvas.width/2;
    ballY=canvas.height/2;
    paddle2Y=canvas.height/2-PADDLE_HEIGHT/2;
}

//functino for showing win screen
function winScreen(){

    winShow=false;
    drawRect(0,0,canvas.width,canvas.height,'black');  

    canvasContext.font = '30px Arial';  
    canvasContext.fillStyle="White";

    if(score1>score2)
    {

        canvasContext.fillText("You Won!", 300,300);



    }
    else
    {
        winStreak=0;
        canvasContext.fillText("You Lose!", 300, 300);

    }
    canvasContext.fillText("Click anywhere on the screen to continue",150,500)
    ballReset();
}

//function for drawing the canvas, ball and paddle
function draw(){

    if(winShow)
    {
        winScreen();                
        return;
    }
    // this is black canvas
    drawRect(0,0,canvas.width,canvas.height,'black');
    
    // this is left player paddle
    drawRect(5,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

    //this is right player paddle
    drawRect(canvas.width-25,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');


    // this is green ball
    drawCircle(ballX,ballY,10,'yellow');
    for(var i=0;i<canvas.height;i+=40)
    {
        drawRect(canvas.width/2-1,i,2,10,'white');
    }

}

function drawRect(leftX, topY, width, height, color){

    canvasContext.fillStyle= color;
    canvasContext.fillRect(leftX, topY,width,height);

}

function drawCircle(centreX, centreY,r,color){

    canvasContext.fillStyle=color;
    canvasContext.beginPath();
    canvasContext.arc(centreX, centreY, r ,0,Math.PI*2,true);
    canvasContext.fill();
}


