import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { string, number } from 'prop-types';
import { IconButton, Button, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MoreHorizRounded, Edit, Delete } from '@material-ui/icons';
import FolderForm from './FolderForm';
import { setSelectedFolder, updateFolderInit, deleteFolderInit } from '../store/actions';

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
    '& > button:first-child': {
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
  const [isRenaming, setIsRenaming] = useState(false);

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

  const handleRenameClick = () => {
    setIsOptionsOpen(false);
    setIsRenaming(true);
  };

  const handleOnUpdate = (data) => {
    setIsRenaming(false);
    const newFolder = { ...data, id };
    dispatch(updateFolderInit(newFolder));
  };

  const handleDeleteClick = () => {
    dispatch(deleteFolderInit(id));
  };

  return (
    <div
      className={clsx(classes.root, { [classes.selected]: id === selectedFolder })}
      onClick={handleOnClick}
    >
      {isRenaming ? (
        <FolderForm
          name={name}
          onUpdate={handleOnUpdate}
          onCancel={() => setIsRenaming(false)}
        />
      ) : (
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
      )}
      <Collapse in={isOptionsOpen}>
        <div className={classes.options}>
          <Button
            disableRipple
            classes={{
              root: classes.button,
              text: classes.text,
            }}
            startIcon={<Edit />}
            onClick={handleRenameClick}
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
            onClick={handleDeleteClick}
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
