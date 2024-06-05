import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import BookingForm from './BookingForm';
import BookingCalendar from './BookingCalendar';
import Navbar from '../include/Nav';
import Footer from '../include/Footer';
// import PaymentMethod from '../components/UI/PaymentMethod';
import { useNavigate } from 'react-router-dom';
const RoomDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const location = useLocation();
  const [roomData, setRoomData] = useState([]);
  const [singleRoomItem, setSingleRoomItem] = useState(null);
  
  const token = localStorage.getItem('token'); // Get the token from local storage (assuming it is stored there)
//   if (!token) {
//        navigate('/login'); // Redirect to the login page if the token is not set
// //  //   // Return early to prevent further execution of the function
//   }
  // Function to extract query parameters from the URL
  const getQueryParam = (name) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(name);
  };

  // Get the 'id' query parameter
  const id = getQueryParam('id');
  console.log('test', id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7264/api/Room/GetAllList');
        setRoomData(response.data);

        // Find the single car item after setting roomData
        const foundRoom = response.data.find((item) => item.roomNumber == slug);
        setSingleRoomItem(foundRoom);

        
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [slug]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleRoomItem]);

  return (
    <div>
      <section>
         <Navbar />
          
        <Container>
          <Row>
            {/* <Col lg="6"> */}
              
                     {singleRoomItem && singleRoomItem.image ? (
                <img src={singleRoomItem.image} alt="Car" className="w-100" />
              ) : (
                <p>No image available</p>
              )} 

            {/* <Col lg="6"> */}
              {singleRoomItem && (
                <div className="room__info">
                  {/* <h2 className="section__title">{singleRoomItem.roomNumber}</h2> */}

                  {/* <div className=" d-flex align-items-center gap-5 mb-4 mt-3"> */}
                    {/* <h6 className="fw-bold fs-4">${singleRoomItem.price}.00 / Day</h6> */}

                    {/* <span className=" d-flex align-items-center gap-2">
                      <span style={{ color: '#f9a826' }}>
                        <i class="ri-star-s-fill"></i>
                        <i class="ri-star-s-fill"></i>
                      
                      </span>
                      
                    </span> */}
                    
                  {/* </div> */}

                  {/* <p className="section__description">{singleRoomItem.description}</p> */}

                  <h5 className="mb-4 fw-bold" style={{ fontSize: '40px' }}>Booking Information</h5>

                 
                  
                </div>
              )}
            

            <Col lg="7" className="mt-1">
              {singleRoomItem && (
                <div className="booking-info mt-2 mr-5">
                  <BookingForm id={id} price={singleRoomItem.price} />
                </div>
              )}
            </Col>

            <Col lg="5" className="mt-1">
              <div className="payment__info mt-5 ms-2">
                {/* <h5 className="mb-4 fw-bold ">Payment Information</h5> */}
                {/* <PaymentMethod /> */}
                <BookingCalendar roomId={id} /> 
              </div>
            </Col>
          </Row>
        </Container>
        <Footer/>
      </section>
    </div>
  );
};

export default RoomDetails;
