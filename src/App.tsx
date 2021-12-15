/* eslint-disable no-nested-ternary */
import { useState, useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Auth from './components/Auth';
import Header from './components/Header';
import FoldersList from './containers/FoldersList';
import NotesList from './containers/NotesList';
import NoteDetail from './components/NoteDetail';
import LoadingIndicator from './components/LoadingIndicator';
import { signInInit } from './store/reducers/authReducer';
import { selectNotes } from './store/selectors/notes';
import { selectAuth } from './store/selectors/auth';

const useStyles = makeStyles(() => ({
  root: {
    margin: '0 auto',
    maxWidth: 1440,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  contentRoot: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  docked: {
    height: '100%',
  },
  paper: {
    position: 'relative',
  },
  loading: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
}));

const App: FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showFolders, setShowFolders] = useState(true);
  const { isCreatingNote, selected } = useSelector(selectNotes);
  const { user, accessToken } = useSelector(selectAuth);

  const isLoggedIn = !!user;
  const isLoadingUserFromCookie = !isLoggedIn && accessToken;

  useEffect(() => {
    if (isLoadingUserFromCookie) {
      dispatch(signInInit());
    }
  }, [isLoadingUserFromCookie]);

  const renderLoadingUser = () => (
    <div className={classes.loading}>
      <LoadingIndicator />
    </div>
  );

  const renderSignedInContent = () => (
    <>
      <Drawer
        open={showFolders}
        variant="persistent"
        anchor="left"
        classes={{
          docked: classes.docked,
          paper: classes.paper,
        }}
        SlideProps={{
          unmountOnExit: true,
        }}
      >
        <FoldersList />
      </Drawer>
      <NotesList />
      {isCreatingNote && (
        <NoteDetail isNew={isCreatingNote} />
      )}
      {Boolean(selected) && (
        <NoteDetail isNew={false} />
      )}
    </>
  );

  return (
    <div className={classes.root}>
      <Header
        onToggleFolders={() => setShowFolders(!showFolders)}
        showFolders={showFolders}
      />
      <div className={classes.contentRoot}>
        {isLoadingUserFromCookie ? renderLoadingUser() : isLoggedIn ? renderSignedInContent() : <Auth />}
      </div>
    </div>
  );
};

export default App;
