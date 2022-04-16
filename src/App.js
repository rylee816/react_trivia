import './App.css';
import {useState, useEffect} from "react"
import QuestionCard from './QuestionCard';

function App() {
const [questions, setQuestions] = useState([])
const [chosenAnswer, setChosenAnswer] = useState([])

async function getData(){
  let res = await fetch("https://opentdb.com/api.php?amount=10");
  let json = await res.json();
  setQuestions(json.results)
}

useEffect(() => {
  getData()
}, [])

function handleClick(inputs){
  console.log(inputs.forEach(el => console.log(el)))
}

function setChosen(item){
  console.log(item)
}

  return (
    <div className="App">
    {questions.map(question => {
      return <QuestionCard data={question} setChosen={setChosen}/>
    })}
    <button onClick={handleClick}>Check Answers!</button>
    </div>
  );
}

export default App;
