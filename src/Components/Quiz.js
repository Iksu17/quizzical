import React from 'react'
import he from "he"
import shuffleArray from 'shuffle-array'
import {nanoid} from "nanoid"
import Answers from './Answers'


export default function Quiz(props) {
    //This is to lock answers so only one choice can be selected
    const [lock, setLock] = React.useState(false) 
    
    //creates an array of answer objects
    const [answersArray, setAnswersArray] = React.useState(props.answers.map(ans => {
        return {
            id: nanoid(),
            choice: ans,
            isSelected: false
        }
    }))

    
    // Called when player selects a choice. The lock state allows only one answer. 
    function holdChoice(id){
        if (!lock){
            setAnswersArray(prevChoice => prevChoice.map(choice =>{
                return choice.id === id ? 
                        {...choice, isSelected: !choice.isSelected}:
                        choice
            }))
            setLock(true)
        }
    }
    
    //Called by reset button. clears player choice and lock state set to false so new choice can be //selected.
    function resetAnswers(){
        setAnswersArray(prevChoice => prevChoice.map(choice =>{
                return {...choice, isSelected: false}
                        
            }))
            setLock(false)
    }

    //Creates props for Answers Component
    const choices = answersArray.map( ans => {
       return(
           <Answers 
                key={ans.id}
                id={ans.id}
                choice={ans.choice}
                isSelected={ans.isSelected}
                holdChoice={()=>holdChoice(ans.id)}
                checked={props.checkAnswers}
                correct_answer={props.correct_answer}
                addToScore={props.addToScore} 
                score={props.score}  
           />
       )
   })
    
    
    
    //Page setup for Quiz questions and multiple choices. 
    return(
        
        <div className="question-container">
            <h3 className="question">{props.question}</h3>
            
            <div className="answers-container">
                {choices}
                <button className="reset-btn" onClick={resetAnswers}>X</button>
            </div>
        </div>
    )
    
   
}