import React, { useState } from 'react';
import {connect} from 'react-redux';
import {makeStyles, Typography,Grid,Paper,TextField,Button} from '@material-ui/core';
import {signIn} from '../../action/authAction';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    paper: {
        // display: 'flex',
        // flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(45),
          padding:theme.spacing(4),
        //   height: theme.spacing(16),
        
        },
        textAlign:'center'
      },
}))

const LoginForm = ({signIn}) =>{
    const classes = useStyles();
    const history = useHistory();
    const [state,setState] = useState({email:'',password:''});

    const onChange = (e) => {
        setState({...state,[e.target.name]:e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(state);
        signIn(state,history)
    }

    return (
        <div>
           <Grid container justify='center'>
               <Paper className={classes.paper}>
                   <Typography variant="h4">SignIn</Typography>
                   <form>
                   <TextField 
                    name="email" 
                    label="Email" 
                    variant="outlined" 
                    margin='dense' 
                    fullWidth
                    onChange={onChange}
                    />
                   <TextField 
                    name="password" 
                    label="password" 
                    variant="outlined" 
                    margin='dense' 
                    fullWidth
                    onChange={onChange}
                    />
                   <br/>
                   <Button variant="outlined" color="primary" fullWidth onClick={onSubmit}>
                    SignIn
                    </Button>
                   </form>
               </Paper>
           </Grid>
        </div>
    )
}

export default connect(null,{signIn})(LoginForm);
