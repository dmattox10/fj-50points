import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardLink, Container, Row, Col, Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, CardHeader } from 'reactstrap'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Settings from './Settings'
import TabbedView from './TabbedView'

const Setup = props => {

    const { 
        formError, 
        doLogin, 
        doRegister, 
        isLoading, 
        configured, 
        players, 
        group, 
        removePlayer, 
        editGroup, 
        addPlayer, 
        isLoggedIn 
    } = props

    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(prevModal => !prevModal)
    }

    const gameRegex = new RegExp('[^A-Za-z0-9]+', 'g')

    const generateId = codeLength => {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789'
        for ( let i = 0; i < codeLength; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return result
    }

    Yup.addMethod(Yup.string, 'noSpaces', function (errorMessage) {
        return this.test('test-no-spaces', errorMessage, function (value) {
            const { path, createError } = this
            if (gameRegex.test(value)) return createError({ path, errorMessage })
            return true
        })
    })

    const formik = useFormik({
        initialValues: {
            game: 'FJ',
            gameId: generateId(8),  
            multiplier: 50,
            playerName: '',
            startingScore: 0,
        },
        validationSchema: Yup.object({
            game: Yup.string()
            .required('A game name is required!').noSpaces('Must only be letters and/or numbers'),
            multiplier: Yup.number()
            .required('Please enter points per achievement.')
            .integer('No decimals please.')
            .positive('Must not be a negative number or 0!'),
            playerName: Yup.string()
            .required('Please enter a name for this player.'),
            startingScore: Yup.number()
            .required('Please enter a starting score!')
            .integer('No decimals please.')
            .moreThan(-1, 'Please enter 0 or greater.')
        }),
        onSubmit: values => {
            if (values.game === 'FJ') {
                values.gameId = values.game
            }
            // do something!
            
        }
    })

    const LoginButton = (
        <div className='spacer'>
            <Row>
                <Button style={{width: '100%'}} className='btn-dark' onClick={() => toggle()}>Sign in to play online!</Button>
            </Row>
        </div>
    )

    const firstSetup = (
        <Card color='secondary'>
            <CardHeader>First Time Setup</CardHeader>
            <CardBody>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <FormGroup>
                            <Label for='game'>Game Name</Label>
                            <Input
                                id='game'
                                name='game'
                                type='text'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.game}
                                className={ !formik.errors.game ? 'form-control is-valid' : 'form-control is-invalid' }
                            />
                            { formik.errors.game ? <span className='invalid-feedback'>{ formik.errors.game }</span> : <span>&nbsp;</span>}
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Label for='multiplier'>Score Multiplier</Label>
                            <Input
                                id='multiplier'
                                name='multiplier'
                                type='text'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.multiplier}
                                className={ !formik.errors.multiplier ? 'form-control is-valid' : 'form-control is-invalid'}
                            />
                            { formik.errors.multiplier ? <span className='invalid-feedback'>{ formik.errors.multiplier }</span> : <span>&nbsp;</span>}
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Label for='playerName'>Player Name</Label>
                            <Input
                                id='playerName'
                                name='playerName'
                                type='text'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.playerName}
                                className={formik.touched.playerName && !formik.errors.playerName ? 'form-control is-valid' : 'form-control is-invalid'}
                            />
                            { formik.touched.playerName && formik.errors.playerName ? <span className='invalid-feedback'>{ formik.errors.playerName }</span> : <span>&nbsp;</span>}
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Label for='startingScore'>This player's starting score</Label>
                            <Input
                                id='startingScore'
                                name='startingScore'
                                type='text'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.startingScore}
                                className={ !formik.errors.startingScore ? 'form-control is-valid' : 'form-control is-invalid'}
                            />
                            { formik.errors.startingScore ? <span className='invalid-feedback'>{ formik.errors.startingScore }</span> : <span>&nbsp;</span>}
                        </FormGroup>
                    </Row>
                    <div className='spacer'>
                        <Row>
                            <Button type='submit' style={{width: '100%'}} className='btn-success'>Submit</Button>
                        </Row>
                    </div>
                </Form>
                { isLoggedIn ? null : LoginButton}
            </CardBody>
            <TabbedView toggle={toggle} modal={modal} formError={formError} doLogin={doLogin} doRegister={doRegister} />
        </Card>
    )

    return (
        <div>
            {configured === true ? <Settings formError={formError} doLogin={doLogin} doRegister={doRegister} isLoading={isLoading} players={players} group={group} addPlayer={addPlayer} removePlayer={removePlayer} editGroup={editGroup} isLoggedIn={isLoggedIn} /> : firstSetup }
        </div>
    )
}

export default Setup