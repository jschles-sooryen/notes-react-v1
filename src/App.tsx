import { useState, useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Auth from './components/Auth';
import Header from './components/Header';
import FoldersList from './containers/FoldersList';
import NotesList from './containers/NotesList';
import NoteDetail from './components/NoteDetail';
import { RootState } from './store/types';
import { signInInit } from './store/reducers/authReducer';

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
}));

const App: FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showFolders, setShowFolders] = useState(true);
  const { isCreatingNote, selected } = useSelector((state: RootState) => state.notes);
  const { user } = useSelector((state: RootState) => state.auth);

  const isLoggedIn = !!user && typeof user !== 'string';

  useEffect(() => {
    if (user && typeof user === 'string') {
      dispatch(signInInit());
    }
  }, [user]);

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
        {isLoggedIn ? renderSignedInContent() : <Auth />}
      </div>
    </div>
  );
};

export default App;
