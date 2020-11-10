import React from 'react'
import { Button, Form as ReactStrapForm, FormGroup, Label, Input, FormText, Row, Col, FormFeedback, UncontrolledAlert, CustomInput } from 'reactstrap';
import { ON_SUBMIT, InputTypes } from './types';
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { FaExclamationTriangle } from 'react-icons/fa';

const Form = ({ config, handler, formError = null, submitText = null }) => {
    const { register, handleSubmit, control, errors, formState, reset } = useForm({ mode: 'onTouched' });
    const { touched } = formState;

    const onSubmit = data => {
        handler({ action: ON_SUBMIT, data, reset })
    }

    const onResetForm = () => {

    }

    return (
        <React.Fragment>
            {formError && <UncontrolledAlert color="danger" className='d-flex align-items-center font-weight-bold'>
                <FaExclamationTriangle className='mr-2' />
                {formError}
            </UncontrolledAlert>}
            <ReactStrapForm autoComplete={'off'} onSubmit={handleSubmit(onSubmit)}>
                {config.map(({ cols, row, title = null, customClass = null }) => (
                    <Row form key={row} className={customClass}>
                        {cols.map(({ name, label, size, type, placeholder, rules, items, inputClass }) => (
                            <Col key={name} md={size}>
                                {title &&
                                    <div>
                                        <h6 className='font-weight-bold text-info mb-0'>{title}</h6>
                                        <hr className='my-2' />
                                    </div>
                                }
                                <FormGroup>
                                    <Label for={name}>{label}</Label>

                                    {/* type: Text, password, textarea, number */}
                                    {
                                        type !== InputTypes.Select ?
                                            (
                                                <Input
                                                    valid={touched.hasOwnProperty(name) && !errors.hasOwnProperty(name)}
                                                    invalid={errors.hasOwnProperty(name)}
                                                    innerRef={register(rules)}
                                                    type={type}
                                                    name={name}
                                                    className={inputClass ? inputClass : undefined}
                                                    placeholder={placeholder}
                                                    key={name}
                                                />
                                            ) :
                                            (
                                                <CustomInput
                                                    valid={touched.hasOwnProperty(name) && !errors.hasOwnProperty(name)}
                                                    invalid={errors.hasOwnProperty(name)}
                                                    innerRef={register}
                                                    name={name}
                                                    type={type}
                                                    className={inputClass ? inputClass : undefined}
                                                    id={name}
                                                    name={name}>
                                                    <option value={null} disabled selected>Select {label}</option>
                                                    {items && items.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                                                </CustomInput>
                                            )
                                    }
                                    <FormFeedback>{errors[name] && errors[name].message}</FormFeedback>
                                </FormGroup>
                            </Col>
                        ))}
                    </Row>
                ))}
                <Row form>
                    <Col>
                                <Button block type='submit' color={'primary'} className='font-weight-bold'>{submitText ? submitText : 'Submit'}</Button>
                    </Col>
                </Row>
            </ReactStrapForm>
            {/* <DevTool control={control} /> */}
        </React.Fragment>

    )
}

export default Form