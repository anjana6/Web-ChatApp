import React,{useState} from 'react';
import {connect} from 'react-redux';
import {Box,TextField, makeStyles, IconButton,Grid} from '@material-ui/core';
import {Send} from '@material-ui/icons';
import {sendMessage} from '../../action/chatAction';

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

const ChatTextBox = ({sendMessage,chatId,friendId,sender}) => {
    const classes = useStyles();

    const [state, setState] = useState({msg:''});
    
    const onSubmit = (e) =>{
        e.preventDefault()
        // console.log(state);
        sendMessage(sender,friendId,state.msg);
        setState({...state,msg:''});
    }
    return (
        <div>
            <Grid container >
                <TextField  
                    placeholder="Type a message" 
                    fullWidth className={classes.textfiled} 
                    onChange={(e) =>{setState({...state,msg:e.target.value})}}
                    value={state.msg}
                    />
                <IconButton onClick={onSubmit}><Send/></IconButton>
            </Grid>
            
        </div>
    )
}

export default connect(null,{sendMessage})(ChatTextBox);
