function setTimer(){
    console.log('set tier should be working');
    var x = setInterval(function(){

        let now = new Date().getTime;
        let timePassed = timerLimit - now;

        // let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timePassed % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timePassed % (1000 * 60)) / 1000);

        minuteRef.innerHTML = minutes;
        secondRef.innerHTML = seconds;

        if(timePassed < 0){
            document.getElementById("submit").click();
        }
    }, 1000);
}