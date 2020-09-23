var timer;
var interval;
var timeout;
var timeIsUp;
document.getElementsByClassName("startQuiz")[0].onclick=()=>startQuiz();

function startQuiz(){
  var timerElement=document.getElementsByClassName("time-seconds")[0];
  timer=parseInt((parseInt(timerElement.value)>parseInt(timerElement.max))?timerElement.max:(parseInt(timerElement.value)<parseInt(timerElement.min))?timerElement.min:timerElement.value);
  document.getElementsByClassName("container")[0].innerHTML="<div class=\"title\"><h1>Timed Coding Quiz</h1></div>"+
  "<div class=\"description\"><h3>Test yourself with this coding quiz.</h3></div>"+
  "<div class=\"timer\">Time left: "+timer+" seconds</div>"
  interval=setInterval(()=>{
    if(--timer==0) {
      clearInterval(interval);
      timeIsUp = document.createElement("div");
      timeIsUp.classList.add("time-is-up");
      timeIsUp.innerHTML="";
      timeIsUp.innerHTML+="Time is up.";
      var hideParagraph=document.createElement("p");
      hideParagraph.classList.add("hide");
      hideParagraph.innerHTML="Hide";
      timeIsUp.appendChild(hideParagraph);
      hideParagraph.onclick=()=>{if(timeIsUp) timeIsUp.remove();}
      document.getElementsByClassName("container")[0].appendChild(timeIsUp);
      timeout=setTimeout(()=>{if(timeIsUp) timeIsUp.remove();}, 5000);
    }
    document.getElementsByClassName("timer")[0].innerHTML="Time left: "+timer+" seconds";
  }, 1000);
}

function wrongAnswerGiven(penalty){
  timer-=penalty;
  document.getElementsByClassName("timer")[0].innerHTML="Time left: "+timer+" seconds";
}
