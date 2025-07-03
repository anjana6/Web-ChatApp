import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Grid, useMediaQuery, useTheme } from '@material-ui/core';

import { fetchChatList } from '../../action/chatAction';
import LeftChatView from './LeftChatView';
import RightChatView from './RightChatView';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    background: theme.palette.background.default,
    overflow: 'hidden',
  },
  leftView: {
    [theme.breakpoints.up('md')]: {
      width: 350,
      display: 'block',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    height: '100vh',
  },
  rightView: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    height: '100vh',
  },
}))

const Dashboard = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatList());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Grid container style={{ height: '100vh' }}>
        {!isMobile && (
          <Grid item className={classes.leftView}>
            <LeftChatView />
          </Grid>
        )}
        <Grid item xs={12} md className={classes.rightView}>
          <RightChatView />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

