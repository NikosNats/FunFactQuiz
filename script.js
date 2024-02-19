let questions = [
    {
    num: 1,
    question: "What does HTML stand for?🤔",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },
    {
    num: 2,
    question: "What does CSS stand for?🤔",
    answer: "Cascading Style Sheet",
    options: [
      "Counter Strike: Source",
      "Constant State of Suffering",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
    {
    num: 3,
    question: "Which programming language is used in machine learning?🤔",
    answer: "Python (not the snake)",
    options: [
      "Python (the snake)",
      "C++",
      "Python (not the snake)",
      "Assembly"
    ]
  },
    {
    num: 4,
    question: "What is bubble sort algorithm used for?🤔",
    answer: "Sorting elements in ascending order",
    options: [
      "Sorting elements in ascending order",
      "Create bubbles",
      "Find the maximum value in an array",
      "Convert binary to decimal"
    ]
  },
    {
    num: 5,
    question: "What does a kernel does in an operating system?🤔",
    answer: "It is the core component that manages system resources",
    options: [
      "It provides a file system",
      "It manages user interfaces",
      "It is the core component that manages system resources",
      "Creates popcorn"
    ]
  },
];

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");  
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");  
}

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");  
    quiz_box.classList.add("activeQuiz");  
    showQuetions(0);  
    queCounter(1);  
    startTimer(15);  
    startTimerLine(0);  
}

let timeValue =  15;
let que_count = 0;
let que_num = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");  
    result_box.classList.remove("activeResult");  
    timeValue = 15; 
    que_count = 0;
    que_num = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count);  
    queCounter(que_num);  
    clearInterval(counter);  
    clearInterval(counterLine);  
    startTimer(timeValue);  
    startTimerLine(widthValue);  
    timeText.textContent = "Time Left";  
    next_btn.classList.remove("show");  
}

quit_quiz.onclick = ()=>{
    window.location.reload();  
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){  
        que_count++;  
        que_num++;  
        showQuetions(que_count);  
        queCounter(que_num);  
        clearInterval(counter);  
        clearInterval(counterLine);  
        startTimer(timeValue);  
        startTimerLine(widthValue);  
        timeText.textContent = "Time Left";  
        next_btn.classList.remove("show");  
    }else{
        clearInterval(counter);  
        clearInterval(counterLine);  
        showResult();  
    }
}

function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>'+ questions[index].num + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;  
    option_list.innerHTML = option_tag;  
    
    const option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
 
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter);  
    clearInterval(counterLine);  
    let userAns = answer.textContent;  
    let correcAns = questions[que_count].answer;  
    const allOptions = option_list.children.length;  
    
    if(userAns == correcAns){  
        userScore += 1;  
        answer.classList.add("correct");  
        answer.insertAdjacentHTML("beforeend", tickIconTag);  
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect");  
        answer.insertAdjacentHTML("beforeend", crossIconTag);  
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){  
                option_list.children[i].setAttribute("class", "option correct");  
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);  
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");  
    }
    next_btn.classList.add("show");  
}

function showResult(){
    info_box.classList.remove("activeInfo");  
    quiz_box.classList.remove("activeQuiz");  
    result_box.classList.add("activeResult");  
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){  
         
        let scoreTag = '<span>and you nailed it, you got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p>🤩</span>';
        scoreText.innerHTML = scoreTag;   
    }
    else if(userScore > 1){  
        let scoreTag = '<span>and you did good, you got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p>😁</span>';
        scoreText.innerHTML = scoreTag;
    }
    else{  
        let scoreTag = '<span>and you can do better, you got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p>😔</span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;  
        time--;  
        if(time < 9){  
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero;  
        }
        if(time < 0){  
            clearInterval(counter);  
            timeText.textContent = "Time Off";  
            const allOptions = option_list.children.length;  
            let correcAns = questions[que_count].answer;  
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){  
                    option_list.children[i].setAttribute("class", "option correct");  
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);  
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");  
            }
            next_btn.classList.add("show");  
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;  
        time_line.style.width = time + "px";  
        if(time > 549){  
            clearInterval(counterLine);  
        }
    }
}

function queCounter(index){
     
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;   
}
