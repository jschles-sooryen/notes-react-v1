import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from '@material-ui/core';
import { Reorder, Apps } from '@material-ui/icons';
import { setLayout } from '../store/actions';

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
      fontSize: 16,
      marginRight: theme.spacing(2),
    },
  },
  layoutButton: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: '#fff',
    },
  },
  selectedLayoutButton: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
  },
  innerFlexLeft: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const layout = useSelector((state) => state.layout);

  const handleLayoutClick = (e, type) => {
    dispatch(setLayout(type));
  };

  return (
    <div className={classes.root}>
      <div className={classes.flexContainer}>
        <div className={classes.innerFlexLeft}>
          <h1>React Notes App V1</h1>
          <ButtonGroup>
            <Button
              onClick={(e) => handleLayoutClick(e, 'column')}
              classes={{
                root: clsx(classes.layoutButton, { [classes.selectedLayoutButton]: layout === 'column' }),
              }}
            >
              <Reorder />
            </Button>

            <Button
              onClick={(e) => handleLayoutClick(e, 'grid')}
              classes={{
                root: clsx(classes.layoutButton, { [classes.selectedLayoutButton]: layout === 'grid' }),
              }}
            >
              <Apps />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default Header;
