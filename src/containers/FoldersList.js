import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchFolders } from '../store/actions';

const FoldersList = () => {
  const dispatch = useDispatch();
  const { folders, loading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchFolders());
  }, []);

  console.log('folders', folders);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>Folders List</div>
  );
};

export default FoldersList;
