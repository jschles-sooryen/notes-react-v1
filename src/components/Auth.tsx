/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
// import { useForm, Controller } from 'react-hook-form';
import { Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import TextInput from './TextInput';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authContainer: {
    border: '1px solid black',
    padding: theme.spacing(2),
    width: '400px',
  },
  contentContainer: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
  },
  inputContainer: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  input: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  header: {
    marginTop: 0,
    textAlign: 'center',
  },
  buttonContainer: {
    margin: '0 auto',
    width: '80%',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  switchAuth: {
    display: 'block',
    textAlign: 'center',
  },
}));

const Auth: FC = () => {
  const classes = useStyles();
  // const [authType, setAuthType] = useState('signin');
  // const { control, handleSubmit } = useForm();

  // const headerText = authType === 'signin' ? 'Welcome! Please Sign In:' : 'Register a New Account:';

  const openModal = () => {
    fetch(`${process.env.REACT_APP_API_SERVER}/auth`)
      .then((resp) => console.log('res', resp))
      .catch((e) => console.error(e));
  };

  return (
    <div className={classes.root}>
      <div id="netlifyModal" />

      <Paper className={classes.authContainer}>
        <div className={classes.contentContainer}>
          <div>
            <div className={classes.buttonContainer}>
              <Button fullWidth variant="contained" onClick={openModal}>Sign In With Google</Button>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Auth;
