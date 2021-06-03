import { Container, Jumbotron } from 'reactstrap'
import { Switch, Route, Link } from 'react-router-dom'

import { useWindowSize } from './hooks/useWindowSize'

import Footer from './components/Footer'
import Play from './components/Play'
import Settings from './components/Settings'
import Setup from './components/Setup'
import User from './components/User'

function App() {

  const size = useWindowSize()
  const styles = {
    height: size.height
  }
  return (
    <div className="App" style={styles}>
      <Container>

      </Container>
      <Footer />
      <Switch>
        <Route path='/play'>
          <Play />
        </Route>
        <Route path='/settings'>
          <Settings />
        </Route>
        <Route path='/user'>
          <User />
        </Route>
        <Route path='/'>
          <Setup />
        </Route>
      </Switch>
    </div>
  )
}

export default App
