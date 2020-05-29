import React, { useState } from 'react';
import {Box,TextField, makeStyles, IconButton,Grid} from '@material-ui/core';
import {Send, FullscreenExit, SentimentSatisfied} from '@material-ui/icons';

const useStyles = makeStyles((theme) =>({
    root:{
        border:'1px solid black',
        display:'flex',
        float:'left',
        width:'98%',
        margin:theme.spacing(0.5),
        padding:'0px 50px',
        backgroundColor:'#CED1CD',
        borderRadius:theme.spacing(5),
       
    },
   
}))

const ChatTextBox = () => {
    const classes = useStyles();
    const [state,setState] = useState('');

    const onSubmit = (e) =>{
        e.preventDefault()
        console.log(state);
    }

    return (
        <div>
            <Grid className={classes.root}>
            <TextField  
                    placeholder="Type a message" 
                    fullWidth 
                    onChange={(e) =>{setState(e.target.value)}}
                    
                    />
            <IconButton onClick={onSubmit}><Send/></IconButton>
        </Grid>
        </div>
    )
}

export default ChatTextBox
