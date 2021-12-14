import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StandardTextFieldProps, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 16,
    color: '#fff',
  },
  underline: {
    '&:before, &:after': {
      borderBottom: '1px solid #fff !important',
    },
  },
}));

const TextInput: FC<StandardTextFieldProps | any> = (props: StandardTextFieldProps | any) => {
  const classes = useStyles();

  return (
    <TextField
      {...props}
      InputProps={{
        classes: { root: classes.root, underline: classes.underline, focused: classes.underline },
      }}
    />
  );
};

export default TextInput;
