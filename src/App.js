import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';

function App() {
  return (  
    <Router>
      <div>
        <nav>
          <ul>
          <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        <Routes>  
          <Route exact path='/register' element={<RegisterForm/>} />
          <Route exact path='/login' element={<LoginForm/>} /> 

          <Route exact path='/' element={   <header>
            <h1>React server</h1>
        </header>} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
