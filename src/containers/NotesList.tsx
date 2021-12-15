import { useEffect, FC, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Note from '../components/Note';
import { fetchNotesInit } from '../store/reducers/notesReducer';
import { selectNotes } from '../store/selectors/notes';
import { selectSelectedFolder } from '../store/selectors/folders';

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
  const { notes, isCreatingNote } = useSelector(selectNotes);
  const selectedFolder = useSelector(selectSelectedFolder);
  const classes = useStyles();

  useEffect(() => {
    if (typeof selectedFolder === 'string') {
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
        <Fragment key={note._id}>
          <Note
            id={note._id}
            name={note.name}
            description={note.description}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default NotesList;
