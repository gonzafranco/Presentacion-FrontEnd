import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Table, Accordion, Button } from 'react-bootstrap';
import TareaForm from "./TareaForm";

const TareaDashboard = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");
  const decodedToken = jwt_decode(token);
  const id = decodedToken.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
  
        const response = await axios.get(
          `http://localhost:3000/users/tarea/mias`,
          {
            headers: {
              "auth-token": token
            }
          }
        );
  
        const renewedToken = response.headers['auth-token'];
        if (renewedToken) {
          localStorage.setItem("authToken", renewedToken); 
        }
  
        setResponseData(response.data);
      } catch (error) {
        setError(error);
      }
    };
  
    fetchData();
  }, [id]);
  
  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Confirmar el borrado de la tarea?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`http://localhost:3000/users/tarea/borrar/${id}`, {
          headers: {
            "auth-token": token
          }
        });
        setResponseData(responseData.filter((tarea) => tarea.id !== id));
      } catch (error) {
        setError(error);
      }
    }
  };
  

const handleStatus = async (id, estado) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `http://localhost:3000/users/tarea/estado/${id}`,
        { estado },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      setResponseData((responseData) => {
        return responseData.map((tarea) => {
          if (tarea.id === id) {
            return { ...tarea, finalizado: estado };
          }
          return tarea;
        });
      });
    } catch (error) {
      setError(error);
    }
  };
  


  const handleModify = async (id) => {
    try {
      const newCuerpo = prompt("Ingrese el nuevo cuerpo:");
      const token = localStorage.getItem("authToken");
      if (newCuerpo !== null) {
        await axios.put(
          `http://localhost:3000/users/tarea/actualizar/${id}`,
          { cuerpo: newCuerpo },
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        setResponseData((responseData) => {
          return responseData.map((tarea) => {
            if (tarea.id === id) {
              return { ...tarea, cuerpo: newCuerpo };
            }
            return tarea;
          });
        });
      }
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Accordion>
      <Accordion.Item eventKey="0">
          <Accordion.Header>Crear Tarea</Accordion.Header>
          <Accordion.Body>
          <TareaForm setResponseData={setResponseData} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Mis tareas</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Descripcion</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                  <th>Cambiar Estado</th>
                </tr>
              </thead>
              <tbody>
                {responseData &&
                  responseData.map((tarea) => (
                    <tr key={tarea.id}>
                      <td>{tarea.id}</td>
                      <td>{tarea.cuerpo}</td>
                      <td>{tarea.finalizado ? "finalizado" : "sin finalizar"}</td>
                      <td>
                        <Button variant="danger" onClick={() => handleDelete(tarea.id)}>Delete</Button>
                        <Button variant="primary" onClick={() => handleModify(tarea.id)}>Modify</Button>
                      </td>
                      <td>
                        <input
                            type="checkbox"
                            checked={tarea.finalizado}
                            onChange={() => handleStatus(tarea.id, !tarea.finalizado)}
                            />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
       
      </Accordion>
    </div>
  );
}

export default TareaDashboard;
