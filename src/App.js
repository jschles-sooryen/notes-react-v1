import Layout from './components/Layout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Layout>
          <Switch>
            <Route exact path="/">
              Notes
            </Route>
            <Route exact path="/create">
              Create Note
            </Route>
          </Switch>
      </Layout>
    </Router>
  );
}

export default App;
