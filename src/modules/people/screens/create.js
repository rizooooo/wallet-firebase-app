import React, { useState } from 'react'
import { Container, Row, Col, Label, Spinner } from 'reactstrap'
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { FormBuilder } from '../../common/components';
import config from '../constants/form.config';
import { ON_SUBMIT } from '../../common/components/form/types';
import BackButton from '../components/BackButton';
import { avatars } from '../constants/avatars';
import AvatarPicker, { AvatarTypes } from '../components/AvatarPicker';
import BaseDataStore from '../../../models/base.model';
import { PEOPLE } from '../../../models/collections';
import Hooks from './../hooks/people.hooks';
const Create = () => {
    const { push } = useHistory();
    const { onCreatePerson } = Hooks();
    const [form, setForm] = useState({
        avatar: null,
        name: null
    })

    const formHandler = async ({ action, data, reset }) => {
        switch (action) {
            case ON_SUBMIT:
                setForm({ ...form, name: data.name });
                if (data.name && form.avatar) {
                    const res = await onCreatePerson({ name: data.name, avatar: form.avatar });
                    reset()
                    push('/people')
                }
                break;
            default:
                break;
        }
    }

    const avatarHandler = ({ action, data }) => {
        switch (action) {
            case AvatarTypes.ON_SELECT_AVATAR:
                setForm({
                    ...form,
                    avatar: data.name
                })
                break;

            default:
                break;
        }
    }

    return (    
        <Container className='pt-3'>
            <BackButton />
            <Row className='mt-3'>
                <Col>
                    <AvatarPicker handler={avatarHandler} />
                    <FormBuilder
                        handler={formHandler}
                        config={config()}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Create
