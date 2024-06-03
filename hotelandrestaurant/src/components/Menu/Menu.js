import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsSearch } from "react-icons/bs"; 
import restaurant from "./restaurant.mp4";
import "./menu.css";
import Navbar from '../../include/Nav';
import Footer from '../../include/Footer';



const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false); 

  useEffect(() => {
    loadMenu();
  }, []);

  async function loadMenu() {
    try {
      const response = await axios.get("https://localhost:7264/api/Menu/");
      const menuWithFoodInfo = await Promise.all(
        response.data.map(async item => {
          const foodResponse = await axios.get(`https://localhost:7264/api/Foods/${item.foodID}`);
          return { ...item, foodInfo: foodResponse.data };
        })
      );
      setMenu(menuWithFoodInfo);
      setFilteredMenu(menuWithFoodInfo); 
    } catch (error) {
      console.error("Error loading menu:", error);
    }
  }

  const filterMenuByName = () => {
    const filteredItems = menu.filter(item => {
     
      return searchTerm !== "" && item.foodInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredMenu(filteredItems);
  };

  const handleFilter = () => {
    filterMenuByName(); 
  };

  return (
    <div className="body" style={{ backgroundColor: 'black'}}>
      <Navbar/>
       <div className="video-container">
        <video controls={false} autoPlay muted loop>
          <source src={restaurant} type="video/mp4" />
         

          Your browser does not support the video tag.
        </video>
      </div>
     <div ></div>
      <Container  style={{ backgroundColor: 'black'}}>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'sans-serif', fontWeight: 'bold', margin: '10px 0' }}>MENU</h1>
        <div style={{ display: 'inline-block', position: 'relative' }}>
         {showSearch ? (
             <>
      <input type="text" placeholder="search by food..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}style={{width: '450px',marginRight: '10px',padding: '10px',backgroundColor:"#fafafa",borderRadius: '8px'
       }}
       />               
        <Button variant="primary" onClick={handleFilter}>Search</Button>
              </>
            ) : (
              <BsSearch style={{ position: 'absolute', left: '450px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={() => setShowSearch(true)} size={20} />
            )}
            <br></br>
            </div>
            </div>
        <Row>
          {filteredMenu.map((item, index) => (
            <React.Fragment key={index}>
              {index % 3 === 0 && index !== 0 && (
                <div style={{ marginBottom: '20px' }}></div>
              )}
              <Col xs={12} md={4}>
                <div className="menu-item">
                 <div className="menu-item-image">
                 <img src={item.foodInfo.image} alt={item.foodInfo.name}style={{marginBottom:'6px'}} />
                 <h6 style={{ fontFamily: 'Helvetica, sans-serif	', fontWeight: 'bold', textAlign: 'center', margin: '5px 0' }}>{item.foodInfo.name}</h6>
                 <p style={{ fontFamily:'Trebuchet MS, sans-serif	',textAlign: 'center', margin: '5px 0' }}>{item.foodInfo.description}</p>
                 
                </div>
                </div>
              </Col>
            </React.Fragment>
          ))}
        </Row>
      </Container>
      <Footer/>
    </div>
  
  );  
};

export default Menu;