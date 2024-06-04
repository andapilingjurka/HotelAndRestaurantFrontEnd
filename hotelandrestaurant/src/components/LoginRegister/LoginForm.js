import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "./jwtUtils";
import { Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import login from "./hotel.png";
import Navbar from '../../include/Nav';
import Footer from '../../include/Footer';
import { setTokens, getValidAccessToken, clearTokens, getNameIdentifier,getUserRole } from '../interceptors/authService';  // Updated import



// import MyNavbar from "../include/Navbar";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://localhost:7264/api/Users/Login",
        {
          email,
          password,
        }
      );

      const { accessToken, refreshToken } = response.data;
      setTokens(accessToken, refreshToken);
      const accessTokenDecoded = await getValidAccessToken();
      if(accessTokenDecoded){
      const nameId = getNameIdentifier(accessTokenDecoded);
      const role = getUserRole(accessTokenDecoded);
        console.log("ID E EASDAS"+nameId);
      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }
    } catch (error) {
      console.error(error.response.data);
      alert("Emaili ose Fjalekalimi gabim!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
       <Navbar /> 
      <div className="container d-flex justify-content-center align-items-center min-vh-100 login">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div
            className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{ background: "#FFFFFF" }}
          >
            <div className="featured-imagee mb-3">
              <img
                src={login}
                className="img-fluid1"
                style={{ width: "100%" }}
                alt="Featured"
              />
            </div>
          </div>
          <div className="col-md-6 right-box">
            <Form onSubmit={handleSubmit}>
              {message && (
                <Alert
                  variant={
                    message.includes("successful") ? "success" : "danger"
                  }
                >
                  {message}
                </Alert>
              )}
              <Form.Group className="mb-3">
                <h2>Mirë se vini!</h2>
                <p>Jemi të lumtur që ju kemi përsëri me ne.</p>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control form-control-lg bg-light fs-6"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-lg bg-light fs-6"
                />
              </Form.Group>
              <div className="input-group mb-3">
                <Button
                  variant="primary"
                  type="submit"
                  className="btn btn-lg w-100 fs-6 btn-login"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </Button>
              </div>
              <div className="row">
                <small>
                  You don't have an account?
                  <Link to="/registration"> Regjistrohuni këtu</Link>
                </small>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default LoginForm;
