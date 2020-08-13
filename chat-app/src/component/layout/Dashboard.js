import React, { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';

import { fetchChatList} from '../../action/chatAction';
import LeftChatView from './LeftChatView';
import RightChatView from './RightChatView';


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        display: 'flex',
        float: "left"
    },
    leftView: {
        width: 350,
    },
    rightView:{
       backgroundColor:"yellow",
       width:"100%",
       height:"100vh"
    }

   
}))

const Dashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchChatList())
    }, [dispatch]);
   
    return (
        <div className={classes.root}>
            <div className={classes.leftView}>
                <LeftChatView/>
            </div>
            <div className={classes.rightView}>
                <RightChatView/>
            </div>
         </div>    
    )
}

export default (Dashboard);

