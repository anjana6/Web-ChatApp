import React from 'react';
import {Typography, makeStyles} from '@material-ui/core';
import wellcome from '../../images/wellcome.png'

const useStyles = makeStyles(() => ({
    defaultBox:{
        textAlign:"center",
        marginTop:"20%"
    },
    defaultText:{
        fontFamily:"Impact"
    }
}))

const DefaultView = () => {
    const classes = useStyles();
    return (
        <div className={classes.defaultBox}>
            <img src={wellcome} alt="wellcome"/>
           <Typography variant="h3" gutterBottom className={classes.defaultText}>
                FunChat
            </Typography>
        </div>
    )
}

export default DefaultView
