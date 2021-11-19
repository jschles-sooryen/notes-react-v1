export default {
  googleAuth: {
    clientID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.REACT_APP_API_SERVER}/auth/callback`,
  },
  jwtSecret: process.env.JWT_SECRET,
};
