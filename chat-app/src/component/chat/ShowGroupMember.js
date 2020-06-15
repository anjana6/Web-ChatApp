import React from 'react';
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';
import {Send} from '@material-ui/icons';
import {createNewGroup} from '../../action/chatAction';

const ShowGroupMember = ({members,createNewGroup,socket}) => {
    const createGroup = () => {
        // createNewGroup(members);
        socket.emit('GROUP_CHAT', members);
    }

    return (
        <div>
           {members.length>0 &&  
           <div >
                {members.map((mem,index) =>(
                    <div key={index}>
                        {mem.username}
                    </div>
                ) )}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    endIcon={<Send/>}
                    onClick={createGroup}
                >
                    Create Group
                </Button>
            </div>}  
        </div>
    )
}

export default connect(null,{createNewGroup})(ShowGroupMember);
