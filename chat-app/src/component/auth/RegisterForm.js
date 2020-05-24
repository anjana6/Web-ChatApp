import React, { useState } from 'react';
import {makeStyles, Typography,Grid,Paper,TextField,Button} from '@material-ui/core';

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

const RegisterForm = () =>{
    const classes = useStyles();
    const [state,setState] = useState({username:'',email:'',password:''});

    const onChange = (e) => {
        setState({...state,[e.target.name]:e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(state);
    }

    return (
        <div>
           <Grid container justify='center'>
               <Paper className={classes.paper}>
                   <Typography variant="h4">SignUp</Typography>
                   <form>
                   <TextField 
                    name="username" 
                    label="username" 
                    variant="outlined" 
                    margin='dense' 
                    fullWidth
                    onChange={onChange}
                    />
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
                    SignUp
                    </Button>
                   </form>
               </Paper>
           </Grid>
        </div>
    )
}

export default RegisterForm;
