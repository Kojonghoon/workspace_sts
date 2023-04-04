import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogHeader = () => {
  return (
    <>
      <Navbar bg="black">
        <Container fluid>
          <Link to="/" className="nav-link"style={{color:"white"}}>TerrGYM</Link>
          <Nav className="me-auto">
            <Link to="/home" className="nav-link" style={{color:"white"}}>Home</Link>
            <Link to="/dept/0" className="nav-link" style={{color:"white"}}>부서관리</Link>
            <Link to="/reple/board" className="nav-link"style={{color:"white"}}>게시판</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default BlogHeader;
