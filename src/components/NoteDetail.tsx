/* eslint-disable react/jsx-no-duplicate-props */
import { useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { toggleCreateNote, createNoteInit, updateNoteInit } from '../store/reducers/notesReducer';
import { formatDate } from '../util/helpers';
import { Note } from '../store/types';
import { selectNotes } from '../store/selectors/notes';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
    flex: 1,
  },
  textarea: {
    width: '100%',
    resize: 'both',
  },
  outline: {
    border: 'none',
  },
  lastUpdated: {
    textAlign: 'center',
    margin: 0,
    fontSize: 14,
  },
}));

interface NoteDetailProps {
  isNew: boolean;
}

const NoteDetail: FC<NoteDetailProps> = ({ isNew }: NoteDetailProps) => {
  const dispatch = useDispatch();
  const { notes, selected } = useSelector(selectNotes);
  const selectedNote = notes.find((note: Note) => note._id === selected);
  const description = selectedNote?.description;
  const updatedAt = selectedNote?.updated_at;
  const classes = useStyles();
  const { control, getValues, reset } = useForm({
    defaultValues: {
      description: isNew ? '' : description,
    },
  });

  useEffect(() => {
    if (selectedNote) {
      reset({ description });
    }
  }, [selectedNote, description]);

  const handleOnBlur = () => {
    const formValues = getValues();
    const enteredDescription = formValues.description! as string;
    const name = enteredDescription.split('\n')[0];
    const noteInfo = { name, description: enteredDescription };

    if (isNew) {
      if (!enteredDescription.trim()) {
        dispatch(toggleCreateNote());
      } else {
        dispatch(createNoteInit(noteInfo));
      }
    } else {
      dispatch(updateNoteInit(noteInfo));
    }
  };

  return (
    <div className={classes.root}>
      <p className={classes.lastUpdated}>
        {formatDate(updatedAt, true)}
      </p>
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <TextField
            {...field}
            inputRef={field.ref}
            autoFocus={isNew}
            multiline
            onBlur={handleOnBlur}
            variant="outlined"
            classes={{ root: classes.textarea }}
            InputProps={{
              classes: {
                root: classes.textarea,
                notchedOutline: classes.outline,
              },
            }}
            inputProps={{
              'data-testid': 'n-form',
            }}
          />
        )}
      />
    </div>
  );
};

export default NoteDetail;
