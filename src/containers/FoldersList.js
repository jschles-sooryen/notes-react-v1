import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Folder from '../components/Folder';
import NewFolder from '../components/NewFolder';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchFolders } from '../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRight: `1px solid ${theme.palette.primary.main}`,
    height: '100%',
    width: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  new: {
    padding: theme.spacing(2),
    cursor: 'pointer',
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
}));

const FoldersList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { folders, loading } = useSelector((state) => state);
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchFolders());
  }, []);

  const handleOnCreate = (data) => {

  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={classes.root}>
      <div>
        {folders.map((folder) => <Folder key={folder.id} id={folder.id} name={folder.name} />)}
        {isNewFolderOpen && (
          <NewFolder onCreate={handleOnCreate} onCancel={() => setIsNewFolderOpen(false)} />
        )}
      </div>
      <div className={classes.new}>
        <Button
          disableRipple
          classes={{
            root: classes.button,
            text: classes.text,
          }}
          startIcon={<AddCircle />}
          onClick={() => setIsNewFolderOpen(true)}
        >
          New Folder
        </Button>
      </div>
    </div>
  );
};

export default FoldersList;
