import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { peoples } from '../constants/mock-people'
import { useHistory } from 'react-router-dom'
import Hooks from './../hooks/people.hooks';
import { avatars } from '../constants/avatars';
import Loader from '../../../components/Loader';
import { CgSmileSad } from 'react-icons/cg';
import { parseDate } from '../../../core/utils';


const ListPeople = () => {
    const { onFetchPeople, onLoadAvatar } = Hooks();
    const { push } = useHistory();
    const [people, setPeople] = useState(null);

    useEffect(() => {
        init();
    }, [])

    const init = async () => {

        try {
            const people = await onFetchPeople();
            setPeople(people)
        } catch (error) {
            setPeople([])
        }
    }

    const onErrorImage = evt => {
        console.log('@ERROR IMAGE')
        evt.target.src = 'chu chu'
    }

    const getAvatar = avatar => {
        // try {
        //    return require('./../../../assets/images/avatars/small/' + avatar + '.png');
        // } catch (error) {
        //     return require('./../../../assets/images/avatars/small/' + avatar + '.jpg');
        // }
    }

    if (!people) {
        return <Loader />
    }

    return (
        <Container className='pt-3'>
            <Row>
                <Col className='d-flex align-items-center justify-content-between'>
                    <h4 className='text-left font-weight-bold'>Peoples</h4>
                    <Button className='font-weight-bold' color={'primary'} onClick={() => push('/people/create')}>ADD</Button>
                </Col>
            </Row>

            {people && people.length === 0 &&
                <Row className='mt-5'>
                    <Col className='d-flex flex-column align-items-center' >
                        <CgSmileSad size={100} />
                        <h5>Oops... don't have friends huh?</h5>
                    </Col>
                </Row>

            }

            <Row className='row-cols-1 mt-2'>
                {people && people.map(p => (
                    <Col key={p.id} className='my-3 clickable' onClick={() => push(`/people/${p.id}`)}>
                        <Container className='px-0' fluid>
                            <Row className='align-items-center'>
                                <Col xs={2}>
                                    {/* {onLoadAvatar()} */}
                                    <img src={onLoadAvatar(p.avatar)} width={'150%'} style={{ borderRadius: 100 }} />
                                </Col>
                                <Col className='d-flex flex-column'>
                                    <h6 className='m-0 font-weight-bold'>{p.name}</h6>
                                    {p.updatedAt && <small className='text-muted'>{parseDate(p.updatedAt)}</small>}
                                </Col>
                                <Col className='d-flex flex-column align-items-end'>
                                    <span className='font-weight-bold text-info'>₱ {p.amounts ? p.amounts.remaining : 0}</span>
                                    <small className='font-weight-bold'>TOTAL</small>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                ))}
            </Row>

        </Container>
    )
}

export default ListPeople
