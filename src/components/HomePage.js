import React from "react";
import { Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <div>
      <header className="bg-dark text-white py-5">
      <Container>
            <h1 className="mb-4">¡Bienvenido a nuestro sitio web!</h1>
            <p className="lead">
                Este sitio web es parte del proyecto de la asignatura "Trabajo de Campo" y se encarga del Front End.
            </p>
            <p className="lead">
                El proyecto consiste en desarrollar una Agenda de Tareas con un Front-end y Back-end que permita registrar usuarios. Además, los usuarios podrán crear, modificar y borrar tareas según sea necesario.
            </p>
      </Container>
      </header>

      <Container className="py-4">
      <p >
          Links a nuestro trabajo :
          {' '}
          <a href="https://github.com/gonzafranco/Presentacion-FrontEnd">Presentacion FrontEnd</a>
          {' '}
          y
          {' '}
          <a href="https://github.com/gonzafranco/Backend-Presentacion">Presentacion BackEnd</a>
      </p>
      </Container>
    </div>
  );
};

export default HomePage;
