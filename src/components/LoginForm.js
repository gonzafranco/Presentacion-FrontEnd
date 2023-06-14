import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, Form, Alert } from 'react-bootstrap';

const LoginForm = () => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (usuario === "" || clave === "") {
      setError("Por favor rellenar todos los campos");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        usuario,
        clave
      });
      console.log(response.data);
      setSuccessMessage("Inicio de sesión exitoso!");
      localStorage.setItem('authToken', response.data.data.token);
      setError("");
      navigate('/dashboard');
      window.location.reload();
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.message || error.response.data.error);
    }
  };

  return (
    <Container fluid className="p-3 my-5">
      <Row>
        <Col md="5" lg="3">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Log In"
          />
        </Col>
        <Col md="7" lg="9">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="usuario">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="clave">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-4 w-100">
              Log In
            </Button>

            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
