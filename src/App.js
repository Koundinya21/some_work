// import {Component} from 'react'
// import {Route, Switch, Redirect} from 'react-router-dom'
// import './App.css'
// // import ScoreContext from './ReactContext/index'
// import LoginForm from './components/LoginForm'
// import ProtectedRoute from './components/ProtectedRoute'
// import Home from './components/Home'
// import Assessment from './components/Assessment'
// import Results from './components/Results'
// import NotFound from './components/NotFound'
// import TimeUp from './components/TimeUp'

// class App extends Component {
//   //   state = {score: 0}

//   //   updatingScore = () => {
//   //     this.setState(prevScore => ({
//   //       score: prevScore.score + 1,
//   //     }))
//   //   }

//   //   render() {
//   //     const {score} = this.state
//   //     return (
//   //       <ScoreContext.Provider value={{score, updatingScore: this.updatingScore}}>
//   //         <Switch>
//   //           <Route exact path="/login" component={LoginForm} />
//   //           <ProtectedRoute exact path="/" component={Home} />
//   //           <ProtectedRoute
//   //             exact
//   //             path="/assess/questions"
//   //             component={Assessment}
//   //           />
//   //           <ProtectedRoute exact path="/results" component={Results} />
//   //           <ProtectedRoute exact path="/time-up" component={TimeUp} />
//   //           <Route path="/bad-path" component={NotFound} />
//   //           <Redirect to="/bad-path" />
//   //         </Switch>
//   //       </ScoreContext.Provider>
//   //     )
//   //   }
//   render() {
//     return (
//       <Switch>
//         <Route exact path="/login" component={LoginForm} />
//         <ProtectedRoute exact path="/" component={Home} />
//         <ProtectedRoute exact path="/assess/questions" component={Assessment} />
//         <ProtectedRoute exact path="/results" component={Results} />
//         <ProtectedRoute exact path="/time-up" component={TimeUp} />
//         <Route path="/bad-path" component={NotFound} />
//         <Redirect to="/bad-path" />
//       </Switch>
//     )
//   }
// }

// export default App

// import {useState} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'

// import DetailsContext from './ReactContext'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Assessment from './components/Assessment'
import Results from './components/Results'
import NotFound from './components/NotFound'
import TimeUp from './components/TimeUp'

const App = () => (
  //   const [elapsedTimeInSeconds, updateElapsedTime] = useState(0)
  //   //   const [isTimerRunning, updateTimerRunning] = useState(true)

  //   const setElapsedTime = newElapsedValue => {
  //     updateElapsedTime(newElapsedValue)
  //   }

  //   //   const onToggleTimer = () => {
  //   //     updateTimerRunning(prevState => !prevState)
  //   //   }

  //   //   const setElapsedTimeInSeconds = () => {
  //   //     const Minutes = Math.floor(elapsedTimeInSeconds / 60)
  //   //     const Seconds = Math.floor(elapsedTimeInSeconds % 60)

  //   //     const Min = Minutes > 9 ? Minutes : `0${Minutes}`
  //   //     const Sec = Seconds > 9 ? Seconds : `0${Seconds}`
  //   //     return `00:${Min}:${Sec}`
  //   //   }

  //   return (
  //     <DetailsContext.Provider
  //       value={{
  //         elapsedTimeInSeconds,
  //         setElapsedTimeInSeconds: setElapsedTime,
  //       }}
  //     >
  //       <Switch>
  //         <Route exact path="/login" component={LoginForm} />
  //         <ProtectedRoute exact path="/" component={Home} />
  //         <ProtectedRoute exact path="/assessment" component={Assessment} />
  //         <ProtectedRoute
  //           exact
  //           path="/results"
  //           render={props => <Results {...props} time={elapsedTimeInSeconds} />}
  //         />
  //         <ProtectedRoute exact path="/time-up" component={TimeUp} />
  //         <Route path="/bad-path" component={NotFound} />
  //         <Redirect to="/bad-path" />
  //       </Switch>
  //     </DetailsContext.Provider>
  //   )

  //   render() {

  //   <Switch>
  //     <Route exact path="/login" component={LoginForm} />
  //     <ProtectedRoute exact path="/" component={Home} />
  //     <ProtectedRoute exact path="/assessment" component={Assessment} />
  //     <ProtectedRoute exact path="/results" component={Results} />
  //     <ProtectedRoute exact path="/time-up" component={TimeUp} />
  //     <Route path="/bad-path" component={NotFound} />
  //     <Redirect to="/bad-path" />
  //   </Switch>
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/assessment" component={Assessment} />
    {/* <ProtectedRoute
      exact
      path="/results"
      render={props => <Results {...props} />}
    /> */}
    <ProtectedRoute exact path="/results" component={Results} />
    <ProtectedRoute exact path="/time-up" component={TimeUp} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
