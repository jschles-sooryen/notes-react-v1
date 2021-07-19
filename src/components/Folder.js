import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { string, number } from 'prop-types';
import { IconButton, Button, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MoreHorizRounded, Edit, Delete } from '@material-ui/icons';
import { setSelectedFolder } from '../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    '& > div:first-child > button': {
      display: 'none',
    },
    '&:hover > div:first-child > button': {
      display: 'block',
    },
  },
  info: {
    padding: theme.spacing(2),
    minHeight: 66,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  more: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '100%',
  },
  selected: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
  },
  selectedMore: {
    color: theme.palette.secondary.main,
    backgroundColor: '#fff',
  },
  options: {
    padding: theme.spacing(2),
    minHeight: 66,
    borderTop: `1px solid ${theme.palette.primary.main}`,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > div:first-child': {
      marginBottom: theme.spacing(2),
    },
  },
  button: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  text: {
    padding: 0,
    width: '100%',
    justifyContent: 'start',
    textTransform: 'none',
  },
}));

const Folder = ({ name, id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedFolder = useSelector((state) => state.folders.selected);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  useEffect(() => {
    if (selectedFolder !== id && isOptionsOpen) {
      setIsOptionsOpen(false);
    }
  }, [selectedFolder], isOptionsOpen);

  const handleOnClick = () => {
    dispatch(setSelectedFolder(id));
  };

  const handleIconClick = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  return (
    <div
      className={clsx(classes.root, { [classes.selected]: id === selectedFolder })}
      onClick={handleOnClick}
    >
      <div className={classes.info}>
        <div>{name}</div>
        <IconButton
          size="small"
          aria-label="More"
          onClick={handleIconClick}
        >
          <MoreHorizRounded
            classes={{
              root: clsx({ [classes.selected]: id === selectedFolder }),
            }}
          />
        </IconButton>
      </div>
      <Collapse in={isOptionsOpen}>
        <div className={classes.options}>
          <Button
            disableRipple
            classes={{
              root: classes.button,
              text: classes.text,
            }}
            startIcon={<Edit />}
          >
            Rename
          </Button>
          <Button
            disableRipple
            classes={{
              root: classes.button,
              text: classes.text,
            }}
            startIcon={<Delete />}
          >
            Delete
          </Button>
        </div>
      </Collapse>
    </div>
  );
};

Folder.propTypes = {
  name: string.isRequired,
  id: number.isRequired,
};

export default Folder;
