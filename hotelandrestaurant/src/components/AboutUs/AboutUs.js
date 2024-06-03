import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faShieldAlt, faTachometerAlt, faHeadset, faBed, faGlassCheers, faFutbolBall, faGamepad, faDumbbell, faSpa } from '@fortawesome/free-solid-svg-icons';

import "./aboutus.css";
import hotel from "./hotel.mp4";
import photo1 from "./photo1.jpg";
import photo2 from "./photo2.jpg";
import photo3 from "./photo3.jpg";
import photo4 from "./photo4.jpg";
import photo6 from "./photo6.jpg";





const AboutUs = () => {
  

  return (
    <div>
    
      <div className="video-container">
        <video controls={false} autoPlay muted loop>
          <source src={hotel} type="video/mp4" />
         

          Your browser does not support the video tag.
        </video>
      </div>

      <div className="card-container">
        <div className="container mt-5 mb-5">
          <div className="row">
          <h5 className="orange-text">-- OUR SERVICES --</h5>
          <h3>
            <span>Explore Our </span> 
            <span className="orange-text">SERVICES</span>
         </h3>
          <div className="col-md-3">
              <div className="card">
              <h2><FontAwesomeIcon icon={faBed} /> Room & Apartments:</h2>
                <p>
                Immerse yourself in comfort and luxury at our meticulously designed rooms and apartments, where every detail is crafted to ensure your utmost relaxation and convenience.
                </p>
              </div>
            </div>



            <div className="col-md-3">
              <div className="card">
              <h2><FontAwesomeIcon icon={faUtensils} /> Foods & Restaurant:</h2>
              <p>
              Indulge your palate in a culinary journey of exquisite flavors at our array of restaurants, where each dish is a masterpiece carefully prepared
               by our skilled chefs using the freshest ingredients.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card">
              <h2><FontAwesomeIcon icon={faGlassCheers} /> Event & Party:</h2>
                <p>
                Create unforgettable memories at your next event or party with our dedicated team ready to assist you every step of the way,
                 ensuring a seamless and memorable experience for you and your guests.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card">
              <h2><FontAwesomeIcon icon={faDumbbell} /> Gym & Yoga:</h2>
                <p>
                Elevate your fitness routine and find inner peace at our state-of-the-art gym and yoga facilities, where expert instructors guide you through invigorating workouts
                 and rejuvenating practices in a serene environment.
                </p>
              </div>
            </div>

           

          
          </div>
        </div>

        <div className="additional-content">
        <img src={photo6} alt="Additional" />

          <div className="cardd text-rightt">
            <h2>Why Choose Us?
</h2>
            <p>
            At our hotel, we strive to provide an exceptional experience that goes beyond mere accommodation. Here’s why you should choose us for your next stay: Our meticulously designed rooms and apartments are crafted to ensure your utmost relaxation and convenience. Every detail is considered to provide a serene and luxurious environment, making you feel right at home. Embark on a culinary journey at our diverse range of restaurants, where each dish is a masterpiece prepared by our skilled chefs using the freshest ingredients. From gourmet dining to casual bites, our culinary offerings are sure to delight your palate. Whether it's a corporate event, a wedding, or a celebratory gathering, our dedicated team is here to assist you every step of the way. We ensure a seamless and memorable experience, tailored to meet your specific needs and preferences. Elevate your fitness routine in our cutting-edge gym and find inner peace in our serene yoga facilities. Our expert instructors guide you through invigorating workouts and rejuvenating practices, promoting overall well-being. We cater to all your needs, offering a wide range of amenities including high-speed internet, 
            concierge services, and more. 
            </p>
          </div>
        </div>
      </div>

      <h3>What did people say about us?</h3>
      <div className="additional-content">
        <div className="enlarged-photo">
        <img src={photo1} alt="Photo 1" />

          <div className="enlarged-photo-description">
            <p>
              "I thoroughly enjoyed my stay at the hotel. The staff were incredibly attentive and the rooms were spotless!"
            </p>
          </div>
        </div>

        <div className="enlarged-photo">
        <img src={photo2} alt="Photo 2" />

          <div className="enlarged-photo-description">
            <p>
              "The location was perfect for our needs, close to major attractions and public transport,making it convenient to explore the city."
            </p>{" "}
          </div>
        </div>

        <div className="enlarged-photo">
        <img src={photo3} alt="Photo 3" />

          <div className="enlarged-photo-description">
            <p>
              "The hotel offered great value for money, with spacious rooms and excellent amenities, making it an ideal choice for both leisure and business travelers.!"
            </p>{" "}
          </div>
        </div>

        <div className="enlarged-photo">
        <img src={photo4} alt="Photo 4" />

          <div className="enlarged-photo-description">
            <p>
              "Our experience was overall positive, with friendly staff and a welcoming atmosphere. The only downside was the noise from the street at night."
            </p>
            .{" "}
          </div>
        </div>
      </div>

     

    </div>
  );
};
export default AboutUs;