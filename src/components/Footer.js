import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='bg-light text-center text-lg-left fixed-bottom'>
      <Container fluid>
        <Row>
          <Col className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            &copy; {new Date().getFullYear()} Nahuel Arias && Franco Gonzalez
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
