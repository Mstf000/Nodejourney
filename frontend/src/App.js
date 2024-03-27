import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '' // Only used for registration
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response; // Declare response outside the if-else scope
      if (isLoginView) {
        // API call for login
        response = await axios.post('http://localhost:5000/api/auth/login', {
          email: userData.email,
          password: userData.password
        });
      } else {
        // Additional validation for registration, e.g., password matching
        if (userData.password !== userData.confirmPassword) {
          Swal.fire('Error', 'Passwords do not match', 'error');
          return;
        }
        // API call for registration
        response = await axios.post('http://localhost:5000/api/auth/register', {
          username: userData.username,
          email: userData.email,
          password: userData.password
        });
      }
      // Check if response and response.data exist
      if (response && response.data) {
        const message = isLoginView ? 'Logged in successfully' : 'Registered successfully';
        Swal.fire('Success', message, 'success');
        // Additional actions after successful login/register like redirecting or updating the state
      } else {
        // Handle unexpected structure of response
        Swal.fire('Error', 'Unexpected response from the server', 'error');
      }
    } catch (error) {
      // Handle error
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'An error occurred';
      Swal.fire('Error', errorMessage, 'error');
    }
  };


  return (
    <div className="wrapper">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h2>{isLoginView ? 'Login' : 'Register'}</h2>
          {!isLoginView && (
            <div className="input-box">
              <span className="icon">
                <ion-icon name="person"></ion-icon>
              </span>
              <input type="text" name="username" required onChange={handleChange} />
              <label>Username</label>
            </div>
          )}
          <div className="input-box">
            <span className="icon">
              <ion-icon name="mail"></ion-icon>
            </span>
            <input type="email" name="email" required onChange={handleChange} />
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input type="password" name="password" required onChange={handleChange} />
            <label>Password</label>
          </div>
          {!isLoginView && (
            <div className="input-box">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input type="password" name="confirmPassword" required onChange={handleChange} />
              <label>Confirm Password</label>
            </div>
          )}
          {isLoginView && (
            <div className="remember-forgot">
              <label><input type="checkbox" /> Remember me</label>
              <a href="#">Forgot Password?</a>
            </div>
          )}
          <button type="submit">{isLoginView ? 'Login' : 'Register'}</button>
          <div className="register-link">
            {isLoginView ? (
              <p>Don't have an account? <a href="#" onClick={() => setIsLoginView(false)}>Register</a></p>
            ) : (
              <p>Already have an account? <a href="#" onClick={() => setIsLoginView(true)}>Login</a></p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
