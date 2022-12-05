import React, { useEffect, useState } from 'react';
import { FmlxTextBox } from 'fmlx-common-ui';
import { FmlxButton } from 'fmlx-common-ui';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [uname, setUname] = useState('');
  const [pwd, setPwd] = useState('');
  const [conn, setConn] = useState('');

  const style = {
    width: '50px',
  };

  useEffect(() => {
    let connection = new HubConnectionBuilder().withUrl('http://localhost:5156/hub/login').build();
    console.log(connection, 'login');

    connection.start().then(() => {
      setConn(connection);
    });
  }, []);

  const handleLogin = async () => {
    const payload = { username: uname, password: pwd };

    conn
      .invoke('login', payload)
      .then(() => {
        setTimeout(() => navigate('/Chat'), [2000]);
      })
      .catch((err) => {
        console.log('err :', err);
      });
  };

  return (
    <>
      <FmlxTextBox
        label={'Username'}
        style={style}
        onChange={(e) => setUname(e.value)}
        value={uname}
      />
      <FmlxTextBox
        label={'Password'}
        mode={'password'}
        style={style}
        onChange={(e) => setPwd(e.value)}
        value={pwd}
      />
      <FmlxButton onClick={handleLogin} label={'Login'} />
    </>
  );
};

export default Login;
