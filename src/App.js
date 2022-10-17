import React from 'react'
import Quiz from './Components/Quiz'
import he from "he"
import {nanoid} from "nanoid"
import shuffleArray from 'shuffle-array'
import './App.css';

function App() {
    // States
    const [quizData, setQuizData] = React.useState([]) //Holds Quiz data from api
    const [loadQuiz, setLoadQuiz] = React.useState(true) //When true new questions are fetched from api
    const [checkAnswers, setCheckAnswers] = React.useState(false)//When true Answers are checked
    const [score, setScore] = React.useState(0) // keeps the score of correct answers
    const [startQuizApp, setStartQuizApp] = React.useState(false) // Controls start screen
    
    //Fetches questions from API, creates an object and adds the objects to the quizData state
    React.useEffect(() => {
            if(!loadQuiz){
              return
            }
 
            fetch("https://opentdb.com/api.php?amount=5&category=17&difficulty=medium&type=multiple")
              .then(res => res.json())
              .then(data => setQuizData(data.results.map(questions => {
                return {
                  id: nanoid(),
                  question: questions.question,
                  correct_answer: questions.correct_answer,
                  answers: [...questions.incorrect_answers, questions.correct_answer ]
                }
              })))
              setLoadQuiz(false)
   
      }, [quizData])
    
    //Is called from the Answers Component. Sets the final correct answer score 
    function addToScore(){
      setScore(score => score + 1)
      
   }  
    
    //Props for Quiz Component
     const questions = quizData.map(quest => {
       return (
         <Quiz 
            key={quest.id}
            id={quest.id}
            question={he.decode(quest.question)}
            correct_answer={he.decode(quest.correct_answer)}
            answers={shuffleArray(quest.answers)} //shuffles with Fisher Yates Algorithm
            checkAnswers={checkAnswers}
            addToScore={addToScore}
            score={score}
         />
       )
     })
     
  //If checkAnswers is true, it will reset everything and fetch new questions from the api 
  //This is for the New Game button
  //If checkAnswers is false, it will switch the check answers bool
  //This is for the Answers component. When check answers is switched to true. Answers Compnent //will check the answer choices. 
   function checkingAnswers(){
     if(checkAnswers){
       setCheckAnswers(!checkAnswers)
       setQuizData([])
       setLoadQuiz(true)
       setScore(0)
     }else{
       setCheckAnswers(!checkAnswers)
     }
   }
   
  //This is for the Start Quiz button in start page. When called start page will be disabled and //main page will be displayed.
   function startQuiz(){
     setStartQuizApp(true)
   }
   
   //Page set up
    return (
      <div>
        <div style={{display: !startQuizApp ? "flex" : "none"}} className="start-page">
            <h1>Quizzical</h1>
            <button className="button" onClick={startQuiz}>Start Quiz</button>
        </div>
        <main style={{display: startQuizApp ? "block" : "none"}} className="main-page">
          <h1 className="heading">Quizzical!!!</h1>
          {questions}
          <div className="check-answers">
              {checkAnswers && <p className="score">Score: {score} / 5</p>}
              <button className="button" onClick={checkingAnswers}>{checkAnswers ? "New Game" : "Check Answers"}</button>
          </div>
        </main>
      </div>
    )
}

export default App;
