import { useState, useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import {
  IconButton, Button, Collapse, Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MoreHorizRounded, Edit, Delete } from '@material-ui/icons';
import FolderForm from './FolderForm';
import { setSelectedFolder, updateFolderInit, deleteFolderInit } from '../store/reducers/foldersReducer';
import { fetchNotesInit, setSelectedNote } from '../store/reducers/notesReducer';
import { selectSelectedFolder } from '../store/selectors/folders';

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

interface FolderProps {
  name: string;
  id: string;
}

const Folder: FC<FolderProps> = ({ name, id }: FolderProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedFolder = useSelector(selectSelectedFolder);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);

  useEffect(() => {
    if (selectedFolder !== id && isOptionsOpen) {
      setIsOptionsOpen(false);
    }
  }, [selectedFolder, isOptionsOpen]);

  const handleOnClick = () => {
    dispatch(setSelectedFolder(id));
    dispatch(setSelectedNote(null));
    dispatch(fetchNotesInit(id));
  };

  const handleIconClick = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleRenameClick = () => {
    setIsOptionsOpen(false);
    setIsRenaming(true);
  };

  const handleOnUpdate = (data: { name: string, description: string }) => {
    setIsRenaming(false);
    const newFolder = { ...data, _id: id };
    dispatch(updateFolderInit(newFolder));
  };

  const handleDeleteClick = () => {
    dispatch(deleteFolderInit(id));
  };

  return (
    <div
      className={clsx(classes.root, { [classes.selected]: id === selectedFolder })}
      onClick={handleOnClick}
      data-testid={`folder-${id}`}
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
      <Divider />
    </div>
  );
};

export default Folder;
