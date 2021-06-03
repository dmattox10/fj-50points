import { Container, Jumbotron } from 'reactstrap'
import { Switch, Route, useHistory } from 'react-router-dom'

import { useWindowSize } from './hooks/useWindowSize'

import Footer from './components/Footer'
import Play from './components/Play'
import Settings from './components/Settings'

function App() {

  const size = useWindowSize()
  const styles = {
    height: size.height
  }
  const history = useHistory()
  return (
    <div className="App" style={styles}>
      <Container>

      </Container>
      <Footer />
      <Switch>
        <Route path='/settings'>
          <Settings />
        </Route>
        <Route path='/'>
          <Play />
        </Route>
      </Switch>
    </div>
  )
}

export default App
