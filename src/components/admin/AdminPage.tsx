import React, { useEffect, useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = sessionStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
  };

  return isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />;
};

export default AdminPage;
