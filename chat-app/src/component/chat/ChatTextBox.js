import React,{useState} from 'react';
import {Box,TextField, makeStyles, IconButton,Grid} from '@material-ui/core';
import {Send} from '@material-ui/icons';

const useStyles = makeStyles((theme) =>({
    textboxcontainer:{
        backgroundColor:'grey',
        borderRadius:'30px',
        textAlign:"center"
        
    },
    textfiled:{
        width:"90%"
    }
}))

const ChatTextBox = () => {
    const classes = useStyles();

    const [state, setState] = useState({msg:''});
    
    const onSubmit = (e) =>{
        e.preventDefault()
        console.log(state);

    }
    return (
        <div>
            <Grid container >
                <TextField  placeholder="Type a message" fullWidth className={classes.textfiled} onChange={(e) =>{setState({...state,msg:e.target.value})}}/>
                <IconButton onClick={onSubmit}><Send/></IconButton>
            </Grid>
            
        </div>
    )
}

export default ChatTextBox;
