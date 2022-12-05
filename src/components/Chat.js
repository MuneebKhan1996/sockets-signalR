import React, { useEffect, useState } from 'react';
import { FmlxButton } from 'fmlx-common-ui';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const [conn, setConn] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let connection = new HubConnectionBuilder().withUrl('http://localhost:5156/hub/login').build();
    console.log(connection, 'chat');

    connection.start().then(() => {
      setConn(connection);
    });
  }, []);

  const handleLogout = () => {
    conn.invoke('logout', 'hub');

    conn.on('Logout', (res) => {
      setTimeout(() => navigate('/'), [2000]);
    });
  };

  return <FmlxButton onClick={handleLogout} label={'Logout'} />;
};

export default Chat;
