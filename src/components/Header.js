import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  root: {
    margin: '0 auto',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  flexContainer: {
    display: 'flex',
    maxWidth: 1440,
    justifyContent: 'space-between',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    '& h1': {
      fontSize: 22,
    },
  },
  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    '& a': {
      display: 'block',
    },
    '& > :first-child': {
      marginRight: theme.spacing(1),
    },
  },
});

const Header = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.flexContainer}>
        <h1>React Notes App V1</h1>

        <div className={classes.linkContainer}>
          <Link to="/">All Notes</Link>
          <Link to="/create">Create Note</Link>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Header);
