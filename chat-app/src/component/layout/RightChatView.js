import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { makeStyles, IconButton, Drawer, useMediaQuery, useTheme, Popover, InputBase } from '@material-ui/core';
import { Send, InsertEmoticon } from '@material-ui/icons';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import MessageView from '../chats/MessageView';
import DefaultView from './DefaultView';
import RightViewAppBar from './RightViewAppBar';
import LeftChatView from './LeftChatView';
import { setSocket, addChat, addMessage } from '../../action/chatAction';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
  },
  msgView: {
    height: '80vh',
  },
  textBox: {
    backgroundColor: theme.palette.background.paper,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: 2,
    },
  },
  typingBox: {
    backgroundColor: theme.palette.background.default,
    marginLeft: 30,
    marginRight: 30,
    width: '80%',
    border: '1px solid #333',
    borderRadius: 25,
    padding: '8px 16px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 5,
      marginRight: 5,
      width: '100%',
      padding: '6px 8px',
    },
  },
  inputBase: {
    flex: 1,
    fontSize: 16,
    color: theme.palette.text.primary,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    resize: 'none',
    minHeight: 28,
    maxHeight: 120,
    padding: 0,
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 0.7,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
      minHeight: 24,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  sendButton: {
    [theme.breakpoints.down('sm')]: {
      width: 44,
      height: 44,
    },
  },
}));

const RightChatView = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const activechat = useSelector((state) => state.chat.activeChat);
  const [msg, setMsg] = useState('');
  const [type, setType] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.chat.socket);

  useEffect(() => {
    const socket = io.connect('http://localhost:5000', { query: { token: localStorage.token } });
    dispatch(setSocket(socket));
    socket.on('MESSAGE', (msg) => {
      console.log(msg);
      dispatch(addMessage(msg));
    });
    socket.on('CHAT', (chat) => {
      console.log(chat);
      dispatch(addChat(chat));
    });
    socket.on('SEND', (msg) => {
      console.log(msg);
      setType(msg);
      setTimeout(() => {
        setType('');
      }, 3000);
    });
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    if (activechat.status === 'p') {
      const { chatId, frdId, name } = activechat;
      socket.emit('CHAT_MESSAGE', { chatId, frdId, name, msg });
    } else {
      const { chatId } = activechat;
      socket.emit('GROUP_MESSAGE', { chatId, msg });
    }
    setMsg('');
  };

  const onChange = (e) => {
    const { frdId } = activechat;
    setMsg(e.target.value);
    socket.emit('TYPING', { frdId });
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // Emoji picker handlers
  const handleEmojiOpen = (event) => {
    setEmojiAnchorEl(event.currentTarget);
  };
  const handleEmojiClose = () => {
    setEmojiAnchorEl(null);
  };
  const handleEmojiSelect = (emoji) => {
    // Insert emoji at cursor position
    const input = inputRef.current.querySelector('input');
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const newMsg = msg.slice(0, start) + emoji.native + msg.slice(end);
    setMsg(newMsg);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + emoji.native.length, start + emoji.native.length);
    }, 0);
  };
  const emojiOpen = Boolean(emojiAnchorEl);

  return (
    <div className={classes.root}>
      <RightViewAppBar
        name={activechat && activechat.name ? activechat.name : 'Welcome'}
        type={type}
        showMenuButton={isMobile}
        onMenuClick={handleDrawerOpen}
      />
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <LeftChatView />
      </Drawer>
      {activechat ? (
        <>
          <div className={classes.msgView}>
            <MessageView />
          </div>
          <div className={classes.textBox}>
            <div className={classes.typingBox}>
              <InputBase
                className={classes.inputBase}
                placeholder="Type a message..."
                multiline
                maxRows={4}
                value={msg}
                onChange={e => onChange({ target: { value: e.target.value } })}
                inputProps={{ 'aria-label': 'type a message' }}
                style={{ width: '100%' }}
                inputRef={inputRef}
              />
            </div>
            <IconButton onClick={handleEmojiOpen} aria-label="emoji picker">
              <InsertEmoticon style={{ color: '#FFD600', fontSize: isMobile ? 28 : 24 }} />
            </IconButton>
            <Popover
              open={emojiOpen}
              anchorEl={emojiAnchorEl}
              onClose={handleEmojiClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Picker onSelect={handleEmojiSelect} title="Pick an emoji" emoji="point_up" />
            </Popover>
            <IconButton aria-label="send message" onClick={onSubmit} className={classes.sendButton}>
              <Send style={isMobile ? { fontSize: 28 } : {}} />
            </IconButton>
          </div>
        </>
      ) : (
        <DefaultView />
      )}
    </div>
  );
};

export default RightChatView;
