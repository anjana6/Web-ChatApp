import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles, Typography,Grid,Paper,TextField,Button,Container} from '@material-ui/core';
import {Alert} from '@material-ui/lab'
import {signUp} from '../../action/authAction';
import {useSelector,useDispatch} from 'react-redux';
import MainAppbar from '../layout/MainAppbar';

const useStyles = makeStyles((theme)=>({
    paper: {
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(45),
          padding:theme.spacing(4),
        },
        textAlign:'center',
        marginTop:40

      },
    alert:{
        marginTop:10
    },
    showError:{
        color:'red',
        backgroundColor:'pink'
    }
}))

const RegisterForm = () =>{
    const classes = useStyles();
    const history = useHistory();
    const [state,setState] = useState({username:'',email:'',password:''});
    const error = useSelector(state => state.auth.error);
    const dispatch = useDispatch();

    const onChange = (e) => {
        setState({...state,[e.target.name]:e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp(state,history));
    }
    
    return (
        <div>
            <MainAppbar/>
            <Container>
                {error && error.msg && <Alert className={classes.alert} severity="error">{error.msg}</Alert>}
   
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
                                autoComplete='off'
                                />
                            {error && error.username && <Typography variant="subtitle2" className={classes.showError}>{error.username}</Typography>}
                            <TextField 
                                name="email" 
                                label="Email" 
                                variant="outlined" 
                                margin='dense' 
                                fullWidth
                                onChange={onChange}
                                autoComplete='off'
                                />
                            {error && error.email && <Typography variant="subtitle2" className={classes.showError}>{error.email}</Typography>}
                            <TextField 
                                name="password" 
                                type="password"
                                label="password" 
                                variant="outlined" 
                                margin='dense' 
                                fullWidth
                                onChange={onChange}
                                />
                            {error && error.password && <Typography variant="subtitle2" className={classes.showError}>{error.password}</Typography>}
                            <br/>
                            <Button variant="outlined" color="primary" fullWidth onClick={onSubmit}>
                                SignUp
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Container>
            
        </div>
    )
}

export default RegisterForm;
