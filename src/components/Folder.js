import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  root: {
    cursor: 'pointer',
    padding: theme.spacing(2),
  },
});

const Folder = (props) => {
  const { classes, name } = props;

  return (
    <div className={classes.root}>
      {name}
    </div>
  );
};

export default withStyles(styles)(Folder);
