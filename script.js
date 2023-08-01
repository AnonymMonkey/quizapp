let questions = [
    {
        "question": "Was ist die grundlegende Sprache, die für das Strukturieren von Webseiten verwendet wird?",
        "answer_1": "HTML",
        "answer_2": "CSS",
        "answer_3": "JavaScript",
        "answer_4": "Python",
        "right_answer": 1
    },
    {
        "question": "Welche Sprache wird verwendet, um das Aussehen einer Webseite zu gestalten?",
        "answer_1": "HTML",
        "answer_2": "CSS",
        "answer_3": "JavaScript",
        "answer_4": "Java",
        "right_answer": 2
    },
    {
        "question": "Welche Sprache wird verwendet, um Webseiten interaktiv zu gestalten und mit Benutzern zu interagieren?",
        "answer_1": "HTML",
        "answer_2": "CSS",
        "answer_3": "JavaScript",
        "answer_4": "C++",
        "right_answer": 3
    },
    {
        "question": "Wie kann man in HTML einen Absatz erstellen?",
        "answer_1": "&lt;ptag>",        /* < ist gleich &lt; oder &60; ... > ist gleich &62; */
        "answer_2": "&lt;paragraph>",
        "answer_3": "&lt;p>",
        "answer_4": "&lt;para>",
        "right_answer": 3
    },
    {
        "question": "Wie definiert man eine CSS-Klasse in einem Stylesheet?",
        "answer_1": "#myClass {}",
        "answer_2": ".myClass {}",
        "answer_3": "class:myClass {}",
        "answer_4": "/'myClass/': {}",
        "right_answer": 2
    },
    {
        "question": "Welche Methode wird verwendet, um eine Schleife in JavaScript zu erstellen?",
        "answer_1": "while",
        "answer_2": "loop",
        "answer_3": "for",
        "answer_4": "if",
        "right_answer": 3
    },
    {
        "question": "Was ist die korrekte Art, eine JavaScript-Datei in einem HTML-Dokument einzubinden?",
        "answer_1": "&lt;script src=/'script.js/'>",
        "answer_2": "&lt;javascript src=/'script.js/'>",
        "answer_3": "&lt;js src=/'script.js/'>",
        "answer_4": "&lt;script href=/'script.js/'>",
        "right_answer": 1
    }
]

let rightQuestions = 0;

let currentQuestion = 0;

let AUDIO_RIGHT = new Audio('sounds/right.mp3');
let AUDIO_WRONG = new Audio('sounds/wrong.mp3');
let AUDIO_RESTART = new Audio('sounds/restart.mp3');

function init() {
    document.getElementById('quizlength').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        /* TODO: Show Endscreen */
        showEndscreen();
    } else { /* show question */
        progressBar();

        let question = questions[currentQuestion];

        document.getElementById('questiontext').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];
    }
}

function progressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);        /* mit math.round(ergebnis); wird das ergebnis gerundet und somit sind hier die nachkommastellen weg */
    document.getElementById('progressbar').innerHTML = `${percent}%`;
    document.getElementById('progressbar').style.width = `${percent}%`;
    console.log('fortschritt', percent);
}

function showEndscreen() {
    document.getElementById('endscreen').style = '';
    document.getElementById('winnerbg').style = '';
    document.getElementById('questionbody').style = 'display: none;';

    document.getElementById('totalanswers').innerHTML = questions.length;
    document.getElementById('rightanswers').innerHTML = rightQuestions;

    document.getElementById('cardimg').src = 'img/trophy.png';
}


function answer(x) {
    let answer = document.getElementById(x);
    let question = questions[currentQuestion];
    let rightAnswer = question['right_answer'];
    let questionAnswerToNumber = x.slice(-1);

    let idOfRightAnswer = document.getElementById(`answer_${rightAnswer}`);

    if (questionAnswerToNumber == rightAnswer) {        /* richtige frage beantwortet */
        answer.parentNode.classList.add('bg-success');
        rightQuestions++;
        AUDIO_RIGHT.play();
    } else {                                            /* falsche frage beantwortet */
        answer.parentNode.classList.add('bg-danger');
        idOfRightAnswer.parentNode.classList.add('bg-success');
        AUDIO_WRONG.play();
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;  // erhöt den wert von z.B. 0 auf 1
    document.getElementById('currentquizlength').innerHTML = currentQuestion + 1;
    resetCard();
    showQuestion();
}

function resetCard() {
    let answer1 = document.getElementById('answer_1');
    let answer2 = document.getElementById('answer_2');
    let answer3 = document.getElementById('answer_3');
    let answer4 = document.getElementById('answer_4');

    answer1.parentNode.classList.remove('bg-success', 'bg-danger');
    answer2.parentNode.classList.remove('bg-success', 'bg-danger');
    answer3.parentNode.classList.remove('bg-success', 'bg-danger');
    answer4.parentNode.classList.remove('bg-success', 'bg-danger');

    document.getElementById('next-button').disabled = true;
}

function restartQuiz() {
    rightQuestions = 0;
    currentQuestion = 0;

    document.getElementById('cardimg').src = 'img/green-question.jpg';

    document.getElementById('endscreen').style = 'display: none;';
    document.getElementById('winnerbg').style = 'display: none;';
    document.getElementById('questionbody').style = '';
    document.getElementById('currentquizlength').innerHTML = currentQuestion + 1;
    AUDIO_RESTART.play();
    init();
}