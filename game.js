var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").click(function() {
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log("User Clicked Pattern: " + userClickedPattern);
  checkAnswer(userClickedPattern.length -1);
});

var started = false;
$(document).keypress(function(event) {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
function checkAnswer(currentLevel) {

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

      console.log("sucess");

      if(userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    }
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      console.log("wrong");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

function nextSequence() {
  userClickedPattern = [];
  //next level
  level++;
  $("#level-title").text("Level " + level);
  //Generate a random color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  //add a flash animation on the chosen button and play an audio effect
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");

  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}
