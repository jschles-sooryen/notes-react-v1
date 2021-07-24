import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

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
  const notes = useSelector((state) => state.notes.notes);
  // const layout = useSelector((state) => state.layout);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {notes.map((note) => <div>{note.name}</div>)}
    </div>
  );
};

export default NotesList;
