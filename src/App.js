import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './containers/Layout';
import FoldersList from './containers/FoldersList';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={FoldersList} />
          <Route exact path="/create">
            Create Note
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
