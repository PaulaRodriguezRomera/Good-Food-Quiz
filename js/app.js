(function() {
  const myQuestions = [
    { 
      id: 1,
      question: "These three simple ingredients make one of the healthiest and tastiest salads. What do you get with basil, tomato, and mozzarella?",
      answers: {
        a: "Greek salad",
        b: "Caprese salad",
        c: "Summer salad",
      },
      correctAnswer: "b", 
      img: "images/food/capresesalad.jpeg",
    },
    {
      id: 2,
      question: "A balanced breakfast is the key to a good day! What is made from an English muffin, poached egg, bacon, and Hollandaise sauce?",
      answers: {
        a: "Burguer",
        b: "Eggs benedict",
        c: "Scottish breakfast",
      },
      correctAnswer: "b", 
      img: "images/food/eggsbenedict.jpeg",
    },
    {
      id: 3,
      question: "This meal can come with many more ingredients.But at its simplest, it includes a large tortilla, cheese, salsa, and maybe some chichen.",
      answers: {
        a: "Burritos",
        b: "Wrap",
        c: "Quesadillas",
      },
      correctAnswer: "c", 
      img: "images/food/quesadillas.jpeg",
    },
  ];

  function buildQuiz() {
    // Place to store the HTML output
    const output = [];

    // for each question
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // Store the list of answer choices
      const answers = [];

      // For each available answer
      for (letter in currentQuestion.answers) {
        // HTML radio button
        answers.push(
          `<label>
               <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
             </label>`
        );
      }

      // Question and its answers added to the output
      output.push(
        `<div class="slide">
            <div class="id">${currentQuestion.id}</div>
            <div id="img"> <img src="${
              currentQuestion.img
            }" alt="food image" width="200" height="200"/></div>
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
           </div>`
      );
    });

    // Output list combined into one string of HTML
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // Answer containers from quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // Track of user's answers
    let numCorrect = 0;

    // For each question
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // Selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // If answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // Add number of correct answers
        numCorrect++;

        // Color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // If answer is wrong or blank
        // Color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // Number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // Quiz display
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // On submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();


