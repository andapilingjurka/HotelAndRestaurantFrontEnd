import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import RoomItem from './RoomItem';
import Navbar from '../include/Nav';
import Footer from '../include/Footer';
import image from './image.jpg';
import { useAuthRedirect } from '../components/interceptors/tokenService';


function Home() {
    const [roomData, setRoomData] = useState([]);
    useAuthRedirect();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7264/api/Room/GetAllList');
                setRoomData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            {/* <div>Home</div> */}
            <header
      className="hero-section"
      style={{
        backgroundImage: `url(${image})`,
        
      }}
    >
      <div
        className="overlay"
      >
        <div
          className="content"
          style={{
            marginLeft:'36%',
            textAlign: 'center',
            color: 'white'
          }}
        >
          <h1>CHECK OUR ROOMS!</h1>
        </div>
      </div>
    </header>
            <section>
                <Container>
               
                    <Row>
                        <Col lg="12" className="text-center mb-5">
                    
                            
                        </Col>
                        {roomData.map((item) => (
                            <RoomItem props={item} key={item.id} />
                        ))}
                    </Row>
                </Container>
            </section>
            <Footer/>
        </div>
    );
}

export default Home;
