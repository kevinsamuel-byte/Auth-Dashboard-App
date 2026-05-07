import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { token, isReady } = useContext(AuthContext);

  if (!isReady) {
    return <p style={{ textAlign: "center" }}>Checking auth...</p>;
  }

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;