import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Note from '../components/Note';
import { fetchNotesInit } from '../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRight: `1px solid ${theme.palette.primary.main}`,
    height: '100%',
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
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

const NotesList = () => {
  const dispatch = useDispatch();
  const { notes, isCreatingNote } = useSelector((state) => state.notes);
  const selectedFolder = useSelector((state) => state.folders.selected);
  // const layout = useSelector((state) => state.layout);
  const classes = useStyles();

  useEffect(() => {
    if (typeof selectedFolder === 'number') {
      dispatch(fetchNotesInit(selectedFolder));
    }
  }, [selectedFolder]);

  return (
    <div className={classes.root}>
      <Collapse in={isCreatingNote}>
        <Note
          name="New Folder"
          isPlaceholder
        />
      </Collapse>
      {/* TODO: Sort by most recently created/updated */}
      {notes.map((note) => (
        <Note
          id={note.id}
          name={note.name}
          description={note.description}
        />
      ))}
    </div>
  );
};

export default NotesList;
