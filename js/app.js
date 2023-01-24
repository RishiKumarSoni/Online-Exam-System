let questionNumRef = document.getElementById('questionNum');
let quesRef = document.getElementById('ques');

let option1Ref = document.getElementById('option1');
let option2Ref = document.getElementById('option2');
let option3Ref = document.getElementById('option3');
let option4Ref = document.getElementById('option4');

let radio1 = document.getElementById('radio1');
let radio2 = document.getElementById('radio2');
let radio3 = document.getElementById('radio3');
let radio4 = document.getElementById('radio4');

let questionnaireRef = document.getElementById('questionnaire');

let previousRef = document.getElementById('previous');
let clearRef = document.getElementById('clear');
let nextRef = document.getElementById('next');
let submitRef = document.getElementById('submit');

let minuteRef = document.getElementById('minute');
let secondRef = document.getElementById('second');

let tbodyRef = document.getElementById('tbody');
let tfootRef = document.getElementById('tfoot');

let count = 0;
let text = [];
let result = [];
let finalArr = {attempted:0, unattempted:20, correct:0, incorrect:0, marks:0};

let questionsArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


//https://the-trivia-api.com/api/questions?limit=20&region=IN

function getQuestion() {
    fetch(`https://the-trivia-api.com/api/questions?limit=20&region=IN`)

    .then((response) => response.json())
    
    .then((data) => {
        result = data;
        updateQuestion()
    });
}

getQuestion();

function updateQuestion() {

    text = result[count];
    let a = text.incorrectAnswers[2];
    let b = text.correctAnswer;
    let c = text.incorrectAnswers[1];
    let d = text.incorrectAnswers[0];

    // console.log(text.question);
    // console.log(text.correctAnswer);

    questionNumRef.innerHTML = count+1;
    
    questionnaireRef.innerHTML = `

        
        <div id="question">
            <b><p id="ques">${text.question}</p></b>
        </div>

        <div id="options">
            <div class="option">
                <input type="radio" id="radio1" name="a" onclick='updateQuestionsArr(1, "${a}");'> <span id="option1" onclick="updateMarks('text.incorrectAnswers[1]');"> ${a}</span>
            </div>
            <div class="option">
                <input type="radio" id="radio2" name="a" onclick='updateQuestionsArr(2, "${b}");'> <span id="option2" onclick="updateMarks('text.correctAnswer}');"> ${b}</span>
            </div>
            <div class="option">
                <input type="radio" id="radio3" name="a" onclick='updateQuestionsArr(3, "${c}");'> <span id="option3" onclick="updateMarks('text.incorrectAnswers[0]');"> ${c}</span>
            </div>
            <div class="option">
                <input type="radio" id="radio4" name="a" onclick='updateQuestionsArr(4, "${d}");'> <span id="option4" onclick="updateMarks('text.incorrectAnswers[2]');"> ${d}</span>
            </div>
        </div>
    `;

    count += 1;
    
    // show and hide of previous and next buttons
    if(count === 1){
        previousRef.style.display = 'none';
    }else{
        previousRef.style.display = 'block';
    }

    if(count === 20){
        nextRef.style.display = 'none';
        submitRef.style.display = 'block';
    }else{
        submitRef.style.display = 'none';
    }
   
}

function updateQuestionsArr(i, ans){
    // let temp = [option1Ref.value, option2Ref.value, option3Ref.value, option4Ref.value];
    // let temp = option1Ref.innerHTML;
    // console.log(radio1.innerHTML);

    if(questionsArr[count] === 0){
        questionsArr[count] = i;
    }
    else{
        uncheck();
        questionsArr[count] = i;
    }

    if(ans == text.correctAnswer){
        finalArr.correct += 1;
        console.log('your answer is correct', ans);

    }
    else{
        finalArr.incorrect += 1;
        console.log('your answer is incorrect', ans);

    }

    console.log('option ', i, ' is selected');
    console.log(questionsArr);

}

function calculateMarks() {
    let temp = 0;
    for (let i = 0; i < questionArr.length; i++) {
        if(questionsArr[i] === 0){
            temp += 1;
        }
    }

    finalArr.unattempted = temp;
    finalArr.attempted = questionsArr.length - temp;
    
}

// 15 minute countdown timer
let timerLimit = new Date().getTime() + 1*60*1000;

var x = setInterval(function(){

    let now = new Date().getTime();
    let timePassed = timerLimit - now;

    // let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timePassed % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timePassed % (1000 * 60)) / 1000);

    minuteRef.innerHTML = minutes;
    secondRef.innerHTML = seconds;
    
    if(minutes === 0 && seconds === 0){
        console.log('timeout');
        window.location.href = "./final.html";
        // finalUpdate();
    }

}, 1000);

function finalUpdate() {
    tbodyRef.innerHTML = ``;
    tfootRef.innerHTML = ``;

    tbodyRef.innerHTML = `
        <tr>
            <td>${finalArr.attempted}</td>
            <td>${finalArr.unattempted}</td>
            <td>${finalArr.correct}</td>
            <td>${finalArr.incorrect}</td>
        </tr>
    `;

    tfootRef.innerHTML = `
        <tr>
            <td colspan="3">Total Marks</td>
            <td>${finalArr.marks}</td>
        </tr>   
    `;
}


// console.log(count);
// previous button code
function oldQuestion() {
    count -= 2;
    updateQuestion();
}


// clear radio buttons
function uncheck() {

    try{
        let temp = document.querySelector('input[type=radio][name=a]:checked');
        console.log(temp.checked);
        temp.checked = false;

    }
    catch(error){
        console.log('error:', error);
    }
        
}

