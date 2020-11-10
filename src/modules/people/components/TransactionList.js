import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Input, Badge, Button, Spinner } from 'reactstrap';
import { FaMoneyBillWave, FaPlusCircle, FaMoneyBill, FaSmileBeam } from 'react-icons/fa';
import TransactionHooks from './../hooks/transaction.hooks';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { parseDate } from '../../../core/utils';

const TransactionList = ({ handler }) => {
    const { onFetchTransactions, onSubscriptionTransactions, onToggleTransaction, onUpdatePersonAttributes } = TransactionHooks();
    const [transactions, setTransactions] = useState(null);
    const [tempTransactions, setTemptransaction] = useState([])
    const { id } = useParams();

    useEffect(() => {
        init();
        return () => init()
    }, [id])

    const getTotal = trans => {
        console.log(trans);
        let amounts = {
            sum: 0,
            remaining: 0,
        };
        trans.forEach(t => {
            amounts.sum += t.amount;

            if (t.paid) {
                amounts.remaining += t.amount
            }
        })

        amounts.paid = amounts.sum - amounts.remaining;
        handler({ action: 'ON_TOTAL', data: amounts })
    }

    const init = async () => {
        let sub = onSubscriptionTransactions(id, (async () => {
            console.log('@FIREDD!!')
            try {
                const trans = await onFetchTransactions(id);
                getTotal(trans);
                setTransactions(trans);
                setTemptransaction(trans);
            } catch (error) {
                setTransactions([]);
            }
        }));
        return () => {
            sub()
        }
    }

    const handleTransaction = useCallback(async (transaction) => {
        await onToggleTransaction(id, transaction)
        // await onUpdatePersonAttributes(id, getTotal(transaction))
    }, [id])


    const handleSearch = useCallback(({ target: { value } }) => {
        console.log(value);
        //  let tempTransactions = transactions;

        let temp;

        if (value === '') {
            temp = tempTransactions;
        } else {
            temp = transactions.filter(t => t.description.toLowerCase().includes(value.toLowerCase()))
        }
        setTransactions(temp)
    }, [transactions])

    if (!transactions) {
        return <Row className='mt-5'>
            <Col className='d-flex flex-column justify-content-center align-items-center'>
                <Spinner type='grow' color='info' />
                <small className='font-weight-bold mt-2'>Loading Transactions...</small>
            </Col>
        </Row>
    }

    if (transactions.length === 0) {
        return <Row className='mt-5'>
            <Col className='d-flex flex-column justify-content-center align-items-center'>
                <FaMoneyBill size={50} />
                <h5 className='font-weight-bold mt-2'>No Transactions yet...</h5>
            </Col>
        </Row>
    }
    return (
        <React.Fragment>
            <Row className='mt-2'>
                <Col className='d-flex justify-content-between align-items-center'>
                    <h5 className='font-weight-bold mb-0'>Transactions</h5>
                    {/* <small className='font-weight-bold text-primary'>VIEW ALL</small> */}
                </Col>
            </Row>
            <Row className='my-2'>
                <Col>
                    <Input placeholder='Search Transaction' onChange={handleSearch} />
                </Col>
            </Row>
            <div style={{ flex: 1, overflowX: 'hidden', overflowY: 'scroll', paddingBottom: 60 }}>
                {transactions && transactions.map(t => (
                    <Row key={t.id} className='mt-3 clickable noselect' onClick={() => handleTransaction(t)}>
                        <Col xs={1}>
                            {t.paid ? <FaSmileBeam className='text-success' size={20} /> : <FaMoneyBillWave size={20} />}
                        </Col>
                        <Col className='d-flex flex-column align-items-start'>
                            <span className={`${t.paid ? 'paid' : undefined} text-nowrap`}>
                                {t.description}
                            </span>
                            {t.paidDate && <Badge color='secondary' className='my-1'>Paid {parseDate(t.paidDate)}</Badge>}
                            <small className='text-muted text-nowrap'>created {parseDate(t.created)}</small>
                        </Col>
                        <Col className='d-flex flex-column align-items-end justify-content-center'>
                            <span className={t.paid ? 'text-success font-weight-bold' : 'text-danger'}>{!t.paid && '-'}₱ {t.amount}</span>
                            <small className={t.paid ? 'text-success font-weight-bold' : 'text-danger'}>Amount</small>
                        </Col>
                    </Row>
                ))}
            </div>
        </React.Fragment>
    )
}

export default TransactionList
