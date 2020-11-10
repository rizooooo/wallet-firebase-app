import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap';
import { items } from './constants/nav-items';
import { useHistory, useParams, useRouteMatch, NavLink } from 'react-router-dom';


const BottomNavContainer = styled.div`
    position: fixed;
    width: 100%;
    bottom: 0;
`;

const BottomNav = () => {
    const { mat } = useParams()
    const { isExact } = useRouteMatch()
    return (
        <BottomNavContainer className='d-block d-md-none py-2 shadow rounded text-white bg-dark'>
            <Container>
                <Row>
                    {items && items.map(i => (
                        <Col className='d-flex flex-column align-items-center justify-content-center text-secondary' key={i.name} as={<NavLink to="/asd" />}>
                            {i.icon}
                            <small className='text-white'>{i.name}</small>
                        </Col>
                    ))}
                </Row>
            </Container>
        </BottomNavContainer>
    )
}

export default BottomNav
