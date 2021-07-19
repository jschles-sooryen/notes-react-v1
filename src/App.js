import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header';
import FoldersList from './containers/FoldersList';

const useStyles = makeStyles(() => ({
  root: {
    margin: '0 auto',
    maxWidth: 1440,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  contentRoot: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.contentRoot}>
        <FoldersList />
      </div>
    </div>
  );
};

export default App;
