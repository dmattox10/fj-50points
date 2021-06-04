import { CustomInput, Card, CardBody, CardTitle, CardSubtitle, CardText, CardLink, Container, Row, Col, Form, FormGroup, Label, FormFeedback, Input, Button, Modal, ModalHeader, ModalBody, CardHeader } from 'reactstrap'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import validator from 'validator'

// if validator.isEmail(username)
let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")

const Register = props => {

    const { toggle, formError, doRegister } = props

    const [passwordMessage, setPasswordMessage] = useState(null)

    Yup.addMethod(Yup.string, 'isValidEmail', function (errorMessage) {
        return this.test('test-is-email', errorMessage, function (value) {
            const { path, createError } = this
            if (!validator.isEmail(value)) return createError({ path, errorMessage })
            return true
        })
    })

    Yup.addMethod(Yup.string, 'isGoodPassword', function (errorMessage) {
        return this.test('test-good-password', errorMessage, function (value) {
            const { path, createError } = this
            if (!strongRegex.test(value) || !mediumRegex.test(value)) return createError({ path, errorMessage })
            else if (!strongRegex.test(value) && mediumRegex.test(value)) {
                setPasswordMessage({
                    color: 'yellow',
                    message: 'Medium Strength Password.'
                })
            }
            else {
                setPasswordMessage({
                    color: 'green',
                    message: 'Strong Password!'
                })
                return true
            }
        })
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            accept: false,
            online: false,
            location: false,
        },
        validationSchema: Yup.object({
            username: Yup.string()
            .required('An email address is required!')
            .isValidEmail('Not a valid email address!'),
            password: Yup.string()
            .required('Please enter a password')
            .isGoodPassword('Security is serious, choose a better password.'),
            accept: Yup.bool().oneOf([true], 'Accepting Terms & Conditions is required')
        }),
        onSubmit: values => {
            // do something!
            doRegister(values)
            toggle()
        }
    })
    return (
        <div className='spacer'>
            <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <FormGroup>
                        <Label for='username'>Email Address  <span className='required'>*</span></Label>
                        <Input
                            id='username'
                            name='username'
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            className={ !formik.errors.username ? 'form-control is-valid' : 'form-control is-invalid' }
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
                            className={ !formik.errors.password ? 'form-control is-valid' : 'form-control is-invalid' }
                        />
                        { formik.errors.password ? <span className='invalid-feedback'>{ formik.errors.password }</span> : <span>&nbsp;</span>}
                    </FormGroup>
                </Row>
                <Row>
                    <div className='form-check form-switch'>
                        <input className='form-check-input'
                            type='checkbox'
                            id='accept'
                            name='accept'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.accept}
                        />
                        <label class='form-check-label' for='accept'>Do you accept the terms and conditions?  <span className='required'>*</span>&nbsp;{ formik.errors.password ? <span className='invalid-feedback'>{ formik.errors.accept }</span> : <span>&nbsp;</span>}</label>
                    </div>
                </Row>
                <Row>
                    <div className='form-check form-switch'>
                        <input className='form-check-input'
                            type='checkbox'
                            id='online'
                            name='online'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.online}
                        />
                        <label class='form-check-label' for='online'>Play FJ online with other groups?</label>
                    </div>
                </Row>
                <Row>
                    <div className='form-check form-switch'>
                        <input className='form-check-input'
                            type='checkbox'
                            id='location'
                            name='location'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.location}
                        />
                        <label class='form-check-label' for='location'>Share location and be alerted to scores nearby?</label>
                    </div>
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

export default Register