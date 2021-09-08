import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { FC } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { toggleCreateNote, createNoteInit, updateNoteInit } from '../store/actions';
import { formatDate } from '../util/helpers';
import { RootState, Note } from '../store/types';

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
  const { notes, selected } = useSelector((state: RootState) => state.notes);
  const selectedNote = notes.find((note: Note) => note.id === selected);
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
    const description = formValues.description as string;
    const name = description.split('\n')[0];
    const noteInfo = { name, description };

    if (isNew) {
      if (!description.trim()) {
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
          />
        )}
      />
    </div>
  );
};

export default NoteDetail;
