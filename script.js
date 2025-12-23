// 1) قائمة الأسئلة (20 سؤال جاهزين)
const questions = [
  { question: "What is the capital of France?",
    answers: ["Lyon", "Paris", "Marseille", "Nice"],
    correctIndex: 1 },
  { question: "What is the capital of Egypt?",
    answers: ["Alexandria", "Giza", "Cairo", "Luxor"],
    correctIndex: 2 },
  { question: "What is the capital of Germany?",
    answers: ["Frankfurt", "Hamburg", "Berlin", "Munich"],
    correctIndex: 2 },
  { question: "What is the capital of Spain?",
    answers: ["Barcelona", "Madrid", "Valencia", "Seville"],
    correctIndex: 1 },
  { question: "What is the capital of Italy?",
    answers: ["Milan", "Rome", "Naples", "Turin"],
    correctIndex: 1 },
  { question: "What is the capital of the United Kingdom?",
    answers: ["Manchester", "London", "Birmingham", "Liverpool"],
    correctIndex: 1 },
  { question: "What is the capital of the United States?",
    answers: ["New York City", "Washington, D.C.", "Los Angeles", "Chicago"],
    correctIndex: 1 },
  { question: "What is the capital of Canada?",
    answers: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    correctIndex: 3 },
  { question: "What is the capital of Brazil?",
    answers: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
    correctIndex: 1 },
  { question: "What is the capital of Japan?",
    answers: ["Osaka", "Tokyo", "Kyoto", "Nagoya"],
    correctIndex: 1 },
  { question: "What is the capital of India?",
    answers: ["Mumbai", "New Delhi", "Kolkata", "Bangalore"],
    correctIndex: 1 },
  { question: "What is the capital of Australia?",
    answers: ["Sydney", "Melbourne", "Brisbane", "Canberra"],
    correctIndex: 3 },
  { question: "What is the capital of Russia?",
    answers: ["Saint Petersburg", "Kazan", "Moscow", "Novosibirsk"],
    correctIndex: 2 },
  { question: "What is the capital of China?",
    answers: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen"],
    correctIndex: 0 },
  { question: "What is the capital of Mexico?",
    answers: ["Guadalajara", "Mexico City", "Monterrey", "Puebla"],
    correctIndex: 1 },
  { question: "What is the capital of Turkey?",
    answers: ["Istanbul", "Ankara", "Izmir", "Bursa"],
    correctIndex: 1 },
  { question: "What is the capital of Saudi Arabia?",
    answers: ["Jeddah", "Mecca", "Riyadh", "Medina"],
    correctIndex: 2 },
  { question: "What is the capital of South Africa?",
    answers: ["Cape Town", "Durban", "Pretoria", "Johannesburg"],
    correctIndex: 2 },
  { question: "What is the capital of Argentina?",
    answers: ["Córdoba", "Rosario", "Buenos Aires", "Mendoza"],
    correctIndex: 2 },
  { question: "What is the capital of Thailand?",
    answers: ["Chiang Mai", "Bangkok", "Phuket", "Pattaya"],
    correctIndex: 1 }
];

// 2) متغيرات الحالة
let currentQuestion = 0;
let score = 0;

// 3) عناصر الـ HTML
const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const progressDiv = document.getElementById("progress");
const resultDiv = document.getElementById("result");

// 4) عرض سؤال
function showQuestion() {
  resultDiv.textContent = "";
  resultDiv.className = "";
  nextBtn.disabled = true;
  answersDiv.innerHTML = "";

  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  progressDiv.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.className = "answer-btn";
    btn.addEventListener("click", () => selectAnswer(index));
    answersDiv.appendChild(btn);
  });
}

// 5) عند اختيار إجابة
function selectAnswer(selectedIndex) {
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === q.correctIndex) {
      btn.classList.add("correct");
    }
    if (index === selectedIndex && index !== q.correctIndex) {
      btn.classList.add("wrong");
    }
  });

  if (selectedIndex === q.correctIndex) {
    score++;
  }

  nextBtn.disabled = false;
}

// 6) زر Next أو نهاية الكويز
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    // نهاية الكويز
    questionText.textContent = "Quiz finished!";
    answersDiv.innerHTML = "";
    nextBtn.style.display = "none";
    progressDiv.textContent = "";

    const percent = Math.round((score / questions.length) * 100);
    let message = "";
    let moodClass = "";

    if (percent >= 80) {
      message = "Amazing! 🎉 You are a capitals master!";
      moodClass = "result-excellent";
    } else if (percent >= 50) {
      message = "Good job 🙂 Keep practicing and you’ll get even better.";
      moodClass = "result-good";
    } else {
      message = "Don’t worry 😢 Try again and you’ll improve!";
      moodClass = "result-poor";
    }

    resultDiv.textContent =
      `Your score is ${score} out of ${questions.length} (${percent}%).\n${message}`;
    resultDiv.className = moodClass;

    showCelebration(moodClass);
  }
});

// 7) تأثير بسيط حسب النتيجة
function showCelebration(moodClass) {
  const container = document.querySelector(".quiz-container");

  if (moodClass === "result-excellent") {
    container.classList.add("celebrate-strong");
    setTimeout(() => container.classList.remove("celebrate-strong"), 800);
  } else if (moodClass === "result-good") {
    container.classList.add("celebrate-soft");
    setTimeout(() => container.classList.remove("celebrate-soft"), 800);
  } else if (moodClass === "result-poor") {
    container.classList.add("sad-shake");
    setTimeout(() => container.classList.remove("sad-shake"), 800);
  }
}

// 8) تشغيل أول سؤال
showQuestion();
