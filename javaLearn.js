const soru = new Quiz(sorular);

let txt = document.querySelector(".header-text");
let btn = document.querySelector(".btn-start");
let nextBtn = document.querySelector(".next_btn ");
let quizBox = document.querySelector(".quiz_box");
let scoreBox = document.querySelector(".score_box");
let scoreText = document.querySelector(".score_text");
let btnTekrar = document.querySelector(".btn_replay");
let btnSonlandr = document.querySelector(".btn_quit");
let timeText = document.querySelector(".time_text");
let timeScond = document.querySelector(".time_second");
let timeLine=document.querySelector(".time_line");

btn.addEventListener("click", function () {
  nextBtn.classList.remove("active");
  startTimer(10);
  startTimerLine()
  quizBox.classList.add("active");
  soruGoster(soru.soruGetir());
  soruSayisiniGoster(soru.soruIndex + 1, sorular.length);
});

const option_list = document.querySelector(".option_list");

function soruGoster(soru) {
  let question = `<span>${soru.soruMetni}</span>`;
  let options = ``;

  for (let cevap in soru.soruCevaplar) {
    options += `
        <div class="option"> 
            <span><b>${cevap}</b>-)${soru.soruCevaplar[cevap]}</span>

        </div>
    `;
  }

  document.querySelector(".question_text").innerHTML = question;
  option_list.innerHTML = options;

  const option = option_list.querySelectorAll(".option");

  for (let opt of option) {
    opt.setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(option) {
  clearInterval(counter);
  clearInterval(counterLine);
  let cevap = option.querySelector("span b").textContent;
  let aktifSoru = soru.soruGetir();

  if (aktifSoru.cevabKontrol(cevap)) {
    option.classList.add("correct");
    let keyCode = `<div class="icon"><i class="fas fa-check"></i></div>`;
    option.insertAdjacentHTML("beforeend", keyCode);
    soru.dogruSayisi += 1;
  } else {
    option.classList.add("incorrect");
    let keyCode = `<div class="icon"><i class="fas fa-times"></i></div>`;
    option.insertAdjacentHTML("beforeend", keyCode);
  }

  for (i = 0; i < option_list.children.length; i++) {
    option_list.children[i].classList.add("disabled");
  }

  nextBtn.classList.add("active");
}

nextBtn.addEventListener("click", function () {
  if (soru.soruIndex + 1 != sorular.length) {
    document.querySelector(".quiz_box").classList.add("active");
    soru.soruIndex += 1;
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(10);
    startTimerLine();
    soruGoster(soru.soruGetir());
    nextBtn.classList.remove("active");
    soruSayisiniGoster(soru.soruIndex + 1, sorular.length);
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    finalScore(sorular.length, soru.dogruSayisi);
    scoreBox.classList.add("active");
    quizBox.classList.remove("active");
  }
});

function soruSayisiniGoster(soruSirasi, toplamSoru) {
  let tag = ` <span class="badge bg-primary">${soruSirasi} / ${toplamSoru}</span>`;
  let soruSayac = (document.querySelector(".question_index").innerHTML = tag);
}

function finalScore(soruSayisi, dogruCevap) {
  let temp = ` <span> Toplam ${soruSayisi} sorudan ${dogruCevap} dogru cevap verildi</span>`;
  scoreText.innerHTML = temp;
}

btnTekrar.addEventListener("click", function () {
  soru.dogruCevap = 0;
  soru.soruIndex = 0;
  btn.click();
  scoreBox.classList.remove("active");
});

btnSonlandr.addEventListener("click", function () {
  window.location.reload();
});


let counter;

function startTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    let keyCode = `<div class="icon"><i class="fas fa-check"></i></div>`;
    timeScond.textContent = time;
    time -= 1;
    if (time < 0) {
      clearInterval(counter);
      timeText.textContent = "Süre Bitti";

      let cevap = soru.soruGetir().dogruCevap;

      for (let option of option_list.children) {
        if (option.querySelector("span b").textContent == cevap) {
          option.classList.add("correct");
          option.insertAdjacentHTML("beforeend", keyCode);
          option.classList.add("disabled");
        }
        option.classList.add("disabled");
      }
      nextBtn.classList.add("active");
    }
  }
}

let counterLine;

function startTimerLine(){
  let line_width=0;
  counterLine=setInterval(timer,20);

  function timer(){
    line_width+=1;
    timeLine.style.width=line_width+"px";

    if(line_width>549){
      clearInterval(counterLine);
    }
    

  }
}