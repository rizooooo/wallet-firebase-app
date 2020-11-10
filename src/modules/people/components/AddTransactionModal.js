import React, { useCallback } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { FormBuilder } from '../../common/components';
import config from '../constants/create-transaction.config';
import { ON_SUBMIT } from '../../common/components/form/types';
import Hooks from './../hooks/transaction.hooks';
import { useParams } from 'react-router-dom';

const AddTransactionModal = ({ modal: modalState }) => {
    const { id } = useParams();
    const [modal, setModal] = modalState
    const { onCreateTransaction } = Hooks();
    const toggleModal = () => setModal(!modal);

    const formHandler = useCallback(async ({ action, data }) => {
        switch (action) {
            case ON_SUBMIT:
                await onCreateTransaction(id, data);
                toggleModal();
                break;
            default:
                break;
        }
    }, [onCreateTransaction, id])

    return (
        <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Add Transaction</ModalHeader>
            <ModalBody className='bg-secondary'>
                <FormBuilder
                    submitText={'Add Transaction'}
                    config={config()}
                    errorClass={'text-white'}
                    handler={formHandler}
                />
            </ModalBody>
        </Modal>
    )
}

export default AddTransactionModal
