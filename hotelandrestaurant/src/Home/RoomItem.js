import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./room-item.css";

const RoomItem = ({props}) => {
  

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="room__item">
        <div className="room__img">
          {/* <img src={props.imgUrl} alt="" className="w-100" /> */}
          <img src={props.image} alt="" className="w-100" />

        </div>

        <div className="room__item-content mt-4">
          <h4 className="section__title text-center">Nr: {props.roomNumber}</h4>
          <h6 className="rent__price text-center mt-">
            ${props.price}.00 <span>/ Day</span>
          </h6>

          <div className="room__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-line"></i> {props.status}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-settings-2-line"></i> {props.description}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {props.price}
            </span>
          </div>

       

          <button className=" w-100 room__item-btn">
            <Link to={`/rooms/${props.roomNumber}?id=${props.id}`}>Reserve it</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default RoomItem;
