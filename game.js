var gamePattern = [];
var userClickedPattern = [];
var count = 0;

var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];

$("body").on("keypress", function(event) {
  if (event.key === "a") {
    nextSequence();
    level++;
    $("h1").text("Level " + level);
    addbuttons();
    $("body").off("keypress");
  }
});


function restart() {
  gamePattern = [];
  userClickedPattern = [];

  level = 0;
  count = 0;

  nextSequence();
  level++;
  $("h1").text("Level " + level);
  $("body").off("keypress");
}


function nextSequence() {
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function addbuttons(){
  $(".btn").click(function(event) {
    count++;
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    console.log(count);
    console.log(event);
    console.log(gamePattern);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    $("div #" + userChosenColour).addClass("pressed");
    setTimeout(function() {
      $("#" + userChosenColour).removeClass("pressed");
    }, 100);
    var condition = checkAnswer();
    if (condition) {
      if (userClickedPattern.length == gamePattern.length) {
        userClickedPattern = [];
        setTimeout(function() {
          count = 0;
          level++;
          $("h1").text("Level " + level);
          nextSequence();
        }, 1000);
      }
    } else {
      $("body").off("keypress");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      $("body").on("keypress", function(event) {
        restart();
      });
    }
  });
}

function checkAnswer() {
  if(count > level){
    console.log(level);
    console.log(count);
    return false;
  }
  for (var i = 0; i < level;) {
    var state = userClickedPattern[i] == gamePattern[i];
    if (state) {
      if (i == level - 1) {
        return true;
      }
      else if (i < level - 1) {
        if (userClickedPattern.length <= gamePattern.length) {
          if(userClickedPattern[i + 1] != undefined) {
            i++;
          }
          else{
            return true;
          }
        }
        else {
          return false;
        }
      }
    } else {
        return false;
    }
  }
}
