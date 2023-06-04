import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import TareaDashboard from "./TareaDashboard";


const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwt_decode(token);
      setUserData(decodedToken);
      console.log(userData);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }, [navigate]);

  

  return (
    <div>
      <h1>Bienvenido {userData.usuario}</h1>
      <TareaDashboard/>
    </div>
  );
}

export default Dashboard;
