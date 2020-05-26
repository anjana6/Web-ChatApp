import React from 'react'
import io from 'socket.io-client';

import ChatList from './ChatList';
import ChatView from './ChatView';
import { Grid } from '@material-ui/core';

const socket = io.connect('http://localhost:4000');

socket.on('message',message => {
    console.log(message);
})

const Dashboard = () => {
    return (
        <div>
            <Grid container>
                <Grid item xs={4}>
                <ChatList/>
                </Grid>
                <Grid item xs={8}>
                <ChatView/>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Dashboard
