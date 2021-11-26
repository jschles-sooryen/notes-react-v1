/* eslint-disable quote-props */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';
import { signInInit } from '../store/reducers/authReducer';

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
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  switchAuth: {
    display: 'block',
    textAlign: 'center',
  },
}));

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

const Auth: FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleGoogleResponse = (response: any) => {
    console.log('resp', response);
    if (!response.error) {
      const tokenBlob = new Blob(
        [JSON.stringify({ id_token: response.tokenId }, null, 2)],
        { type: 'application/json' },
      );
      dispatch(signInInit(tokenBlob));
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.authContainer}>
        <div className={classes.contentContainer}>
          <div>
            <div className={classes.buttonContainer}>
              <h3>Welcome! Please Sign In:</h3>
              <GoogleLogin
                clientId={googleClientId}
                onSuccess={handleGoogleResponse}
                onFailure={handleGoogleResponse}
                cookiePolicy="single_host_origin"
                prompt="consent"
              />
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Auth;
