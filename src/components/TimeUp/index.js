// import './index.css'
// import Header from '../Header'

// const TimeUp = () => (
//   <>
//     <Header />
//     <div className="time-up-container">
//       <div className="time-up-card">
//         <img
//           src="https://res.cloudinary.com/dowxofd2k/image/upload/v1711996764/calender_1_1_q3e1we.png"
//           alt="time up"
//           className="time-up-img"
//         />
//         <h1 className="timeUp-heading">Time is up!</h1>
//         <p className="timeUp-para">
//           You did not complete the assessment within the time
//         </p>
//         <p className="timeUp-para-2">
//           Your Score:<span>00</span>
//         </p>
//         <button type="button" className="Reattempt-btn">
//           Reattempt
//         </button>
//       </div>
//     </div>
//   </>
// )

// export default TimeUp

import './index.css'

import {Link} from 'react-router-dom'
import Header from '../Header'

const TimeUp = props => {
  const {score} = props
  return (
    <>
      <Header />
      <div className="time-up-container">
        <div className="time-up-card">
          <img
            src="https://res.cloudinary.com/dowxofd2k/image/upload/v1711996764/calender_1_1_q3e1we.png"
            alt="time up"
            className="time-up-img"
          />
          <h1 className="timeUp-heading">Time is up!</h1>
          <p className="timeUp-para">
            You did not complete the assessment within the time
          </p>
          <p className="timeUp-para-2">
            Your Score:<span>{score}</span>
          </p>
          <Link to="/assessment">
            <button type="button" className="Reattempt-btn">
              Reattempt
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
export default TimeUp
