import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NotesList from './containers/NotesList';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={NotesList} />
          <Route exact path="/create">
            Create Note
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
