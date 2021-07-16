import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 16,
  },
}));

const TextInput = (props) => {
  const classes = useStyles();

  return (
    <TextField
      {...props}
      InputProps={{
        classes: { root: classes.root },
      }}
    />
  );
};

export default TextInput;
