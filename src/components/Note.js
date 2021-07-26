// import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { string, number } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import { setSelectedNote } from '../store/actions';

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

const Note = ({ name, description, id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedNote = useSelector((state) => state.notes.selected);
  const lastUpdated = format(new Date(), 'MM/dd/yyyy');
  const descriptionText = description || 'No additional text';

  const handleOnClick = () => {
    dispatch(setSelectedNote(id));
  };

  return (
    <div
      className={clsx(classes.root, { [classes.selected]: id === selectedNote })}
      onClick={handleOnClick}
    >
      <div className={classes.info}>
        <div>{name}</div>
        <div>
          {lastUpdated}
          &nbsp;
          <span>{descriptionText}</span>
        </div>
      </div>
    </div>
  );
};

Note.propTypes = {
  name: string.isRequired,
  description: string,
  id: number.isRequired,
};

export default Note;
