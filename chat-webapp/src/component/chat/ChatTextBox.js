import React, { useState } from 'react';
import {connect} from 'react-redux';
import {TextField, makeStyles, IconButton,Grid} from '@material-ui/core';
import {Send} from '@material-ui/icons';
import { sendMessage } from '../../action/chatAction';

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

const ChatTextBox = ({paneluserId,sendMessage,user}) => {
    const classes = useStyles();
    const [state,setState] = useState({msg:''});
    

    const onSubmit = (e) =>{
        e.preventDefault()
        sendMessage(paneluserId,state.msg,user._id);
        setState({msg:''});
    }
    // console.log("pa",paneluserId);

    return (
        <div>
            <Grid className={classes.root}>
            <TextField  
                    placeholder="Type a message" 
                    fullWidth 
                    onChange={(e) =>{setState({...state,msg:e.target.value})}}
                    value={state.msg}
                    
                    />
            <IconButton onClick={onSubmit}><Send/></IconButton>
        </Grid>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.chat.user
})

export default connect(mapStateToProps,{sendMessage})(ChatTextBox);
