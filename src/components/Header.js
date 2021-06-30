import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  root: {
    margin: '0 auto',
  },
  flexContainer: {
    display: 'flex',
    maxWidth: 1440,
    justifyContent: 'space-between',
  },
});

const Header = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.flexContainer}>

      </div>
    </div>
  );
};

export default withStyles(styles)(Header);