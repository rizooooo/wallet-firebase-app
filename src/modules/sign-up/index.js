import React, { useEffect, useCallback, useState } from 'react'
import { FormBuilder } from '../common/components'
import Global from './../common/context'
import { ON_SUBMIT } from '../common/components/form/types'
import config from './constants/form.config'
import { useHistory, Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'



const SignUpView = () => {
    const { AuthServices } = Global;
    const { onSignUp } = AuthServices();
    const [formError, setFormError] = useState(null);
    const { push } = useHistory();
    // useEffect(() => {
    //     getInquiries()
    // }, [])


    // const getInquiries = useCallback(async () => {
    //     // console.log(await BaseDataStore.GET('inquiries'), '@inuiques')
    //     // await BaseDataStore.GET('inquiries');
    //     await BaseDataStore.SUBSCRIPTION(INQUIRIES, snap => {
    //         console.log(snap, '@SNAP')
    //     })
    //     // console.log(await BaseDataStore.SUBSCRIPTION('inquiries'), '@subscription')

    // }, [])

    const formHandler = ({ action, data, reset }) => {
        switch (action) {
            case ON_SUBMIT:
                // console.log(data)
                console.log('FORM ONSUBMIT')
                onSignUpUser(data, reset)
                break;
            default:
                break;
        }
    }

    const onSignUpUser = async ({ email, password }, reset) => {
        console.log('@EMAIL', email);
        console.log('@password', password);
        try {
            const res = await onSignUp({ email, password })
            console.log(res)
            if (res) {
                push('/people');
            }
        } catch (error) {
            console.log(error, '@error')
            reset()
            setFormError('Error has Occured')
        }

    }

    console.log('rerender')
    return (
        <div className='d-flex flex-column p-3'>
            <h3 className='font-weight-bold text-info'>Register!</h3>
            <FormBuilder
                formError={formError}
                config={config()}
                handler={formHandler}
            />
            <Row className='mt-3'>
                <Col className='text-center'>
                Already Registered? <Link to={'/'} className='text-info font-weight-bold' href='#'>Sign In here</Link>
                </Col>
            </Row>
        </div>
    )
}

export default SignUpView
