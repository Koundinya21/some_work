// import Timer from '../Timer'
import QuestionNumber from '../QuestionNumbers'
import './index.css'

const QuestionsBtn = props => {
  const {
    currentQuestion,
    questionsData,
    handleQuestionClick,
    total,
    ClickSubmitBtn,
  } = props
  const onClickOfSubmit = () => {
    ClickSubmitBtn()
  }

  return (
    <div className="background-card">
      <div>
        <div className="question-count-container">
          <div className="content1">
            <p className="question-number">{currentQuestion}</p>
            <p className="question-content">Answered Questions</p>
          </div>
          <div className="content2">
            <p className="question-number color-number">
              {`${total - currentQuestion}`}
            </p>
            <p className="question-content">Unanswered Questions</p>
          </div>
        </div>
        <hr className="line-between-question-numbers" />
        <div className="question-numbers-submit-button-container">
          <div>
            <h1 className="questions">{`Questions (${total})`}</h1>
            <ul className="numbers-list">
              <QuestionNumber
                questionNumberCount={questionsData.length}
                handleQuestionClick={handleQuestionClick}
              />
            </ul>
          </div>
        </div>
      </div>
      <button type="button" className="btn-submit" onClick={onClickOfSubmit}>
        Submit Assessment
      </button>
    </div>
  )
}
export default QuestionsBtn
