import { Modal, ModalHeader, ModalBody, ModalFooter, TabContent, TabPane, Nav, NavLink, Row, Col, Jumbotron, NavItem } from "reactstrap"
import { useState } from 'react'
import classnames from 'classnames'

import Login from './Login'
import Register from './Register'
import Terms from './Terms'

const TabbedView = props => {
    
    const { modal, toggle, doLogin, doRegister, formError } = props

    const [activeTab, setActiveTab] = useState('1')

    const toggleTab = tab => {
        if (activeTab !== tab) setActiveTab(prevState => tab)
    }

    return (

        <div className='spacer'>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Authentication</ModalHeader>
                <ModalBody>
                    <Nav tabs>
                        <NavItem style={{width: '33%'}}>
                            <NavLink
                                className={classnames({active: activeTab === '1'})}
                                onClick={() => { toggleTab('1') }}
                            >
                                Login
                            </NavLink>
                        </NavItem>
                        <NavItem style={{width: '33%'}}>
                            <NavLink
                                className={classnames({active: activeTab === '2'})}
                                onClick={() => { toggleTab('2') }}
                            >
                                Register
                            </NavLink>
                        </NavItem>
                        <NavItem style={{width: '33%'}}>
                            <NavLink
                                className={classnames({active: activeTab === '3'})}
                                onClick={() => { toggleTab('3') }}
                            >
                                Terms
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId='1'>
                            <Login toggle={toggle} doLogin={doLogin} formError={formError} />
                        </TabPane>
                        <TabPane tabId='2'>
                            <Register toggle={toggle} doRegister={doRegister} formError={formError} />
                        </TabPane>
                        <TabPane tabId='3'>
                            <Terms />
                        </TabPane>
                    </TabContent>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default TabbedView