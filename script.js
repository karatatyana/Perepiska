const Game = {

  score: 0,
  timeLeft: 300,
  timerInterval: null,

  init() {
    this.startTimer();
  },

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeLeft--;

      let min = Math.floor(this.timeLeft / 60);
      let sec = this.timeLeft % 60;

      document.getElementById("timer").textContent =
        `${min}:${sec.toString().padStart(2, "0")}`;

      if (this.timeLeft <= 0) {
        this.finish(false);
      }
    }, 1000);
  },

  selectCharacter(type) {

    let scenario = "";

    if (type === "client") {
      scenario = `
        <h2>Кейс: Ответ клиенту</h2>
        <p>Клиент недоволен задержкой проекта. Напишите ответ.</p>
        <textarea id="answer"></textarea>
        <button onclick="Game.evaluate('client')">Отправить</button>
      `;
    }

    if (type === "colleague") {
      scenario = `
        <h2>Кейс: Письмо коллеге</h2>
        <p>Коллега просит срочно подготовить отчет. Ответьте корректно.</p>
        <textarea id="answer"></textarea>
        <button onclick="Game.evaluate('colleague')">Отправить</button>
      `;
    }

    if (type === "director") {
      scenario = `
        <h2>Кейс: Письмо директору</h2>
        <p>Вам нужно запросить дополнительный бюджет. Сформулируйте письмо.</p>
        <textarea id="answer"></textarea>
        <button onclick="Game.evaluate('director')">Отправить</button>
      `;
    }

    document.getElementById("content").innerHTML = scenario;
  },

  evaluate(type) {

    const text = document.getElementById("answer").value;

    let points = 0;

    if (text.length > 100) points += 10;
    if (text.includes("Здравствуйте")) points += 10;
    if (text.includes("С уважением")) points += 10;

    this.score += points;
    document.getElementById("score").textContent = this.score;

    this.finish(true);
  },

  finish(success) {

    clearInterval(this.timerInterval);

    SCORM.setScore(this.score);
    SCORM.complete(success);

    document.getElementById("content").innerHTML = `
      <h2>Курс завершён</h2>
      <p>Ваш результат: ${this.score} баллов</p>
      <button onclick="location.reload()">Пройти снова</button>
    `;
  }

};

Game.init();
