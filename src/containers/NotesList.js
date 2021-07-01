import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../store/actions';

const NotesList = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  console.log('notes test', notes);

  return (
    <div>Notes List</div>
  );
};

export default NotesList;
