import { useSelector } from 'react-redux';
import { Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Note from '../components/Note';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRight: `1px solid ${theme.palette.primary.main}`,
    height: '100%',
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  const { notes, isCreatingNote } = useSelector((state) => state.notes);
  // const layout = useSelector((state) => state.layout);
  const classes = useStyles();
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
