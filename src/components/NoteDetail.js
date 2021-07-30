import { useSelector, useDispatch } from 'react-redux';
import { bool } from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { toggleCreateNote, createNoteInit } from '../store/actions';
import { formatDate } from '../util/helpers';

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

const NoteDetail = ({ isNew }) => {
  const dispatch = useDispatch();
  const { notes, selected } = useSelector((state) => state.notes);
  const selectedNote = notes.find((note) => note.id === selected);
  const description = selectedNote?.description;
  const updatedAt = selectedNote?.updated_at;
  const classes = useStyles();
  const { control, getValues } = useForm({
    defaultValues: {
      description: isNew ? '' : description,
    },
  });

  const handleOnBlur = () => {
    const formValues = getValues();

    if (isNew) {
      if (!formValues.description.trim()) {
        dispatch(toggleCreateNote());
      } else {
        const name = formValues.description.split('\n')[0];
        dispatch(createNoteInit({ name, description: formValues.description }));
      }
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

NoteDetail.propTypes = {
  isNew: bool,
};

export default NoteDetail;
