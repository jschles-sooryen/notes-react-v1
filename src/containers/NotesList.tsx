import { useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Note from '../components/Note';
import { fetchNotesInit } from '../store/reducers/notesReducer';
import { RootState } from '../store/types';

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

const NotesList: FC = () => {
  const dispatch = useDispatch();
  const { notes, isCreatingNote } = useSelector((state: RootState) => state.notes);
  const selectedFolder = useSelector((state: RootState) => state.folders.selected);
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
          key={note.id}
          id={note.id}
          name={note.name}
          description={note.description}
        />
      ))}
    </div>
  );
};

export default NotesList;
