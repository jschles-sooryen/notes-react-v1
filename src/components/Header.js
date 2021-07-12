import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
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
}));

const Header = () => {
  const classes = useStyles();
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

export default Header;
