import { Container, Jumbotron } from 'reactstrap'
import { Switch, Route, useHistory } from 'react-router-dom'

import { useWindowSize } from './hooks/useWindowSize'
import { useDexie } from './hooks/useDexie'

import Footer from './components/Footer'
import Play from './components/Play'
import Settings from './components/Settings'

function App() {

  const size = useWindowSize()
  const styles = {
    height: size.height
  }

  const history = useHistory()
  const [players, group, doLogin, doRegister, formError, gameError] = useDexie()

  return (
    <div className="App" style={styles}>
      <Container>

      </Container>
      <Footer />
      <Switch>
        <Route path='/settings'>
          <div className='spacer'>
            <Container>
              <Settings players={players} group={group} doLogin={doLogin} doRegister={doRegister} formError={formError} />
            </Container>
          </div>
        </Route>
        <Route path='/'>
          <Play players={players} group={group} gameError={gameError} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
