import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { func, bool } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from '@material-ui/core';
import {
  Reorder, Apps, VerticalSplit, AttachFile, Delete, Create,
} from '@material-ui/icons';
import { setLayout, toggleCreateNote } from '../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  flexContainer: {
    display: 'flex',
    maxWidth: 1440,
    justifyContent: 'space-between',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    '& h1': {
      fontSize: 16,
      marginRight: theme.spacing(2),
    },
  },
  buttonGroupRoot: {
    marginRight: theme.spacing(2),
  },
  button: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: '#fff',
    },
  },
  selectedButton: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
  },
  innerFlexLeft: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Header = ({ onToggleFolders, showFolders }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const layout = useSelector((state) => state.layout);
  const isCreatingNote = useSelector((state) => state.notes.isCreatingNote);

  const handleLayoutClick = (e, type) => {
    dispatch(setLayout(type));
  };

  const handleCreateNoteClick = () => {
    if (!isCreatingNote) {
      dispatch(toggleCreateNote());
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.flexContainer}>
        <div className={classes.innerFlexLeft}>
          <h1>React Notes App V1</h1>
          <ButtonGroup
            classes={{
              root: classes.buttonGroupRoot,
            }}
          >
            <Button
              onClick={(e) => handleLayoutClick(e, 'column')}
              classes={{
                root: clsx(classes.button, { [classes.selectedButton]: layout === 'column' }),
              }}
            >
              <Reorder />
            </Button>

            <Button
              onClick={(e) => handleLayoutClick(e, 'grid')}
              classes={{
                root: clsx(classes.button, { [classes.selectedButton]: layout === 'grid' }),
              }}
            >
              <Apps />
            </Button>
          </ButtonGroup>

          <ButtonGroup
            classes={{
              root: classes.buttonGroupRoot,
            }}
          >
            <Button
              onClick={onToggleFolders}
              classes={{
                root: clsx(classes.button, { [classes.selectedButton]: !showFolders }),
              }}
            >
              <VerticalSplit />
            </Button>
          </ButtonGroup>

          {/* TODO: Show all attachments in folder */}
          <ButtonGroup
            classes={{
              root: classes.buttonGroupRoot,
            }}
          >
            <Button
              onClick={() => {}}
              classes={{
                root: clsx(classes.button, { [classes.selectedButton]: false }),
              }}
            >
              <AttachFile />
            </Button>
          </ButtonGroup>

          {/* TODO: Delete selected folder or selected note */}
          <ButtonGroup
            classes={{
              root: classes.buttonGroupRoot,
            }}
          >
            <Button
              onClick={() => {}}
              classes={{
                root: classes.button,
              }}
            >
              <Delete />
            </Button>
          </ButtonGroup>

          <ButtonGroup
            classes={{
              root: classes.buttonGroupRoot,
            }}
          >
            <Button
              onClick={handleCreateNoteClick}
              classes={{
                root: clsx(classes.button, { [classes.selectedButton]: isCreatingNote }),
              }}
            >
              <Create />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  onToggleFolders: func.isRequired,
  showFolders: bool.isRequired,
};

export default Header;
