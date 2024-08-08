import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isBool: false,
    errorMessage: '',
    isShowPassword: false,
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({isBool: true, errorMessage: errorMsg})
  }

  submitTheForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok) {
      this.loginSuccess(data.jwt_token)
      this.setState({username: '', password: ''})
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  showPassword = () => {
    const {isShowPassword} = this.state
    if (isShowPassword) {
      this.setState({isShowPassword: false})
    } else {
      this.setState({isShowPassword: true})
    }
  }

  render() {
    const {
      username,
      password,
      isBool,
      errorMessage,
      isShowPassword,
    } = this.state
    const showing = isShowPassword ? 'text' : 'password'
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="card-container">
          {/* <div className="icon-container"> */}
          <img
            src="https://res.cloudinary.com/dowxofd2k/image/upload/v1705951324/cbk9qzsgq1kcwynws0sl.png"
            alt="login website logo"
            className="icon-icon"
          />
          <h1 className="icon-title">
            <span className="icon-name-part">NXT</span> Assess
          </h1>
          <form onSubmit={this.submitTheForm}>
            <div className="event-container">
              <label htmlFor="username" className="username">
                USERNAME
              </label>
              <br />
              <input
                type="text"
                id="username"
                value={username}
                onChange={this.onChangeUserName}
                placeholder="Username"
                className="input-box"
              />
            </div>
            <div className="event-container">
              <label htmlFor="password" className="password">
                PASSWORD
              </label>
              <br />
              <input
                id="password"
                type={showing}
                value={password}
                onChange={this.onChangePassword}
                placeholder="Password"
                className="input-box"
              />
            </div>
            <div className="checkBox-container">
              <input
                type="checkbox"
                id="checkbox"
                className="checkBox"
                onChange={this.showPassword}
              />
              <label htmlFor="checkbox" className="checkbox-label">
                Show Password
              </label>
            </div>
            <br />
            {/* <div className="btn-container">
              <button type="submit" className="btn" value="Login">
                Login
              </button>
            </div> */}
            <div className="btn-container">
              <button type="submit" value="Login" className="login-btn">
                Login
              </button>
            </div>
            {isBool && <p>*{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
