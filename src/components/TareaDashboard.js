import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Table, Accordion, Button } from 'react-bootstrap';

const TareaDashboard = () => {
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("authToken");
    const decodedToken = jwt_decode(token);
    const id = decodedToken.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/tarea/${id}`);
                setResponseData(response.data);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [id]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/tarea/${id}`);
            setResponseData(responseData.filter(tarea => tarea.id !== id));
        } catch (error) {
            setError(error);
        }
    };

    const handleModify = async (id) => {
        try {
            const newCuerpo = prompt("Enter the new cuerpo:");
            if (newCuerpo !== null) {
                await axios.put(`http://localhost:3000/tarea/${id}`, { cuerpo: newCuerpo });
                setResponseData(responseData.map(tarea => {
                    if (tarea.id === id) {
                        return { ...tarea, cuerpo: newCuerpo };
                    }
                    return tarea;
                }));
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
                    <Accordion.Header>Mis tareas</Accordion.Header>
                    <Accordion.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Cuerpo</th>
                                    <th>Status</th>
                                    <th>Actions</th> {/* Add a new column for buttons */}
                                </tr>
                            </thead>
                            <tbody>
                                {responseData && responseData.map(tarea =>
                                    <tr key={tarea.id}>
                                        <td>{tarea.id}</td>
                                        <td>{tarea.cuerpo}</td>
                                        <td>{tarea.finalizado ? "finalizado" : "sin finalizar"}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleDelete(tarea.id)}>Delete</Button>
                                            <Button variant="primary" onClick={() => handleModify(tarea.id)}>Modify</Button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export default TareaDashboard;
