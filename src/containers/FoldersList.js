import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import withStyles from '@material-ui/core/styles/withStyles';
import Folder from '../components/Folder';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchFolders } from '../store/actions';

const styles = (theme) => ({
  root: {
    borderRight: `1px solid ${theme.palette.primary.main}`,
    height: '100%',
    width: 200,
  },
  new: {
    padding: theme.spacing(2),
  },
  button: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  text: {
    padding: 0,
    width: '100%',
    justifyContent: 'start',
    textTransform: 'none',
  },
});

const FoldersList = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const { folders, loading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchFolders());
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={classes.root}>
      <div>
        {folders.map((folder) => <Folder id={folder.id} name={folder.name} />)}
      </div>
      <div className={classes.new}>
        <Button
          disableRipple
          classes={{
            root: classes.button,
            text: classes.text,
          }}
          startIcon={<AddCircle />}
        >
          New Folder
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(FoldersList);
