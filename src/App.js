import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header';
import FoldersList from './containers/FoldersList';
import NotesList from './containers/NotesList';
import NoteDetail from './components/NoteDetail';

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

const App = () => {
  const classes = useStyles();
  const [showFolders, setShowFolders] = useState(true);
  const { isCreatingNote, selected } = useSelector((state) => state.notes);
  const showNoteDetail = isCreatingNote || Boolean(selected);

  return (
    <div className={classes.root}>
      <Header
        onToggleFolders={() => setShowFolders(!showFolders)}
        showFolders={showFolders}
      />
      <div className={classes.contentRoot}>
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
        {showNoteDetail && (
          <NoteDetail isNew={isCreatingNote} />
        )}
      </div>
    </div>
  );
};

export default App;
