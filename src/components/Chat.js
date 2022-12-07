import React, { useEffect, useState, useContext } from 'react';
import { FmlxButton, FmlxTextBox } from 'fmlx-common-ui';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Context } from '../contexts/Context';

const Chat = ({ socketConnection }) => {
  // const [conn, setConn] = useState('');
  const [userOneMsg, setUserOneMsg] = useState([]);
  const [userTwoMsg, setUserTwoMsg] = useState([]);
  const [msg, setMsg] = useState('');
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useContext(Context);

  useEffect(() => {
    console.log(username);

    if (socketConnection) {
      socketConnection.on('ReceiveMessage', (message) => {
        console.log(`receive message :${message}`);
      });

      socketConnection.on('BroadcastChat', (message) => {
        console.log(`broadcast message : ${message}`);
      });

      socketConnection.on('Logout', (response) => {
        if (response) {
          navigate('/');
        } else {
          alert('failed logout');
        }
      });
    }
  }, []);

  // useEffect(() => {
  //   if (conn) {
  //     conn.on('ReceiveMessage', (message) => {
  //       console.log('message :', message);
  //       console.log(message);
  //     });
  //   }
  // }, [flag]);

  const handleLogout = () => {
    const user = localStorage.getItem('currentUser');
    socketConnection.invoke('logout', user);
  };

  const checkCurrentUser = () => {
    // conn.client.messageReceived;
    // console.log('conn.client.messageReceived :', conn.client.messageReceived);
    // conn.invoke('OnConnectedAsync').then((res) => {
    //   console.log('cc :', res);
    // });
    // conn.on('OnConnectedAsync', (res) => {
    //   console.log('Current User :', res);
    // });
  };

  const handleMsgSendToAll = async () => {
    const result = await socketConnection.invoke('BroadcastChat', msg);
    console.log('invoke broadcast:', result);
    //setFlag(!flag);
  };

  const handleMsgSend = async () => {
    const currentUser = username;
    let targetUser = 'admin';
    if (currentUser == targetUser) {
      targetUser = 'hub';
    }

    socketConnection.invoke('SendChatToUser', targetUser, msg).then((res) => {
      console.log('message sending response :', res);
    });

    setFlag(!flag);
  };

  return (
    <>
      <Box style={{ display: 'flex', width: '100%', height: '500px', border: '1px solid black' }}>
        <Box style={{ width: '100%' }}>
          <Box style={{ backgroundColor: '#f7a246', padding: '20px' }}>Receiver</Box>
          <Box>
            {userOneMsg?.map((oneMsg) => (
              <Box>{oneMsg}</Box>
            ))}
          </Box>
        </Box>
        <Box style={{ width: '100%', textAlign: 'right' }}>
          <Box style={{ backgroundColor: '#ffc98f', padding: '20px' }}>Sender</Box>
          <Box>
            {userTwoMsg?.map((twoMsg) => (
              <Box>{twoMsg}</Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box>
        <FmlxTextBox placeholder={'Username'} onChange={(e) => setMsg(e.value)} value={msg} />
        <FmlxButton onClick={handleMsgSend} label={'Send'} />
        <FmlxButton onClick={handleMsgSendToAll} label={'Send to All'} />
      </Box>

      <Box>
        <FmlxButton onClick={checkCurrentUser} label={'Current User'} />
        <FmlxButton onClick={handleLogout} label={'Logout'} />
      </Box>
    </>
  );
};

export default Chat;
