import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from '@material-ui/core';
import { VerticalSplit, Delete, Create } from '@material-ui/icons';
import { GoogleLogout } from 'react-google-login';
import { deleteFolderInit, resetFolders } from '../store/reducers/foldersReducer';
import {
  toggleCreateNote, setSelectedNote, deleteNoteInit, resetNotes,
} from '../store/reducers/notesReducer';
import { signOut } from '../store/reducers/authReducer';
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
  innerFlexRight: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface HeaderProps {
  onToggleFolders(): void;
  showFolders: boolean;
}

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

const Header: FC<HeaderProps> = ({ onToggleFolders, showFolders }: HeaderProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isCreatingNote = useSelector((state: RootState) => state.notes.isCreatingNote);
  const selectedNote = useSelector((state: RootState) => state.notes.selected);
  const selectedFolder = useSelector((state: RootState) => state.folders.selected);
  const user = useSelector((state: RootState) => state.auth.user);

  const isLoggedIn = !!user;

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

  const handleLogout = () => {
    Cookies.remove('access_token');
    dispatch(signOut());
    dispatch(resetFolders());
    dispatch(resetNotes());
  };

  return (
    <div className={classes.root}>
      <div className={classes.flexContainer}>
        <div className={classes.innerFlexLeft}>
          <h1>React Notes App V1</h1>
          {isLoggedIn ? (
            <>
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
            </>
          ) : null}
        </div>

        {isLoggedIn ? (
          <div className={classes.innerFlexRight}>
            <GoogleLogout
              clientId={googleClientId}
              buttonText="Sign Out"
              onLogoutSuccess={handleLogout}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
