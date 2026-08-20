/* =========================================
   NO_PHISHING
   Simulação educativa de phishing

   IMPORTANTE:
   Nenhuma informação é armazenada.
   Nenhuma informação é enviada.
========================================= */


/* =========================================
   VARIÁVEIS
========================================= */

let score = 0;

let decisionMade = false;

let currentQuestion = 0;

let quizScore = 0;


/* =========================================
   CONTROLE DAS TELAS
========================================= */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    const target =
        document.getElementById(id);


    if (target) {

        target.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


/* =========================================
   INICIAR SIMULAÇÃO
========================================= */

function startSimulation() {

    score = 0;

    quizScore = 0;

    currentQuestion = 0;

    decisionMade = false;

    showScreen("inbox");

}


/* =========================================
   DECISÃO DO USUÁRIO
========================================= */

function evaluateDecision(decision) {

    if (decisionMade) {

        return;

    }


    decisionMade = true;


    const feedback =
        document.getElementById(
            "decision-feedback"
        );


    let message = "";


    if (decision === "phishing") {

        score += 30;


        message = `
            <strong>✓ Boa decisão!</strong><br><br>

            Você identificou corretamente que a mensagem
            apresenta características típicas de phishing.

            <br><br>

            <small>
            +30 pontos
            </small>
        `;

    }


    else if (decision === "duvida") {

        score += 15;


        message = `
            <strong>⚠ Sua cautela foi positiva.</strong><br><br>

            Quando uma mensagem parece suspeita, não ter
            certeza é melhor do que clicar imediatamente.

            <br><br>

            <small>
            +15 pontos
            </small>
        `;

    }


    else {

        score += 0;


        message = `
            <strong>✕ Atenção!</strong><br><br>

            Esta mensagem foi criada para representar
            uma tentativa de phishing.

            Alguns sinais importantes foram:

            <br><br>

            • domínio suspeito;<br>
            • senso de urgência;<br>
            • solicitação de ação sensível.

            <br><br>

            <small>
            +0 pontos
            </small>
        `;

    }


    feedback.innerHTML = message;

    feedback.classList.remove("hidden");


    const continueButton =
        document.getElementById(
            "continue-after-decision"
        );


    continueButton.classList.remove("hidden");

}


/* =========================================
   MOSTRAR INDICADORES
========================================= */

function showIndicators() {

    showScreen("indicators");

}


/* =========================================
   LOGIN CENOGRÁFICO
========================================= */

function openFakeLogin() {

    showScreen("fake-login");

}


/* =========================================
   FORMULÁRIO CENOGRÁFICO
========================================= */

const fakeForm =
    document.getElementById(
        "fake-login-form"
    );


fakeForm.addEventListener(
    "submit",
    function(event) {

        /*
            Impede completamente o envio.

            Não existe:
            fetch()
            XMLHttpRequest
            banco de dados
            localStorage
            servidor
            API
        */

        event.preventDefault();


        /*
            Limpa os campos imediatamente.
        */

        document
            .getElementById("fake-email")
            .value = "";

        document
            .getElementById("fake-password")
            .value = "";


        showScreen("simulation-result");

    }
);


/* =========================================
   BANCO DE PERGUNTAS
========================================= */

const questions = [

    {

        question:
            "Qual elemento desta mensagem é um forte indicador de phishing?",

        options: [

            "A presença de um aviso de urgência.",

            "A mensagem possuir texto.",

            "O e-mail possuir uma assinatura.",

            "A mensagem ter um assunto."

        ],

        correct: 0,

        explanation:
            "O senso de urgência é frequentemente utilizado para pressionar a vítima a agir sem analisar a mensagem."

    },


    {

        question:
            "O que deve ser feito ao receber uma mensagem suspeita?",

        options: [

            "Clicar rapidamente para evitar o bloqueio.",

            "Responder informando seus dados.",

            "Verificar o remetente e o endereço do link.",

            "Encaminhar para todos os contatos."

        ],

        correct: 2,

        explanation:
            "Uma boa prática é verificar cuidadosamente o remetente, o endereço do link e, quando necessário, acessar o serviço diretamente pelo canal oficial."

    },


    {

        question:
            "Qual atitude é mais segura quando uma mensagem solicita sua senha?",

        options: [

            "Informar a senha imediatamente.",

            "Utilizar a mesma senha em outro site.",

            "Enviar a senha por e-mail.",

            "Não fornecer a senha e verificar a solicitação por um canal oficial."

        ],

        correct: 3,

        explanation:
            "Credenciais não devem ser fornecidas apenas porque uma mensagem solicita. A solicitação deve ser verificada por um canal oficial."

    }

];


/* =========================================
   INICIAR QUIZ
========================================= */

function startQuiz() {

    currentQuestion = 0;

    quizScore = 0;

    showScreen("quiz");

    loadQuestion();

}


/* =========================================
   CARREGAR PERGUNTA
========================================= */

function loadQuestion() {

    const question =
        questions[currentQuestion];


    document.getElementById(
        "question-number"
    ).textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;


    document.getElementById(
        "question-text"
    ).textContent =
        question.question;


    const optionsContainer =
        document.getElementById(
            "quiz-options"
        );


    optionsContainer.innerHTML = "";


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");


            button.className =
                "quiz-option";


            button.textContent =
                option;


            button.addEventListener(
                "click",
                () => answerQuestion(index)
            );


            optionsContainer.appendChild(
                button
            );

        }
    );


    document
        .getElementById("quiz-feedback")
        .classList.add("hidden");


    document
        .getElementById("next-question")
        .classList.add("hidden");

}


/* =========================================
   RESPONDER QUESTÃO
========================================= */

function answerQuestion(selected) {

    const question =
        questions[currentQuestion];


    const options =
        document.querySelectorAll(
            ".quiz-option"
        );


    options.forEach(
        button => {

            button.disabled = true;

        }
    );


    if (selected === question.correct) {

        quizScore += 20;

        score += 20;


        options[selected]
            .classList.add("correct");

    }

    else {

        options[selected]
            .classList.add("wrong");


        options[question.correct]
            .classList.add("correct");

    }


    const feedback =
        document.getElementById(
            "quiz-feedback"
        );


    feedback.innerHTML = `

        <strong>
            ${selected === question.correct
                ? "✓ Resposta correta!"
                : "✕ Resposta incorreta."
            }
        </strong>

        <br><br>

        ${question.explanation}

    `;


    feedback.classList.remove("hidden");


    const next =
        document.getElementById(
            "next-question"
        );


    next.textContent =
        currentQuestion === questions.length - 1
            ? "VER RESULTADO"
            : "PRÓXIMA PERGUNTA";


    next.classList.remove("hidden");

}


/* =========================================
   PRÓXIMA QUESTÃO
========================================= */

function nextQuestion() {

    currentQuestion++;


    if (currentQuestion >= questions.length) {

        showFinalResult();

        return;

    }


    loadQuestion();

}


/* =========================================
   RESULTADO FINAL
========================================= */

function showFinalResult() {

    showScreen("final");


    document.getElementById(
        "final-score"
    ).textContent = score;


    const classification =
        document.getElementById(
            "classification"
        );


    if (score >= 80) {

        classification.innerHTML = `

            🟢 <strong>
            BOM NÍVEL DE IDENTIFICAÇÃO
            </strong>

            <br><br>

            Você demonstrou boa capacidade de
            identificar sinais associados ao phishing.

        `;

    }


    else if (score >= 50) {

        classification.innerHTML = `

            🟡 <strong>
            ATENÇÃO: ALGUNS SINAIS FORAM IGNORADOS
            </strong>

            <br><br>

            Você identificou alguns indicadores,
            mas ainda pode melhorar sua análise.

        `;

    }


    else {

        classification.innerHTML = `

            🔴 <strong>
            ALTO RISCO
            </strong>

            <br><br>

            Vários indicadores passaram despercebidos.
            Em situações reais, é importante analisar
            cuidadosamente antes de clicar.

        `;

    }

}


/* =========================================
   REINICIAR
========================================= */

function restartSimulation() {

    score = 0;

    quizScore = 0;

    currentQuestion = 0;

    decisionMade = false;

    showScreen("home");

}