var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start=false;
$("html").on("keydown", function () {
  if(start===false){
    $("h1").text("Level "+level);
    nextSequence();
    start=true;
  }
});
function nextSequence() {
  userClickedPattern=[];
  level++
  $("h1").text("Level "+level);
  var randomNum = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColor[randomNum];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio;
  switch (name) {
    case "red":
      audio = new Audio("./sounds/red.mp3");
      audio.play();
      break;
    case "blue":
      audio = new Audio("./sounds/blue.mp3");
      audio.play();
      break;
    case "green":
      audio = new Audio("./sounds/green.mp3");
      audio.play();
      break;
    case "yellow":
      audio = new Audio("./sounds/yellow.mp3");
      audio.play();
      break;



    default: console.log(key);

  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");

  }, 100)
}


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    // console.log("success");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();

      },1000);
    }
  }
  else{
    // console.log("wrong");
    var audio=new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");

    },200);
    $("h1").text("Game Over, Press any Key to Restart");
    startOver();
  }
}
function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
  start=false;
}