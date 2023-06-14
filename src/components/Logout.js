import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      localStorage.removeItem("authToken");
      navigate("/");
      window.location.reload();
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
