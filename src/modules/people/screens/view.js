import React, { useEffect, useState, useCallback } from 'react'
import { Container, Row, Col, Input, Badge, Button } from 'reactstrap'
import BackButton from '../components/BackButton'
import { useParams } from 'react-router-dom'
import { FaMoneyBillWave, FaPlusCircle } from 'react-icons/fa';
import BaseDataStore from '../../../models/base.model';
import PeopleHooks from './../hooks/people.hooks';

import AddTransactionModal from '../components/AddTransactionModal';
import Loader from '../../../components/Loader';
import TransactionList from '../components/TransactionList';
const View = () => {
    const { id } = useParams();
    const { onFindOnePeople, onLoadAvatar, onUpdatePerson } = PeopleHooks();
    const [user, setUser] = useState(null)
    const [modal, setModal] = useState(false);

    useEffect(() => {
        init();
    }, [id])

    const init = async () => {
        setUser(await onFindOnePeople(id));
    }

    const transactionListHandler = useCallback(async ({ action, data }) => {
        switch (action) {
            case 'ON_TOTAL':
                await onUpdatePerson({ amounts: data }, id)
                setUser({
                    amounts: data,
                    ...user,
                })
                break;

            default:
                break;
        }
    }, [id, user])

    if (!user) {
        return <Loader />
    }

    return (
        <Container fluid className='d-flex flex-column pt-3' style={{ height: '100vh' }}>
            {<AddTransactionModal modal={[modal, setModal]} />}
            <div>
                <BackButton action={<Button color={'link'} onClick={() => setModal(!modal)} className='border-0 text-info d-flex align-items-center' size={'sm'}>
                    <FaPlusCircle className={'mr-2'} /> ADD TRANSACTION</Button>}
                />
                <Container fluid className='p-2 mt-3 rounded-lg'>
                    <Row className='justify-content-center'>
                        <Col xs={4} >
                            <img width={'100%'} src={onLoadAvatar(user && user.avatar)} />
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col className='d-flex flex-column align-items-center justify-content-center'>
                            <h5 className='mt-2 font-weight-bold mb-1'>₱ {user && user.amounts && user.amounts.remaining}</h5>
                            <small>Paid</small>

                        </Col>
                        <Col className='d-flex flex-column align-items-center justify-content-center'>
                            <h5 className='mt-2 font-weight-bold mb-1'>₱ {user && user.amounts && user.amounts.sum}</h5>
                            <small>Total</small>
                        </Col>
                        <Col className='d-flex flex-column align-items-center justify-content-center'>
                            <h5 className='mt-2 font-weight-bold mb-1'>₱ {user && user.amounts && user.amounts.paid}</h5>
                            <small>Balance</small>
                        </Col>
                    </Row>
                </Container>
            </div>
            <TransactionList handler={transactionListHandler} />
        </Container>
    )
}

export default View
