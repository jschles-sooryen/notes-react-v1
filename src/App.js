import Layout from './components/Layout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/">
            Notes App
          </Route>
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
