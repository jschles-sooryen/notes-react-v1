import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { formatDate } from '../util/helpers';
import { setSelectedNote } from '../store/reducers/notesReducer';
import { RootState } from '../store/types';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
  },
  info: {
    padding: theme.spacing(2),
    fontSize: 12,
    minHeight: 66,
  },
  selected: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
  },
  infoBottom: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}));

interface NoteProps {
  name: string;
  description?: string;
  id?: string;
  isPlaceholder?: boolean;
  updatedAt?: Date;
}

const Note: FC<NoteProps> = ({
  name, description, id, isPlaceholder, updatedAt,
}: NoteProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedNote = useSelector((state: RootState) => state.notes.selected);

  const date = formatDate(updatedAt);

  const descriptionText = description || 'No additional text';

  const handleOnClick = () => {
    if (!isPlaceholder && id) {
      dispatch(setSelectedNote(id));
    }
  };

  return (
    <div
      data-testid={`note-${id}`}
      className={clsx(classes.root, { [classes.selected]: id === selectedNote })}
      onClick={handleOnClick}
    >
      <div className={classes.info}>
        <div>{name}</div>
        <div>
          {date}
          &nbsp;
          <span>{descriptionText}</span>
        </div>
      </div>
      <Divider variant="middle" />
    </div>
  );
};

export default Note;
