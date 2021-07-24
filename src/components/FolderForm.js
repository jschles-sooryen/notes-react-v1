import { useForm, Controller } from 'react-hook-form';
import { func, string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextInput from './TextInput';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const FolderForm = ({
  name, onCreate, onUpdate, onCancel,
}) => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: name || 'New Folder',
    },
  });

  const onSubmit = (data) => {
    if (data.name.trim()) {
      // Make API call
      if (name) {
        onUpdate(data);
      } else {
        onCreate(data);
      }
    } else {
      // unmount component
      onCancel();
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(onSubmit)();
    }
  };

  const handleBlur = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className={classes.root}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput
            {...field}
            autoFocus
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        )}
      />
    </div>
  );
};

FolderForm.propTypes = {
  name: string,
  onCreate: func,
  onUpdate: func,
  onCancel: func.isRequired,
};

export default FolderForm;