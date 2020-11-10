import React from 'react'
import { Row, Col } from 'reactstrap'
import { FaArrowLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

const BackButton = ({ action }) => {
    const { push } = useHistory();
    return (
        <Row>
            <Col className='d-flex justify-content-between align-items-center'>
                <FaArrowLeft onClick={() => push('/people')} />
                {action}
            </Col>
        </Row>
    )
}

export default BackButton
