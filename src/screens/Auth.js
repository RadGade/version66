import React from 'react';
import Login from '../components/Login'
import './Auth.css'
import Register from '../components/Register'

class Auth extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoginOpen: true,
            isRegisterOpen: false
        }
    }

    showLogin() {
        this.setState({ 
          isLoginOpen: true,
          isRegisterOpen: false
        })
      }
    
      showRegister() {
        this.setState({
          isLoginOpen: false,
          isRegisterOpen: true
        })
      }

    render() {
        return (
            <div className="Auth">
            <div className="Com">
            <h1 className={"ComName" + (this.state.isLoginOpen ? "-selected" : "")} onClick={this.showLogin.bind(this)}> Login</h1>
            <h1 className={"ComName" + (this.state.isRegisterOpen ? "-selected" : "")} onClick={this.showRegister.bind(this)}> Register</h1>
            </div>
           
            {this.state.isLoginOpen && <Login />}
            {this.state.isRegisterOpen && <Register />}
                <img src="/assets/lime-sign-up.png" alt="hero" className="hero" />
            
            </div>
          );
    }
}

export default Auth;
