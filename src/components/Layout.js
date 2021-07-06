import withStyles from '@material-ui/core/styles/withStyles';
import Header from './Header';

const styles = (theme) => ({
  root: {
    margin: '0 auto',
    maxWidth: 1440,
  },
  contentRoot: {
    padding: theme.spacing(2),
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
