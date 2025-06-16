import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
    localStorage.removeItem("authToken");

    navigate("/signin");
  }, [navigate]);

  return null;
};

export default Logout;
