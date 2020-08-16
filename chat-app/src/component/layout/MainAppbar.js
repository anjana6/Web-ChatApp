import React from 'react';
import { makeStyles,AppBar,Toolbar,Typography,Button} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MainAppbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            FUN CHAT
          </Typography>
          <Button color="inherit" component={Link} to="/" >Login</Button>
          <Button color="inherit" component={Link} to="/register">Register</Button>
         
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MainAppbar;