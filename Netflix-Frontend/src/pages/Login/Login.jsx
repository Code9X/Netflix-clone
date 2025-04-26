import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'admin@netflix.com' && password === 'Pass@123') {
      setEmail('');
      setPassword('');
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="Logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={handleSubmit}>
          {signState === "Sign Up" && <input type="text" placeholder='Your name' />}
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{signState}</button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In"
            ? <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span></p>
            : <p>Already have account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span></p>
          }
        </div>
      </div>
    </div>
  );
};

export default Login;
