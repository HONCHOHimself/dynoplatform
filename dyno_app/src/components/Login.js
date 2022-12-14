import React from 'react';
import axios from 'axios';

import '../styles/login.css';

import default_light from '../images/default-light.png';
import default_dark from '../images/default-dark.png';

import user_icon from '../icons/user-solid.svg';
import password_icon from '../icons/lock-solid.svg';

// React Components
class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: '',
			username: '',
			password: '',
		}
		this.changeInput = this.changeInput.bind(this)
		this.submitLoginForm = this.submitLoginForm.bind(this)
	}
	changeInput(element) {
		if (element.target.name === 'username') {
			this.setState({ username: element.target.value })
		} else if (element.target.name === 'password') {
			this.setState({ password: element.target.value })
		}
	}
	submitLoginForm(form) {
		form.preventDefault()
		const FormData = require('form-data')
		const form_data = new FormData()
		form_data.append('username', this.state.username)
		form_data.append('password', this.state.password)
		axios.post('http://localhost:8000/auth/login/', form_data).then(res => {
			if (res.data === false) {
				this.setState({ error: 'Invalid Credential.' })
			} else {
				this.setState({ error: '', username: '', password: '' })
				this.props.loginUser(res.data)
			}
		})
	}
	render() {
		return (
			<form onSubmit={this.submitLoginForm} className={ localStorage.getItem('color_mode') === 'light' ? 'light-login-form' : 'dark-login-form'} action="POST">
				{
					localStorage.getItem('color_mode') === 'light' ?
					<img src={default_light} alt="Dyno Platform Default User - Light Mode" /> :
					<img src={default_dark} style={{
						border: '2px solid #2B7A78',
						borderRadius: '100%',
					}} alt="Dyno Platform Default User - Dark Mode" />
				}
				{
					this.state.error ?
					<p className="error">{this.state.error}</p> :
					null
				}
				<h1>Login Account</h1>
				<div className="input">
					<img src={user_icon} alt="Dyno - Username Icon" style={{
						position: 'absolute',
						top: '',
						botton: '',
						right: '',
						left: '',
						marginTop: '24px',
						marginLeft: '18px',
						color: '#3AAFA9',
						width: '14px'
					}} />
					<input type="text" name="username" value={this.state.username} onChange={this.changeInput} placeholder="Username" minLength="4" maxLength="18" required />
				</div>
				<div className="input">
					<img src={password_icon} alt="Dyno - Password Icon" style={{
						position: 'absolute',
						top: '',
						botton: '',
						right: '',
						left: '',
						marginTop: '24px',
						marginLeft: '18px',
						color: '#3AAFA9',
						width: '14px'
					}} />
					<input type="password" name="password" value={this.state.password} onChange={this.changeInput} placeholder="Password" minLength="8" maxLength="24" required />
				</div>
				<div>
					<input type="submit" value="Login" />
				</div>
				<p>Don't have an account? <span className="register-button" onClick={
					this.props.goToRegisterPage
				}>Register</span></p>
			</form>
		)
	}
}

export default Login;
