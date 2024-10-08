import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'

import QuestionsBtn from '../QuestionsBtn'

import OptionsContent from '../Options'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Assessment extends Component {
  state = {
    questionsData: [],
    apiStatus: apiStatusConstants.initial,
    currentQuestion: 0,
    selectedOptionId: '',
    score: 0,
    timerMinutes: 10,
    elapsedTimeInSeconds: 0,
    isTimeRunning: false,
    total: 0,
  }

  componentDidMount() {
    this.requestingQuestions()
    this.renderTimerComponent()
  }

  componentWillUnmount() {
    this.clearInterval()
  }

  clearInterval = () => clearInterval(this.timerId)

  IncrementOfElapsedTime = () => {
    const {history} = this.props
    const {isTimeRunning} = this.state
    const {elapsedTimeInSeconds, timerMinutes, score} = this.state
    const timerCompleted = timerMinutes * 60 === elapsedTimeInSeconds
    console.log(isTimeRunning)
    if (timerCompleted) {
      clearInterval()

      history.replace('/results', {
        isTimeRunning: false,
        elapsedTimeInSeconds,
        score,
      })
    } else {
      this.setState(prev => ({
        elapsedTimeInSeconds: prev.elapsedTimeInSeconds + 1,
      }))
    }
  }

  renderTimerComponent = () => {
    this.timerId = setInterval(this.IncrementOfElapsedTime, 1000)
  }

  renderCompletedTime = () => {
    const {elapsedTimeInSeconds, timerMinutes} = this.state
    const timeRemaining = timerMinutes * 60 - elapsedTimeInSeconds

    const Min = Math.floor(timeRemaining / 60)
    const Sec = Math.floor(timeRemaining % 60)

    const stringifiedMin = Min > 9 ? Min : `0${Min}`
    const StringifiedSec = Sec > 9 ? Sec : `0${Sec}`

    return timeRemaining > 0 && `00:${stringifiedMin}:${StringifiedSec}`
  }

  renderTimer = () => (
    <div className="time-container">
      <p className="heading">Time Left</p>
      <p className="time">{this.renderCompletedTime()}</p>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" width="50" height="50" />
    </div>
  )

  requestingQuestions = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/assess/questions'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)

      const updatedData = fetchedData.questions.map(question => ({
        id: question.id,
        optionsType: question.options_type,
        questionsText: question.question_text,
        options: question.options.map(option => ({
          imageUrl: option.image_url,
          idOption: option.id,
          text: option.text,
          isCorrect: option.is_correct,
        })),
      }))
      const totalQuestions = fetchedData.total

      this.setState({
        apiStatus: apiStatusConstants.success,
        questionsData: updatedData,
        total: totalQuestions,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dowxofd2k/image/upload/v1706372545/ugqa3jsdrqmpgseeyt8v.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something went wrong</h1>
      <p className="failure-para">We are having some trouble</p>
      <Link to="/assessment">
        <button type="button">Retry</button>
      </Link>
    </div>
  )

  toFindIndexOfTrue = () => {
    const {questionsData, currentQuestion} = this.state

    const displayingOneQuestion = questionsData[currentQuestion]
    const optionsValue = displayingOneQuestion.options

    function toFindTrue(option) {
      return option.isCorrect === 'true'
    }

    return optionsValue.find(toFindTrue)
  }

  checkTheAnswer = () => {
    const {selectedOptionId} = this.state
    const CorrectValue = this.toFindIndexOfTrue()
    console.log(CorrectValue.idOption)
    console.log('CHecking')
    if (CorrectValue.idOption === selectedOptionId) {
      this.setState(prev => ({
        score: prev.score + 1,
      }))
    }
  }

  increaseCount = () => {
    const {questionsData, currentQuestion} = this.state

    if (currentQuestion < questionsData.length) {
      this.setState(prev => ({
        currentQuestion: prev.currentQuestion + 1,
        selectedOptionId: '',
      }))
      this.checkTheAnswer()
    } else {
      console.log('Ended')
    }
  }

  //   setActiveOption = optionId => {
  //     this.setState({selectedOptionId: optionId})
  //   }

  changeOption = optionId => {
    this.setState({selectedOptionId: optionId})
  }

  onChangeOption = optionId => {
    this.setState({selectedOptionId: optionId})
    console.log(optionId)
  }

  ClickSubmitBtn = () => {
    const {history} = this.props
    clearInterval()

    const {score, elapsedTimeInSeconds} = this.state
    history.replace('/results', {
      score,
      isTimeRunning: true,
      elapsedTimeInSeconds,
    })
  }

  handleQuestionClick = questionIndex => {
    this.setState({currentQuestion: questionIndex})
  }

  renderQuestions = () => {
    const {
      questionsData,
      currentQuestion,
      selectedOptionId,
      score,
      total,
    } = this.state

    const displayingOneQuestion = questionsData[currentQuestion]
    const optionsValue = displayingOneQuestion.options

    const NumberOfQuestions = questionsData.length
    console.log(selectedOptionId)

    console.log(NumberOfQuestions)
    console.log(score)
    console.log(total)
    return (
      //   <div className="Main-Background">
      //     <div>
      //       <div className="container">
      //         <div className="questions-Container">
      //           <div className="space-between-btn-questions">
      //   <p className="question">
      //     {currentQuestion + 1}.{displayingOneQuestion.questionsText}
      //   </p>

      //             <hr className="line" />

      //   <OptionsContent
      //     optionType={displayingOneQuestion.optionsType}
      //     options={optionsValue}
      //     changeOption={this.changeOption}
      //     activeOption={selectedOptionId}
      //     onChangeOption={this.onChangeOption}
      //   />
      //           </div>

      // {currentQuestion < 9 && (
      //   <div className="button-container">
      //     <button
      //       type="button"
      //       className="next-button"
      //       onClick={this.increaseCount}
      //     >
      //       Next Question
      //     </button>
      //   </div>
      // )}
      //         </div>

      //         <div>
      //           <div>{this.renderTimer()}</div>
      //           <div className="questions-btn-space">
      //             <QuestionsBtn
      //               currentQuestion={currentQuestion}
      //               questionsData={questionsData}
      //               handleQuestionClick={this.handleQuestionClick}
      //               questions={questions}
      //             />
      // <div className="btn-container">
      //   <button
      //     type="button"
      //     className="btn-submit"
      //     onClick={this.ClickSubmitBtn}
      //   >
      //     Submit Assessment
      //   </button>
      // </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      <div className="question-opt-numbers-container">
        <div className="questions-content">
          <div>
            <div className="timer-content">{this.renderTimer()}</div>

            <QuestionsBtn
              currentQuestion={currentQuestion}
              questionsData={questionsData}
              handleQuestionClick={this.handleQuestionClick}
              total={total}
              ClickSubmitBtn={this.ClickSubmitBtn}
            />
          </div>
        </div>
        {/* <div className="questions-container-top-level">
          <div className="questions-container">
            <p className="question">
              {currentQuestion + 1}.{displayingOneQuestion.questionsText}
            </p>
            <hr className="line" />
            <OptionsContent
              optionType={displayingOneQuestion.optionsType}
              options={optionsValue}
              changeOption={this.changeOption}
              activeOption={selectedOptionId}
              onChangeOption={this.onChangeOption}
            />
            <div>
              {currentQuestion < 9 && (
                <div className="button-container">
                  <button
                    type="button"
                    className="next-button"
                    onClick={this.increaseCount}
                  >
                    Next Question
                  </button>
                </div>
              )}
            </div>
          </div>
        </div> */}

        <div className="questions-options-container questions-options-next-btn-container">
          <div className="">
            <p className="question">
              {currentQuestion + 1}.{displayingOneQuestion.questionsText}
            </p>
            <hr className="line" />
            <OptionsContent
              optionType={displayingOneQuestion.optionsType}
              options={optionsValue}
              changeOption={this.changeOption}
              activeOption={selectedOptionId}
              onChangeOption={this.onChangeOption}
            />
          </div>
          {/* <div className="btn-align-container"> */}
          {currentQuestion < 9 && (
            <button
              type="button"
              onClick={this.increaseCount}
              className="next-question-btn"
            >
              Next Question
            </button>
          )}
          {/* </div> */}
        </div>
      </div>
    )
  }

  renderTheQuestionsPart = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderQuestions()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>{this.renderTheQuestionsPart()}</div>
      </div>
    )
  }
}
export default Assessment
