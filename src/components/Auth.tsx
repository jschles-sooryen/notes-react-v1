/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
// import { useForm, Controller } from 'react-hook-form';
import { Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import TextInput from './TextInput';
import GoogleLogin from 'react-google-login';

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

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
const domain = process.env.REACT_APP_API_SERVER as string;
console.log('id', googleClientId);
console.log('domain', domain);

const Auth: FC = () => {
  const classes = useStyles();
  // const [authType, setAuthType] = useState('signin');
  // const { control, handleSubmit } = useForm();

  // const headerText = authType === 'signin' ? 'Welcome! Please Sign In:' : 'Register a New Account:';

  const responseGoogle = (response: any) => {
    console.log('Google Response', response);
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: 'application/json' },
    );

    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default',
    } as any;

    console.log('tokenBlob', tokenBlob);
    console.log('options', options);

    fetch(`${domain}/auth`, options)
      .then((r) => {
        const token = r.headers.get('x-auth-token');
        r.json().then((user) => {
          console.log('token', token);
          console.log('user', user);
        });
      })
      .catch((e) => console.error('Error signing into Google: ', e));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.authContainer}>
        <div className={classes.contentContainer}>
          <div>
            <div className={classes.buttonContainer}>
              <GoogleLogin
                clientId={googleClientId}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              />
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Auth;
