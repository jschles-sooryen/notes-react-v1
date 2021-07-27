import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
}));

const NoteDetail = ({ isNew }) => {
  const dispatch = useDispatch();
  const { notes, selected } = useSelector((state) => state.notes);
  const description = notes[selected]?.description;
  const updatedAt = notes[selected]?.updated_at;
  const classes = useStyles();
  const { control } = useForm({
    defaultValues: {
      description: isNew ? '' : description,
    },
  });

  return (
    <div className={classes.root}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField
            {...field}
            autoFocus
            multiline
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
