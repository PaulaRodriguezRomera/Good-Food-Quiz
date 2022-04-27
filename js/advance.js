(function() {
  const myQuestions = [
    {
      id: 7,
      question: "Very popular snack made from fried dough pastry, cut into sausage shapes and doused in sugar.",
      answers: {
        a: "German sausages",
        b: "Churros",
        c: "Mozzarella sticks",
      },
      correctAnswer: "b", 
      img: "images/food/churros.jpeg",
    },

    {
      id: 8,
      question: "You have these ingredients for Saturday night supper! What will you make with ground beef, beans, chopped onion, tomato sauce, and a whole lot of spices?",
      answers: {
        a: "Chilli con carne",
        b: "Bolognese",
        c: "Tomato soup'",
      },
      correctAnswer: "a", 
      img: "images/food/chilliconcarne.jpeg",
    },

    {
      id: 9,
      question: "This is a baked custard dessert topped with a melted sugar crust. With a velvety and pudding-like texture, this burnt cream dessert is so dreamy!",
      answers: {
        a: "Tiramisu",
        b: "Creme Brulee",
        c: "Apple Pie",
      },
      correctAnswer: "b", 
      img: "images/food/cremebrule.jpeg",
    },

    {
      id: 10,
      question: "This is a traditional Scottish pudding, similar to a trifle. It is layered dessert, consisting of whipped cream, toasted oats, and juicy raspberries.",
      answers: {
        a: "Scones",
        b: "Cranachan",
        c: "Shortbread",
      },
      correctAnswer: "b", 
      img: "images/food/cranachan.jpeg",
    },
  ];
  function buildQuiz() {
    // Place to store the HTML output
    const output = [];


    // for each question.
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // Store the list of answer choices
      const answers = [];

      // For each available answer
      for (letter in currentQuestion.answers) {
        //HTML radio button
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
      // selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // number of correct answers out of total
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

  // display quiz 
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
