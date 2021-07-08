import { Container, Jumbotron } from 'reactstrap'
import { Switch, Route, useHistory } from 'react-router-dom'

import { useWindowSize } from './hooks/useWindowSize'
import { useDexie } from './hooks/useDexie'

import Footer from './components/Footer'
import Play from './components/Play'
import Setup from './components/Setup'

function App() {

  const size = useWindowSize()
  const styles = {
    height: size.height
  }

  const history = useHistory()
  const [configured, players, group, doLogin, doRegister, formError, gameError, isLoading, removePlayer, editGroup, addPlayer] = useDexie()

  return (
    <div className="App" style={styles}>
      <Footer />
      <Switch>
        <Route path='/settings'>
          <div className='spacer'>
            <Container>
              <Setup players={players} group={group} doLogin={doLogin} doRegister={doRegister} formError={formError} isLoading={isLoading} configured={configured} removePlayer={removePlayer} addPlayer={addPlayer} editGroup={editGroup} />
            </Container>
          </div>
        </Route>
        <Route path='/'>
          <Container>
            <Play players={players} group={group} gameError={gameError} />
          </Container>
        </Route>
      </Switch>
    </div>
  )
}

export default App
