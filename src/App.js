import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import Home from './pages/HomePage';
import Foot from './pages/Footer';

function App() {
  return (  
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>  
        <Routes>  
        <Route path='/register' element={<RegisterForm/>} />
        <Route path='/login' element={<LoginForm/>} /> 
        <Route path='/' element={<Home/>} />
      </Routes> 
      <div>
        <Foot/>
      </div>
    </Router>
  );
}

export default App;
