var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level=0;


$(document).keypress(
  function(){
    if(!started){
      nextSequence();
      started = true;
    }
  }
);


$(".btn").click(
  function(){
      var userChosenColor = $(this).attr("id");
      userClickedPattern.push(userChosenColor);
      playSound(userChosenColor);
      animatePress(userChosenColor);
      checkAnswer(userClickedPattern.length-1);
      }

);


// functions
function nextSequence(){
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("."+randomChosenColor).fadeIn(300).fadeOut(300).fadeIn(300);
  playSound(randomChosenColor);
  userClickedPattern = [];
  level++;
}

function playSound(name){
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(
    function(){
      $("."+currentColor).removeClass("pressed");
    },100
  );
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence(),1000);
      userClickedPattern = [];
    }
  }else{
    startOver();

    setTimeout(
      function(){
        $("body").removeClass("game-over");}
    ,200);
  }
}

function startOver(){
  $("body").addClass("game-over");
  $("h1").text("Game over, Press Any Key to Restart");
  started = false;
  gamePattern = [];
  level = 0;
}
