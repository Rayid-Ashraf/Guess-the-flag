
let countries = []
let countriesCode = []
let options = []
let optionsCode = []
let correctOption
let correctOptionCode
let randomNum
let index = 0
let localScore = 0
let flag = document.getElementById("flag")
let option0 = document.getElementById("option-a")
let option1 = document.getElementById("option-b")
let option2 = document.getElementById("option-c")
let option3 = document.getElementById("option-d")
let h2 = document.getElementsByTagName("h2")
let optionBoxes = document.getElementsByClassName("option")
let main = document.getElementById("main")
let result = document.getElementById("result")
let highScore = document.getElementById("high-score")
let score = document.getElementById("score")
let resultHighscore = document.getElementById("result-high-score")
let resultScore = document.getElementById("result-score")
let button = document.getElementById("button")
let localHighScore = localStorage.getItem("high-score")
let outof = document.getElementById("outof")

const ranNum = (max) => {
  let randomNum = Math.floor(Math.random() * max)
  return randomNum
}

const fetchData = () => {
  fetch("https://guesstheworldflags.netlify.app/script/code.json").then((response) => response.json())
    .then((data) => {
      for (let country in data) {
        countries.push(data[country]);
        countriesCode.push(country)
      }
      generateOptions()
    })
}
const generateOptions = () => {
  for (let index = 0; index < 4; index++) {
    let randomNum = ranNum(256)
    options.push(countries[randomNum])
    optionsCode.push(countriesCode[randomNum])
  }
  generateAnswer()
}
const generateAnswer = () => {
  randomNum = ranNum(4)
  correctOption = options[randomNum]
  correctOptionCode = optionsCode[randomNum]
  displayData()
}
const displayData = () => {
  flag.setAttribute("src", `https://flagcdn.com/${correctOptionCode}.svg`)
  for (let index = 0; index < 4; index++) {
    h2[index].innerHTML = options[index]
  }
}

const handleClick = (optionBox, option) => {
  if (option.innerHTML == correctOption) {
    option.style.color = "green"
    optionBox.style.borderColor = "green"
    localScore++
  } else {
    option.style.color = "red"
    optionBox.style.borderColor = "red"
    h2[randomNum].style.color = "green"
    optionBoxes[randomNum].style.borderColor = "green"
  }
  button.classList.remove("d-button")
  button.classList.add("button")
  button.removeAttribute("disabled")
}


const handleNext = () => {
  index++
  score.innerHTML = localScore
  outof.innerHTML = index
  if (index < 10){
    button.classList.remove("button")
    button.classList.add("d-button")
    button.setAttribute("disabled","disabled")
    options = []
    optionsCode = []
    for (let index = 0; index < 4; index++) {
      h2[index].style.color = "black"
      optionBoxes[index].style.borderColor = "black"
    }
    generateOptions()
  }
  else{
    handleResult()
  }
}
const handleResult = () =>{
  

  if (localHighScore == undefined || localScore > localHighScore){
    localStorage.setItem("high-score", localScore )
  }
  main.classList.add("hidden")
  result.classList.remove("hidden")
  resultScore.innerHTML = localScore
  resultHighscore.innerHTML = localHighScore == undefined ? localScore : localStorage.getItem("high-score")
}

addEventListener("load", fetchData);
