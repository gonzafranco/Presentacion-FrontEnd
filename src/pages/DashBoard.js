import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

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
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <h1>Q onda {userData.usuario} ?</h1>
      <h2>Linda ID :  {userData.id} </h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
