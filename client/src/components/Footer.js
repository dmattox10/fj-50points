import { Container, Navbar, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import { InlineIcon } from '@iconify/react'
import cogsIcon from '@iconify/icons-fa-solid/cogs'
import gamepadIcon from '@iconify/icons-fa-solid/gamepad'

const Footer = props => {

    return (
        <div className='fixed-bottom'>
          <Navbar color='dark' dark>
            <Container>
            <Nav className='mr-auto nav-fill w-100' navbar>
              <Row>
                <Col>
                  <NavItem>
                    <NavLink href='/play/'><InlineIcon icon={gamepadIcon} color='#e83283' width='40' height='40' /></NavLink>
                  </NavItem>
                </Col>
                <Col>
                  <NavItem>
                    <NavLink href='/settings/'><InlineIcon icon={cogsIcon} color='#3a8fd9' width='40' heeight='40' /></NavLink>
                  </NavItem>
                </Col>
              </Row>
            </Nav>
            </Container>
          </Navbar>
      </div>
    )
}

export default Footer