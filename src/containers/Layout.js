import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header';

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

const Layout = (props) => {
  const classes = useStyles();
  const { children } = props;
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.contentRoot}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
