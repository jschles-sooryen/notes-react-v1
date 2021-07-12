import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MoreHorizRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    padding: theme.spacing(2),
    minHeight: 66,
    '& > button': {
      display: 'none',
    },
    '&:hover > button': {
      display: 'block',
    },
  },
  more: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '100%',
  },
}));

const Folder = (props) => {
  const classes = useStyles();
  const { name } = props;

  return (
    <div className={classes.root}>
      <div>{name}</div>
      <IconButton size="small" aria-label="More">
        <MoreHorizRounded />
      </IconButton>
    </div>
  );
};

export default Folder;
