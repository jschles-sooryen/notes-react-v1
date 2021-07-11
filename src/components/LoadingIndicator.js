import { CircularProgress } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  root: {
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const LoadingIndicator = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default withStyles(styles)(LoadingIndicator);
