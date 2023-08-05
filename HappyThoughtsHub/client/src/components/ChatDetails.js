import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { ArrowRightCircle } from 'react-bootstrap-icons';
// import 'animate.css';
import "./chatdets.css"
const ChatDetails = ({ chat }) => {

  return (
    <section className="banner1" id="home1">
      <Container>
        <Row className="align-items-center justify-content-center">
          
            <Col key={chat.id} xs={12} md={4}>
              <div className="chat-box">
                <span className="tagline">{chat.title}</span>
                <h1>{chat.text}</h1>
                <p>{chat.createdAt}</p>
                <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
              </div>
            </Col>
         
        </Row>
      </Container>
    </section>

   
      /* <p><strong>title: </strong>{chat.title}</p>
      <p><strong>my thoughts: </strong>{chat.text}</p>
      <p>date & time:{chat.createdAt}</p> */
    
  )
}

export default ChatDetails