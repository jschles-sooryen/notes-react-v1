// import { useSelector } from 'react-redux';
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
  // const notes = useSelector((state) => state.notes.notes);
  // const layout = useSelector((state) => state.layout);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* {notes.map((note) => <div>{note.name}</div>)} */}
      <Note
        name="New Note"
        description="This is a test note description"
        id={1}
      />
    </div>
  );
};

export default NotesList;
