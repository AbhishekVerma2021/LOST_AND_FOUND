import React from 'react';
import './Login.css'
import { Navigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
import NavBar from '../../NavBar/NavBar';
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      emailInputText: '',
      passwordInputText: '',
      goToAdmin: false,
    }
  }


  handleEmailInputChange = (e) => {
    this.setState({ emailInputText: e.target.value })
  }

  handlePasswordInputChange = (e) => {
    this.setState({ passwordInputText: e.target.value })
  }

  handleLoginData = () => {
    const { emailInputText, passwordInputText } = this.state;
    const loginData = {
      email: emailInputText,
      password: passwordInputText
    }
    console.log(loginData)
    axios.post('http://localhost:8000/login', loginData)
      .then((res) => {
        const token = res.data.accessToken;
        localStorage.setItem('token', token);
        this.setState({ goToAdmin: true })
      })
      .catch((error) => {
        console.log(error.response.data)
        toast.error(error.response.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000
        })
      })
  }
  componentDidMount() {

    const token = localStorage.getItem('token');
    if (token !== null) {
      axios.get('http://localhost:8000/verifyToken', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          if (err) {
            console.log(err)
            toast.error(err.response.data, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000
            })
          }
        })
    }

  }
  render() {
    const { emailInputText, passwordInputText, goToAdmin } = this.state;

    let emptyFieldError = (emailInputText.length === 0 || passwordInputText.length === 0)

    return (<>
      <NavBar />
      <div className="loginFormBody">
        <div className="loginFormArea">
          <div className="loginFormElement">
            <h1>Login</h1>
          </div>
          <div className="loginFormElement">

            <TextField className="formElement" variant="standard" label="Username" type="email"
              size="medium"
              onChange={(e) => {
                this.handleEmailInputChange(e)
              }} />

          </div>
          <div className="loginFormElement">

            <TextField className="formElement" variant="standard" label="Password" type="password"
              size="normal"
              onChange={(e) => {
                this.handlePasswordInputChange(e)
              }} />

          </div>
          <div className="loginFormElement">
            <Button variant="contained" size="medium" id='login-button'
              disabled={emptyFieldError}
              sx={{ backgroundColor: emptyFieldError ? '#49386b8a!important' : '#49386b !important', cursor: emptyFieldError ? 'not-allowed' : 'pointer' }}
              onClick={() => { this.handleLoginData() }}>
              Login
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer />
      {goToAdmin && <Navigate to='/viewAllItems' />}
    </>)
  }
}

export default Login;