import React from 'react'
import "../App.css"

function Answer(props) {
   
    function createStyles(){
      let styles;
      if(props.chosen && !props.gameOver){
        styles = {
          background:"navy",
          boxShadow: "0px 5px 10px grey",
          border: "1px solid transparent",
          color: "white",
        }
      }
      if(props.gameOver && props.chosen && !props.correct){
        styles = {
          background: "red",
          border: "1px solid transparent",
          color: "white"
        }
      }
      if(props.gameOver && !props.chosen && props.correct){
        styles = {
          background: "lime",
          boxShadow: "0px 5px 10px grey",
          border: "none",
          color: "white"
        }
      }
      if(props.gameOver && props.chosen && props.correct){
        styles = {
          background: "lime",
          boxShadow: "0px 5px 10px grey",
          border: "1px solid transparent",
          color: "white"
        }
      }
      return styles
    }
 
  return (
    <button className='Answer'
     style={createStyles()}
      onClick={props.setChosen}>{props.answer}
      </button>
  )
}

export default Answer