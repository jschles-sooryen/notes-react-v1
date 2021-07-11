import withStyles from '@material-ui/core/styles/withStyles';
import Header from '../components/Header';

const styles = () => ({
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
});

const Layout = (props) => {
  const { classes, children } = props;
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.contentRoot}>
        {children}
      </div>
    </div>
  );
};

export default withStyles(styles)(Layout);
