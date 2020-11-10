import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap';
// import { items } from './constants/nav-items';


const NavContainer = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    background-color: #fff;
`;

const Nav = () => {
    return (
        <NavContainer className='d-block d-md-none py-2 shadow border'>
            <Container>
                <Row>
                  <Col>
                  <h5 className='font-weight-bold text-secondary mb-1'>Home</h5>
                  </Col>
                </Row>
            </Container>
        </NavContainer>
    )
}

export default Nav
