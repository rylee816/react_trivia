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

// Create a function to randomize the answers array
function setRandom(array) {
  let currentIndex = array.length,  randomIndex;

  // Shuffle remaining elements as long as current index > 0
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

// Create function to decode the html (some edge cases missing)
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
        '&pi;': '	π',
        '&Prime;': '′'
    };
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&eacute;|&rsquo;|&uuml;|&pi;|&Prime;/g, (m) => map[m]);
}
console.log(options)

async function getData(){
  //Make api call with "options" variable to set difficulty
  let url = !options || options === "mixed" ? "https://opentdb.com/api.php?amount=5" : `https://opentdb.com/api.php?amount=5&difficulty=${options}`;
  let res =  await fetch(url);
  let {results} = await res.json();

  //return an object with the main question and an array of 4 randomized answers and set it to state
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

// Fetch initial data and synch it with the difficulty level the user chooses
useEffect(() => {
  getData()
}, [options])


function setChosen(questionIndex, answerIndex) {
  // Ensure no answers can be selected after answers are checked
   if(!finalAnswers)
    // Loop through questions and toggle which answer was chosen
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
  //Set the game to be over when checking final answers
  setFinalAnswers(true)
  let result = 0;
  //Loop through questions and tally amount correct
  questions.forEach(question => {
    question.answers.forEach(answer => {
      if(answer.selected && answer.correct){
        result += 1
      }
    })
  })
  setNumCorrect(result)
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

function setDifficultyColor(difficulty){
  switch(difficulty){
    case "easy": 
     return {background: "lime"}

    case "medium":
     return {background: "blue"}
     
    case "hard":
      return {background: "red"}
    
    default:
      return {background: "purple"}
  }
}

  return gameStarted ? (
    <div className="App">
    <h1>Good Luck and Have Fun!</h1>
    <h2> Difficulty: <span style={setDifficultyColor(options)}><em>{options}</em></span></h2>
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
