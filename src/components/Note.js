// import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import {
  string, number, bool, instanceOf,
} from 'prop-types';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { formatDate } from '../util/helpers';
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

  const date = formatDate(updatedAt);

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
