import { Container, Navbar, Nav, NavItem, NavLink, NavbarText, Row, Col } from 'reactstrap'

const Footer = props => {
    return (
        <div className='fixed-bottom'>
          <Navbar color='dark' dark>
            <Container>
            <Nav className='mr-auto nav-fill w-100' navbar>
              <Row>
                <Col>
                  <NavItem>
                    <NavLink href='/play/'>Play</NavLink>
                  </NavItem>
                </Col>
                <Col>
                  <NavItem>
                    <NavLink href='/settings/'>Settings</NavLink>
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