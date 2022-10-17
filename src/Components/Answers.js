import React from 'react'
import he from "he"
import shuffleArray from 'shuffle-array' 
import {nanoid} from "nanoid"


export default function Answers(props){
    let styles //Will control the color of the choices
    let check = 1
    
    if (props.checked){
        //If wrong answer this will give light green to show which choice is correct
        styles = {backgroundColor: props.choice === props.correct_answer ? 
                        "#daf1e0" : "white"} 
    } else{
        //if answers are not being checked, player choice will be higliged blue
        styles = {backgroundColor: props.isSelected ? "#98a1cd" : "white"}
        }
    
    //When checking answers if correct answer choice will be green if wrong answer choice will be red.
    if (props.checked){ 
        if (props.isSelected && props.choice === props.correct_answer){
            //console.log(props.id,  " >>>correct!<<< ", props.choice  )
            styles = {backgroundColor: "#57c16e"}
            check++
            
        }
        if (props.isSelected && props.choice !== props.correct_answer){
            //console.log(props.id, " >>>sorry wrong answer<<< ", props.correct_answer  )
            styles = {backgroundColor: "#F8BCBC"}
        }    
    }
    
    React.useEffect(() => {
        if (props.isSelected && props.choice === props.correct_answer){
            props.addToScore()
        }
    },[check])
   
    //Builds each multiple choice button Which I just made a paragraph. 
    //If I did this again, I would consider creating buttons or links (maybe)
    return   (
                <p 
                    className="answer" 
                    style={styles}
                    onClick={props.holdChoice}
                >
                    {he.decode(props.choice)}
                </p>
             )    
}
