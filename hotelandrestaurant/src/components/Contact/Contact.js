import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./contact.css";
import contact from "./contact.jpg";
import Navbar from '../../include/Nav';
import Footer from '../../include/Footer';

function Contact() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [kontakts, setUsers] = useState([]);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      const result = await axios.get(
        "https://localhost:7264/api/Contact/GetAllList"
      );
      setUsers(result.data);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/Contact/Add", {
        name: name,
        email: email,
        message: message,
      });
      alert("Save successful!");
      setId("");
      setName("");
      setEmail("");
      setMessage("");

      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <Navbar/>
  
      <Container fluid className="container-full">
        <Row className="justify-content-end">
          <Col md={6} lg={6} className="pb-5">
            <div className="featured-image mb-3">
              <img src={contact} className="img-fluid" alt="Featured" />
            </div>
          </Col>
          <Col md={8} lg={6} className="pb-5 ml-auto">
          <form onSubmit={save} className="form-gray">
              <div className="card-header p-0 gray-background">
                <div className="text-white text-center py-2 gray-text">
                  <h3>
                    <i className="fa fa-envelope"></i> Contact Us
                  </h3>
                  <p className="m-0">We are happy to help you!</p>
                </div>
              </div>
              <div className="card-body p-3 gray-background">
                <div className="form-group">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text input-group-text-gray">
                        <i className="fa fa-user text-info"></i>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      hidden
                      value={id}
                      onChange={(event) => {
                        setId(event.target.value);
                      }}
                    />
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text input-group-text-gray">
                        <i className="fa fa-envelope text-info"></i>
                      </div>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text input-group-text-gray">
                        <i className="fa fa-comment text-info"></i>
                      </div>
                    </div>
                    <textarea
                      className="form-control"
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    className="btn btn-gray btn-block rounded-0 py-2"
                  >
                    Send
                  </Button>
                </div>
              </div>
              <link
                rel="stylesheet"
                href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
                integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
                crossOrigin="anonymous"
              />
            </form>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
}

export default Contact;
