import withStyles from '@material-ui/core/styles/withStyles';
import { MoreHorizRounded } from '@material-ui/icons';

const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    padding: theme.spacing(2),
    minHeight: 60,
    '& > svg': {
      display: 'none',
    },
    '&:hover > svg': {
      display: 'block',
    },
  },
});

const Folder = (props) => {
  const { classes, name } = props;

  return (
    <div className={classes.root}>
      <div>{name}</div>
      <MoreHorizRounded />
    </div>
  );
};

export default withStyles(styles)(Folder);
