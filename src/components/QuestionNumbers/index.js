import './index.css'
import {useState} from 'react'

const QuestionNumber = props => {
  const {questionNumberCount, handleQuestionClick} = props
  const numbers = Array.from(Array(questionNumberCount).keys())

  //   const [activeNumber, setActiveNumber] = useState('')
  const [attemptedQuestion, setAttemptedQuestion] = useState([])

  const handleButtonClick = number => {
    // setActiveNumber(number)
    handleQuestionClick(number)

    if (!attemptedQuestion.includes(number)) {
      setAttemptedQuestion([...attemptedQuestion, number])
    }
  }

  const isAttemptedQuestion = number => attemptedQuestion.includes(number)
  //   console.log(isAttemptedQuestion)

  return (
    <li>
      {numbers.map(number => (
        <button
          key={number}
          type="button"
          onClick={() => handleButtonClick(number)}
          className={
            isAttemptedQuestion(number) ? 'number-class active' : 'number-class'
          }
        >
          {number + 1} {/* Display the correct question number */}
        </button>
      ))}
    </li>
  )
}

export default QuestionNumber
