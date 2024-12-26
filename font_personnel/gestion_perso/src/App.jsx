"use client";
import Accueil from "./Components/Accueil/Accueil";
import { useState , useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
function App() {
  const [isauthentifier, setIsauthentifier] = useState(() => {
    return localStorage.getItem('authToken') ? true : false;
  });
  
  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsauthentifier(true)
    console.log('initial',isauthentifier)
    toast.success("Vous êtes connecté");
  };

  useEffect(() => {
    console.log("isAuthentifier changé :", isauthentifier);
  }, [isauthentifier]);  // Cette fonction se déclenche chaque fois que isauthentifier change


  const islogout = () => {
    if (isauthentifier) {
      setIsauthentifier(false);
      localStorage.removeItem('authToken');
      toast.success("Vous êtes déconnecté");
      console.log("Déconnexion réussie");
    } else {
      console.log("Utilisateur non authentifié");
    }
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={isauthentifier ? <Home deconnection={islogout} /> : <Navigate to="/Login" />}
          />
          <Route
            path="/Login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/Register"
            element={<Register />}
          />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

const Home = ({ deconnection }) => {
  return (
    <>
    <Accueil handlelogout = {deconnection}/>
    </>
  );
};

export default App;
