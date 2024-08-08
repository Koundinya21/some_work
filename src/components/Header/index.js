import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-bg">
      <div className="icon-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dowxofd2k/image/upload/v1714168944/amibrdvqbecoeegopz4a.png"
            alt="website logo"
            className="icons"
          />
        </Link>
        <h1 className="icon-name">
          <span className="icon-name-part">NXT</span> Assess
        </h1>
      </div>
      <button type="button" value="Logout" className="btn" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
// <div className="header-container">
//   <div className="image-container">
//     <img
//       src="https://res.cloudinary.com/dowxofd2k/image/upload/v1705951324/cbk9qzsgq1kcwynws0sl.png"
//       alt="Nxt Assess"
//       className="header-icon"
//     />
//   </div>
// </div>
