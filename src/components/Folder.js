import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MoreHorizRounded } from '@material-ui/icons';
import { setSelectedFolder } from '../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    '& > div > button': {
      display: 'none',
    },
    '&:hover > div > button': {
      display: 'block',
    },
  },
  info: {
    padding: theme.spacing(2),
    minHeight: 66,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  more: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '100%',
  },
  selected: {
    color: '#fff',
    backgroundColor: 'navy',
  },
  selectedMore: {
    color: 'navy',
    backgroundColor: '#fff',
  },
}));

const Folder = ({ name, id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedFolder = useSelector((state) => state.folders.selected);

  const handleOnClick = () => {
    dispatch(setSelectedFolder(id));
  };

  return (
    <div
      className={clsx(classes.root, { [classes.selected]: id === selectedFolder })}
      onClick={handleOnClick}
    >
      <div className={classes.info}>
        <div>{name}</div>
        <IconButton size="small" aria-label="More">
          <MoreHorizRounded
            classes={{
              root: clsx({ [classes.selected]: id === selectedFolder }),
            }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default Folder;
