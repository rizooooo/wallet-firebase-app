import React from 'react'
import { Container, Row, Col } from 'reactstrap'

const AuthLayout = ({ children }) => {
    return (
        <Container className='h-100'>
            <Row className='h-100 align-items-center justify-content-center'>
                <Col xs={12} md={8} lg={5}>
                    {children}
                </Col>
            </Row>
        </Container>

    )
}

export default AuthLayout
