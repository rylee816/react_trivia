import './App.css';
import {useState, useEffect} from "react"
import QuestionCard from './components/QuestionCard';
import TopSheet from './TopSheet';

function App() {
const [questions, setQuestions] = useState([])
const [finalAnswers, setFinalAnswers] = useState(false)
const [numCorrect, setNumCorrect] = useState(0)
const [gameStarted, setGameStarted] = useState(false)
const [options, setOptions] = useState(null)


function setRandom(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function decodeHtml(str){
    var map =
    {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
        '&eacute;': "é",
        '&rsquo;': "'",
        '&uuml;': 'ü',
        '&pi;': '	π'
    };
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&eacute;|&rsquo;|&uuml;|&pi;/g, (m) => map[m]);
}
console.log(options)

async function getData(){
  let url = !options || options === "mixed" ? "https://opentdb.com/api.php?amount=10" : `https://opentdb.com/api.php?amount=10&difficulty=${options}`;
  let res =  await fetch(url);
  let {results} = await res.json();

  console.log(results)

   setQuestions(results.map(question => {
    const answers = [
      {
        answer: decodeHtml(question.correct_answer),
        correct: true
      },
      ...question.incorrect_answers.map(answer => ({
        answer: decodeHtml(answer),
      }))
    ];
    return {
      question: decodeHtml(question.question),
      answers: setRandom(answers)
    }
  }))
}

useEffect(() => {
  getData()
}, [options])


function setChosen(questionIndex, answerIndex) {
  // If I'm checking the results I can't select answers anymore
   if(!finalAnswers)
    setQuestions(prev =>
      prev.map((question, index) => {
        if (index === questionIndex) {
          let answers = question.answers.map((answer, index) => {
            return { ...answer, selected: index === answerIndex};
          });
          return { ...question, answers };
        }
        return question;
      })
    );
    console.log(questions)
}


function checkAnswers(){
  setFinalAnswers(true)
  let result = 0;
  questions.forEach(question => {
    question.answers.forEach(answer => {
      if(answer.selected && answer.correct){
        result += 1
      }
    })
  })
  setNumCorrect(result)

  // return numCorrect
}

function setDifficulty(value){
  setOptions(prev => {
    if(prev === value){
      resetGame()
    }
    return value
  })
}


function toggleStartQuiz(){
  setFinalAnswers(false)
  setGameStarted(prev => !prev)
}

function resetGame(){
  setFinalAnswers(false)
  getData()
}

  return gameStarted ? (
    <div className="App">
    <h1>Good Luck and Have Fun!</h1>
    <h2> Difficulty: {options}</h2>
    {questions.map((question, index) => {
      return <QuestionCard
       key={index}
       id={index}
       question={question.question}  
       answers={question.answers}
       gameOver={finalAnswers} 
       setChosen={(answerIndex) => setChosen(index, answerIndex)}/>
    })}
    {finalAnswers ? <h1>You scored {numCorrect} out of {questions.length} correct!</h1> : ""}
    <button onClick={finalAnswers ? resetGame : checkAnswers}>{finalAnswers ? "Play Again!" : "Check Answers!"}</button>
    {finalAnswers && <button onClick={toggleStartQuiz}>Home/Choose Options</button>}
    </div>
  ) : <TopSheet setDifficulty={setDifficulty} startQuiz={toggleStartQuiz} />
}

export default App;
