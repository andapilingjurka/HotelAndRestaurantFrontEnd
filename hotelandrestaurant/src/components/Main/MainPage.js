import React from 'react';
import './Main.css';
import heroImage from '../../images/hotel.jpg'; 
import Navbar from "../../include/Nav";
import Footer from "../../include/Footer"

import sideImage from '../../images/sideImage.jpg'; 
import amenity1 from '../../images/amenity1.jpg'; 
import amenity2 from '../../images/amenity2.jpg'; 
import amenity3 from '../../images/amenity3.jpg'; 

const MainPage = () => {
  return (
    <div>
      <Navbar/>
      <header className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="overlay">
          <div className="content">
            <div className="left-content">
              <div className="main-content">
                <h1>Luxury sunrises</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.</p>
                <a href="#" className="cta-button">Explore with us</a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="main-section">
        <div className="cards1-container">
          <div className="card1">
            <img src={amenity3} alt="Swimming Pool" className="card1-image"/>
            <div className="card1-content">
              <h3>Swimming Pool</h3>
              <p>Enjoy a refreshing swim in our luxurious outdoor pool, open year-round.</p>
            </div>
          </div>
          <div className="card1">
            <img src={amenity2} alt="Spa" className="card1-image"/>
            <div className="card1-content">
              <h3>Spa</h3>
              <p>Relax and rejuvenate with our wide range of spa treatments and services.</p>
            </div>
          </div>
          <div className="card1">
            <img src={amenity1} alt="Fitness Center" className="card1-image"/>
            <div className="card1-content">
              <h3>Fitness Center</h3>
              <p>Stay in shape during your stay with our state-of-the-art fitness facilities.</p>
            </div>
          </div>
        </div>
        <div className="text-image-section">
          <div className="text-content">
            <h2>Experience the Best Hospitality</h2>
            <p>
              At Hotel Bambus, we pride ourselves on providing exceptional service and top-notch amenities to ensure
              your stay is comfortable and memorable. Our dedicated staff is here to cater to your every need, making
              your visit truly unforgettable.
            </p>
            <p>
              Whether you're here for business or leisure, you'll find everything you need right at your fingertips.
              Enjoy our gourmet dining options, unwind at the spa, or take a stroll through our beautifully landscaped
              gardens. At Hotel Bambus, your satisfaction is our priority.
            </p>
          </div>
          <div className="image-content">
            <img src={sideImage} alt="Hotel Amenities" />
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default MainPage;