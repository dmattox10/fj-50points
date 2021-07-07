import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardLink, Container, Row, Col, Form, FormGroup, Label, FormFeedback, Input, Button, Modal, ModalHeader, ModalBody, CardHeader } from 'reactstrap'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import validator from 'validator'

// if validator.isEmail(username)
let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")

const Login = props => {

    const { toggle, formError, doLogin } = props

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
            .required('An email address is required!'),
            password: Yup.string()
            .required('Please enter a password'),
        }),
        onSubmit: values => {
            doLogin(values)
            toggle()
        }
    })
    return (
        <div className='spacer'>
            <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <FormGroup>
                        <Label for='username'>Email Address <span className='required'>*</span></Label>
                        <Input
                            id='username'
                            name='username'
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            className={ ! formik.errors.username ? 'form-control is-valid' : 'form-control is-invalid' }
                        />
                        { formik.errors.username ? <span className='invalid-feedback'>{ formik.errors.username }</span> : <span>&nbsp;</span>}
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Label for='password'>Password <span className='required'>*</span></Label>
                        <Input
                            id='password'
                            name='password'
                            type='password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={ ! formik.errors.password ? 'form-control is-valid' : 'form-control is-invalid' }
                        />
                        { formik.errors.password ? <span className='invalid-feedback'>{ formik.errors.password }</span> : <span>&nbsp;</span>}
                    </FormGroup>
                </Row>
                <div className='spacer'>
                    <Row>
                        <Button type='submit' style={{width: '100%'}} className='btn-success'>Submit</Button>
                    </Row>
                </div>
                <div className='spacer'>
                    <Row>
                        {formError ? <span className='invalid-feedback'>{ formError.message }</span> : <span>&nbsp;</span>}
                    </Row>
                </div>
            </Form>
        </div>
    )
}

export default Login