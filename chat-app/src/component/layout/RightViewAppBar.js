import React from 'react';
import {AppBar,Toolbar,Typography } from '@material-ui/core';

const RightViewAppBar = ({name,type}) => {
    return (
        <div>
          <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" >
                        {name}
                    </Typography> <br/>
                    {type}
                </Toolbar>
            </AppBar>  
        </div>
    )
}

export default RightViewAppBar;
