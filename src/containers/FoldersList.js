import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFolders } from '../store/actions';

const FoldersList = () => {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.folders);

  useEffect(() => {
    dispatch(fetchFolders());
  }, []);

  return (
    <div>Folders List</div>
  );
};

export default FoldersList;
