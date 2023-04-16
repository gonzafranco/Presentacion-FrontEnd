import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Table, Accordion } from 'react-bootstrap';


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
                                </tr>
                            </thead>

                            <tbody>
                                {responseData && responseData.map(tarea =>
                                    <tr>
                                        <td>{tarea.id}</td>
                                        <td>{tarea.cuerpo}</td>
                                        <td>{tarea.finalizado ? "finalizado" : "sin finalizar"}</td>
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
