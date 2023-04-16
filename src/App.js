import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Home from './components/HomePage';
import Foot from './components/Footer';
import Dashboard from './components/DashBoard';
import TareaForm from './components/TareaForm';
import Logout from './components/Logout';


function App() {

  const token = localStorage.getItem('authToken');

  return (  
  <React.StrictMode>
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            {!token && <Nav.Link as={Link} to="/register">Register</Nav.Link>}
            {!token && <Nav.Link as={Link} to="/login">Log in</Nav.Link>}
            {token && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
            {token && <Nav.Link as={Link} to="/tarea">Crear tarea</Nav.Link>}
            {token && <Nav.Link as={Link} to="/logout">Log out</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>  
        <Routes>  
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<RegisterForm/>} />
        <Route path='/login' element={<LoginForm/>} /> 
        <Route path='/dashboard' element={<Dashboard/>} /> 
        <Route path='/tarea' element={<TareaForm/>} /> 
        <Route path='/logout' element={<Logout/>} /> 

      </Routes> 
      <div>
        <Foot/>
      </div>
    </Router>
    </React.StrictMode>
  );
}

export default App;
