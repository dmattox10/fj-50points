import { Card, CardBody, Row, Form, FormGroup, Label, Input, Button, CardHeader } from 'reactstrap'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Player from './Player'
import TabbedView from './TabbedView'

const Settings = props => {

    const { formError, doLogin, doRegister, isLoading, players, group, addPlayer, removePlayer } = props
    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(prevModal => !prevModal)
    }

    const formik = useFormik({
        initialValues: {
            playerName: '',
            startingScore: 0,
        },
        validationSchema: Yup.object({
            playerName: Yup.string()
            .required('Please enter a name for this player.'),
            startingScore: Yup.number()
            .required('Please enter a starting score!')
            .integer('No decimals please.')
            .moreThan(-1, 'Please enter 0 or greater.')
        }),
        onSubmit: values => {
            // do something!
            
        }
    })

    return (
        <Card color='secondary'>
            <CardHeader>Settings</CardHeader>
            <CardBody>
                <Form onSubmit={formik.handleSubmit}>
                    { players ? players.map(player => <Player player={ player } removePlayer={ removePlayer } />) : null }
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
                <div className='spacer'>
                    <Row>
                        <Button style={{width: '100%'}} className='btn-dark' onClick={() => toggle()}>Sign in to play online!</Button>
                    </Row>
                </div>
            </CardBody>
            <TabbedView toggle={toggle} modal={modal} formError={formError} doLogin={doLogin} doRegister={doRegister} />
        </Card>
    )
}

export default Settings