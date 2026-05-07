import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";


// PARSE JWT
const parseJwt = (token) => {
  try {

    return JSON.parse(
      atob(token.split(".")[1])
    );

  } catch (e) {

    return null;

  }
};

const App = () => {

  const token =
    localStorage.getItem("token");

  const decoded =
    token
      ? parseJwt(token)
      : null;

  const role = decoded?.role;

  return (
    <Router>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            !token
              ? <Login />
              : <Navigate to="/dashboard" />
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            !token
              ? <Register />
              : <Navigate to="/dashboard" />
          }
        />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            token
              ? <Dashboard />
              : <Navigate to="/login" />
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin-dashboard"
          element={
            token &&
            role === "admin"
              ? <AdminDashboard />
              : <Navigate to="/dashboard" />
          }
        />

        {/* DEFAULT */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                token
                  ? "/dashboard"
                  : "/login"
              }
            />
          }
        />

      </Routes>

    </Router>
  );
};

export default App;