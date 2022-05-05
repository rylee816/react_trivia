import React from 'react'

function TopSheet(props) {

    function toggleActive(){
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

    function handleChange(e){
        const {name, value} = e.target;
        
        props.setDifficulty({[name]: value})
    }

  return (
    <div className='TopSheet'>
        <h1>Quizzical</h1>
        {/* <label htmlFor="difficulty">Difficulty</label> */}
        <select name="difficulty" id="difficulty" onChange={handleChange}>
            {/* <option value="null">Difficulty</option> */}
            <option value="mixed">Mixed</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
        <button className='start' onClick={props.startQuiz}>Start Quiz!</button>
    </div>
  )
}

export default TopSheet