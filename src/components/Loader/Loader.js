import React from 'react'
import { Container, Col, Spinner, Row } from 'reactstrap'

const Loader = ({ loadingText = null }) => {
    return (
        <Container className='height-full'>
            <Row className='h-75'>
                <Col className='d-flex flex-column align-items-center justify-content-center'>
                    <Spinner type="grow" color="info" size={'lg'} />
                    <h4 className='font-weight-bold text-white mt-3'>{loadingText ? loadingText : 'Loading...'}</h4>
                </Col>
            </Row>
        </Container>
    )
}

export default Loader
