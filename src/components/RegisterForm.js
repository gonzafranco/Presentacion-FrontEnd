import React, { useState } from "react";
import axios from "axios";
import { Container, Col, Row, Button, Form, Alert } from 'react-bootstrap';

const RegisterForm = () => {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (usuario === "" || email === "" || clave === "") {
      setError("Por favor rellenar todos los campos");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        usuario,
        email,
        clave,
      });
      console.log(response.data);
      setSuccessMessage("Gracias por registrarse!");
      setError("");
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
            alt="Registro"
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

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Registrarse
            </Button>

            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
