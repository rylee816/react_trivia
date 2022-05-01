import Answer from './Answer'

function QuestionCard(props) {
console.log(props)

  return (
    <div className='QuestionCard'>
        <h3>{props.question}</h3>
        {props.answers.map((answer, index) => (
            <Answer 
            key={index}
            id={props.id} 
            correct={answer.correct}
            setChosen={() => props.setChosen(index)}
            chosen={!!answer.selected}
            answer={answer.answer}
            gameOver={props.gameOver}
            />
            
            ))}
    </div>
  )
}

export default QuestionCard