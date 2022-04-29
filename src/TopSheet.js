import React from 'react'

function TopSheet(props) {

    function toggleActive(e){
    options.forEach(option => {
        if(option === this){
            option.setAttribute("disabled", true)
        }
        else option.removeAttribute("disabled")
    })
}
    
    let options = document.querySelectorAll("option");
    options.forEach(option => {
        option.addEventListener("click", toggleActive)
    })

  return (
    <div>
        <h1>Quizzical</h1>
        {/* <label htmlFor="difficulty">Difficulty</label> */}
        <select id="difficulty" onChange={(e) => props.setDifficulty(e.target.value)}>
            <option value="null">Difficulty</option>
            <option value="mixed">Mixed</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
        <button onClick={props.startQuiz}>Start Quiz</button>
    </div>
  )
}

export default TopSheet