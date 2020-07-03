window.addEventListener("load", function () {
  const randomQuoteApi = "https://api.quotable.io/random";
  const displayQuote = document.querySelector("#displayQuote");
  const typeQuote = document.querySelector("#typeQuote");
  const counter = document.querySelector('#counter');

  typeQuote.addEventListener("input", function () {
    const arrDisplayQuote = displayQuote.querySelectorAll("span");
    const arrTypeQuote = typeQuote.value.split("");
    let correct = true;
    arrDisplayQuote.forEach((element, index) => {
      const character = arrTypeQuote[index];
      if (character == null) {
        element.classList.remove("correct");
        element.classList.remove("incorrect");
        correct = false;
      } else if (character === element.innerText) {
        element.classList.add("correct");
        element.classList.remove("incorrect");
    } else {
        element.classList.add("incorrect");
        element.classList.remove("correct");
        correct=false;
      }
    });
    if(correct){
        getNextQuote()
    }
  });

  function getRandomQuote() {
    return fetch(randomQuoteApi)
      .then((response) => response.json())
      .then((data) => data.content);
  }

  async function getNextQuote() {
    const quote = await getRandomQuote();
    displayQuote.innerHTML = " ";
    // break displayQuote in individual element
    quote.split("").forEach((character) => {
      const letter = document.createElement("span");
      letter.innerText = character;
      displayQuote.appendChild(letter);
    });
    typeQuote.value = null;
    setTimer()
  }

  let startTimer
  function setTimer(){
    counter.innerText = 0;
    startTimer = new Date()
    setInterval(()=>{
        counter.innerText = getCounterTime()
    },1000)
  }

  function getCounterTime(){
    return Math.floor((new Date() - startTimer)/1000)
  }

  getNextQuote();
});
