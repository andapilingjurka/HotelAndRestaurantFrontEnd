import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from "reactstrap";
import RoomItem from './RoomItem';

function Home() {
    const [roomData, setRoomData] = useState([]);

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
    <div>Home
       <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers</h2>
            </Col>

            {roomData.map((item) => (
              <RoomItem props={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Home