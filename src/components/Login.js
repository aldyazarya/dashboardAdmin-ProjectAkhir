import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';
import axios from 'axios';
import swal from '@sweetalert/with-react'

import '../css/login.css'
import {faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


class Login extends Component {

	login = (e) => {
		var url = `${API_URL}/verifadmin`;
		axios.get(url).then((x)=>{
		  var userdata = x.data
		  console.log(userdata);
		  
	
		  var username = this.refs.username.value
			var password =  this.refs.password.value
			var firstname = x.data[0].firstname
		  
			var i;
		  for(i = 0; i<userdata.length; i++){
			  if (username === userdata[i].username && password === userdata[i].password){
				axios.post(`${API_URL}/loginadmins`, {
				  username: e.username.value,
				  password: e.password.value
				}).then(() => {
					localStorage.setItem('usernameadmin', username)
					// this.props.getUsername(username)

					swal({
						title: "You have successfully logged in!",
						text: `Hello, ${firstname}!`,
						icon: "success",
						button: "OK",
					}).then(()=>{
						window.location.href = '/home'
					})
				})
				  break;
			  }else if (i === userdata.length - 1){
					swal({text: "Username or Password Incorrect!",
					icon: "warning",
					dangerMode: true})
			  }
		  }
		  })
		}

  render() {
    return (
		<div className="login">
		<div className="wrapper">
			<form className="form-signin">
				<h2 className="form-signin-heading">LOGIN</h2>
				<div className="input-email d-flex">
					<FontAwesomeIcon icon={faEnvelope} style={{color: "black", marginTop:'5px'}}/>
					<input   type="email"  placeholder="username" ref="username"/>
				</div>
				<div className="input-password d-flex">
					<FontAwesomeIcon icon={faLock} style={{color: "black", marginTop:'5px'}}/>
					<input  type="password" placeholder="Password" ref="password"/>
				</div>
				<button  className="btn btn-primary" onClick={() => this.login(this.refs)}>Login</button>
			</form>
		</div>
	</div>
    );
  }
}

export default Login;