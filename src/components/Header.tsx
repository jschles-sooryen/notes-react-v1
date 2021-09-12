import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from '@material-ui/core';
import {
  Reorder, Apps, VerticalSplit, AttachFile, Delete, Create,
} from '@material-ui/icons';
import {
  setLayout, toggleCreateNote, setSelectedNote, deleteFolderInit, deleteNoteInit,
} from '../store/actions';
import { RootState } from '../store/types';

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
  buttonGroupRoot: {
    marginRight: theme.spacing(2),
  },
  button: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: '#fff',
    },
  },
  selectedButton: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
  },
  innerFlexLeft: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface HeaderProps {
  onToggleFolders(): void;
  showFolders: boolean;
}

const Header: FC<HeaderProps> = ({ onToggleFolders, showFolders }: HeaderProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const layout = useSelector((state: RootState) => state.layout);
  const isCreatingNote = useSelector((state: RootState) => state.notes.isCreatingNote);
  const selectedNote = useSelector((state: RootState) => state.notes.selected);
  const selectedFolder = useSelector((state: RootState) => state.folders.selected);

  const handleLayoutClick = (_: any, type: string) => {
    dispatch(setLayout(type));
  };

  const handleCreateNoteClick = () => {
    if (!isCreatingNote) {
      dispatch(toggleCreateNote());
      dispatch(setSelectedNote(null));
    }
  };

  const handleDeleteClick = () => {
    if (isCreatingNote) {
      dispatch(toggleCreateNote());
      dispatch(setSelectedNote(null));
    } else if (selectedNote !== null) {
      dispatch(deleteNoteInit());
    } else if (selectedFolder !== null) {
      dispatch(deleteFolderInit(selectedFolder));
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.flexContainer}>
        <div className={classes.innerFlexLeft}>
          <h1>React Notes App V1</h1>
          <ButtonGroup
            classes={{
              root: classes.buttonGroupRoot,
            }}
          >
            <Button
              aria-label="column"
              onClick={(e) => handleLayoutClick(e, 'column')}
              classes={{
                root: clsx(classes.button, { [classes.selectedButton]: layout === 'column' }),
              }}
            >
              <Reorder />
            </Button>

            <Button
              aria-label="grid"
              onClick={(e) => handleLayoutClick(e, 'grid')}
              classes={{
                root: clsx(classes.button, { [classes.selectedButton]: layout === 'grid' }),
              }}
            >
              <Apps />
            </Button>
          </ButtonGroup>

          <ButtonGroup
            classes={{
              root: classes.buttonGroupRoot,
            }}
          >
            <Button
              aria-label="toggle-folders"
              onClick={onToggleFolders}
              classes={{
                root: clsx(classes.button, { [classes.selectedButton]: !showFolders }),
              }}
            >
              <VerticalSplit />
            </Button>
          </ButtonGroup>

          {/* TODO: Show all attachments in folder */}
          <ButtonGroup
            classes={{
              root: classes.buttonGroupRoot,
            }}
          >
            <Button
              onClick={() => {}}
              classes={{
                root: clsx(classes.button, { [classes.selectedButton]: false }),
              }}
            >
              <AttachFile />
            </Button>
          </ButtonGroup>

          {/* TODO: Delete selected folder or selected note */}
          <ButtonGroup
            classes={{
              root: classes.buttonGroupRoot,
            }}
          >
            <Button
              aria-label="header-delete"
              onClick={handleDeleteClick}
              classes={{
                root: classes.button,
              }}
            >
              <Delete />
            </Button>
          </ButtonGroup>

          <ButtonGroup
            classes={{
              root: classes.buttonGroupRoot,
            }}
          >
            <Button
              aria-label="create-note"
              onClick={handleCreateNoteClick}
              classes={{
                root: clsx(classes.button, { [classes.selectedButton]: isCreatingNote }),
              }}
            >
              <Create />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default Header;
