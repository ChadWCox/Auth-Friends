import React from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

class Login extends React.Component {
    state = {
        credentials: {
            username: '',
            password: '',
        },
        error: '',
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        })
    };

    login = e => {
        e.preventDefault();
        axiosWithAuth()
        .post(`http://localhost:5000/api/login`, this.state.credentials)
        .then(res => {
            localStorage.setItem('token', res.data.payload);
            this.props.history.push('http://localhost:5000/api/friends');
            this.props.setLoggedIn(true);
        })
        .catch(err => {
            console.log(err.message)
            this.setState({
                error: err.message,
            })
        })
    };

    render() {
        return (
          <div>
            <form onSubmit={this.login}>
              <input
                type="text"
                name="username"
                value={this.state.credentials.username}
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                value={this.state.credentials.password}
                onChange={this.handleChange}
              />
              <button>Log in</button>
            </form>
          </div>
        );
      }
    }
    
    export default Login;