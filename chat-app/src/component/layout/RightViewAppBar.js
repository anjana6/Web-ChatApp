import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

const RightViewAppBar = ({ name, type, showMenuButton, onMenuClick }) => {
    return (
        <div>
          <AppBar position="static">
                <Toolbar>
                    {showMenuButton && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={onMenuClick}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" style={{ flex: 1 }}>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Typography>
                    {type}
                </Toolbar>
            </AppBar>  
        </div>
    )
}

export default RightViewAppBar;
