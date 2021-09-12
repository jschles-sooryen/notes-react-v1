import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import TextInput from './TextInput';

type FolderData = {
  name: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
}));
interface FolderFormProps {
  name?: string;
  onCreate?(data: FolderData): void;
  onUpdate?(data: FolderData): void;
  onCancel(): void;
}

const FolderForm: FC<FolderFormProps> = ({
  name, onCreate, onUpdate, onCancel,
}: FolderFormProps) => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: name || 'New Folder',
    },
  });

  const onSubmit = (data: { name: string }) => {
    if (data.name.trim()) {
      // Make API call
      if (name && onUpdate) {
        onUpdate(data);
      } else if (onCreate) {
        onCreate(data);
      }
    } else {
      // unmount component
      onCancel();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      handleSubmit(onSubmit)();
    }
  };

  const handleBlur = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className={classes.root} role="form">
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

export default FolderForm;
