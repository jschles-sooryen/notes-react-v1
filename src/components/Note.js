// import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import {
  string, number, bool, instanceOf,
} from 'prop-types';
import { Divider } from '@material-ui/core';
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

const Note = ({
  name, description, id, isPlaceholder, updatedAt,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedNote = useSelector((state) => state.notes.selected);

  let date = updatedAt ? new Date(updatedAt) : new Date();
  let dateFormat = 'MM/dd/yyyy';

  if (date.getDate() === new Date().getDate()) {
    dateFormat = 'h:mm a';
  }

  if (date.getDate() === new Date().getDate() - 1) {
    date = 'Yesterday';
  } else {
    date = format(date, dateFormat);
  }

  const descriptionText = description || 'No additional text';

  const handleOnClick = () => {
    if (!isPlaceholder) {
      dispatch(setSelectedNote(id));
    }
  };

  return (
    <div
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

Note.propTypes = {
  name: string.isRequired,
  description: string,
  id: number,
  isPlaceholder: bool,
  updatedAt: instanceOf(Date),
};

export default Note;
