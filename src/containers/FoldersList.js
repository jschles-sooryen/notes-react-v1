import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
      {folders.map((folder) => <Folder id={folder.id} name={folder.name} />)}
    </div>
  );
};

export default withStyles(styles)(FoldersList);
