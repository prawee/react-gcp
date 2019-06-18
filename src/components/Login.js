import React, { Component } from 'react';
import Axios from 'axios';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            token: ''
        };
    }
    authenticated() {
        const url = 'https://uat-dot-oceanic-hold-176205.appspot.com/v3/auth/login';

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Language': 'TH'
            }
        };

        const formData = new FormData();
        formData.append('email', this.state.username);
        formData.append('password', this.state.password);

        Axios.post(url, formData, config)
        .then(response => {
            console.log('response', response);
            if (response.data) {
                this.setState({ token: response.token })
            }
            return response;
        })
        .catch(error => {
            console.log('error ', error);
        });
    }
    setUsername(e) {
        e.preventDefault();
        this.setState({ username: e.target.value });
    }
    setPassword(e) {
        e.preventDefault();
        this.setState({ password: e.target.value });
    }
    render() {
        if (this.state.token === '') {
            return (
                <div>
                    <input 
                        type="input" 
                        label="username" 
                        value={this.state.username} 
                        onChange={this.setUsername.bind(this)} />
                    <input 
                        type="password" 
                        label="password" 
                        value={this.state.password}
                        onChange={this.setPassword.bind(this)} />
                    <button onClick={this.authenticated.bind(this)} tyle="button" className="btn btn-primary">Login</button>
                </div>
            );
        } else {
            return (
                <div>
                    Welcome {this.state.username}
                </div>
            );
        }
    }
}

export default Login;
