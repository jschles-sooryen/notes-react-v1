import { useForm, Controller } from 'react-hook-form';
import { func } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextInput from './TextInput';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const NewFolder = ({ onCreate, onCancel }) => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: 'New Folder',
    },
  });

  const onSubmit = (data) => {
    if (data.name.trim()) {
      // Make API call
      onCreate(data);
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

NewFolder.propTypes = {
  onCreate: func.isRequired,
  onCancel: func.isRequired,
};

export default NewFolder;
