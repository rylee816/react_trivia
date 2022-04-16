import React, {useState, useEffect} from 'react'

function QuestionCard({data, setChosen}) {
const [answers, setAnswers] = useState([])

function setRandomCorrectAnswer(){
    let resArray = [];
    let randomNum = Math.floor(Math.random() * data.incorrect_answers.length)
    data.incorrect_answers.forEach(answer => {
         resArray.push({answer: decodeHtml(answer), chosen: false, correct: false})
        })
        let start = resArray.slice(0, randomNum);
        let end = resArray.slice(randomNum)
        setAnswers([...start, {answer: decodeHtml(data.correct_answer), chosen: false, correct: true}, ...end])
    }
 
useEffect(() => {
    setRandomCorrectAnswer()
}, [data.question])




function toggleChosen(e){

    // for testing purposes
    if(e.target.innerText === data.correct_answer){
        console.log("CORRECT!")
    } else {
        console.log("Incorrect!")
    }
    // toggle the "chosen" property on current answers obj to "true"
    setAnswers(prev => {
        return prev.map(el => {
        return el.answer === e.target.innerText ? {...el, chosen: true} : {...el, chosen: false}
    })
    })
    setChosen(answers.filter(answer => answer.chosen))
}

// decode HTML for proper display
  function decodeHtml(str)
{
    var map =
    {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
        '&eacute;': "é",
        '&rsquo;': "'"
    };
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&eacute;|&rsquo;/g, (m) => map[m]);
}

  return (
    <div>
        <h2>{decodeHtml(data.question)}</h2>
        {answers.map(el => <p style={{color: el.chosen ? "red" : "black"}} onClick={toggleChosen}>{el.answer}</p>)}
    </div>
  )
}

export default QuestionCard