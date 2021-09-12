import { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Folder from '../components/Folder';
import FolderForm from '../components/FolderForm';
// import LoadingIndicator from '../components/LoadingIndicator';
import { fetchFolders, createFolder, setSelectedFolder } from '../store/actions';
import { RootState } from '../store/types';

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

const FoldersList: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { folders, loading } = useSelector((state: RootState) => state);
  const foldersList = folders.folders;
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchFolders());
  }, []);

  const handleOnCreate = (data: { name: string }) => {
    dispatch(createFolder(data));
    setIsNewFolderOpen(false);
  };

  const handleNewFolderClick = () => {
    setIsNewFolderOpen(true);
    dispatch(setSelectedFolder(null));
  };

  if (loading) {
    // return <LoadingIndicator />;
  }

  return (
    <div className={classes.root}>
      <div>
        {foldersList.map((folder) => <Folder key={folder.id} id={folder.id} name={folder.name} />)}
        {isNewFolderOpen && (
          <FolderForm onCreate={handleOnCreate} onCancel={() => setIsNewFolderOpen(false)} />
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
          onClick={handleNewFolderClick}
        >
          New Folder
        </Button>
      </div>
    </div>
  );
};

export default FoldersList;
