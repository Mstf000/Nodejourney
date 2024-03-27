import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLoginView, setIsLoginView] = useState(true);  // Toggle between Login and Register view

  return (
    <div className="wrapper">
      <div className="login-box">
        <form action="">
          <h2>{isLoginView ? 'Login' : 'Register'}</h2>
          {!isLoginView && (
            <div className="input-box">
              <span className="icon">
                <ion-icon name="person"></ion-icon>
              </span>
              <input type="text" required />
              <label>Username</label>
            </div>
          )}
          <div className="input-box">
            <span className="icon">
              <ion-icon name={isLoginView ? "mail" : "mail"}></ion-icon>
            </span>
            <input type="email" required />
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input type="password" required />
            <label>Password</label>
          </div>
          {!isLoginView && (
            <div className="input-box">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input type="password" required />
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
