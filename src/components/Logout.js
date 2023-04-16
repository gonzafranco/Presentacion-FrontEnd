import { useNavigate } from "react-router-dom";

const Logout = () => {

  const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
        window.location.reload();
      };

      return (
        <button onClick={handleLogout}>Logout</button>
      );
}


export default Logout;