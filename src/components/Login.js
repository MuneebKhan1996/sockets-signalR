import React, { useContext, useEffect, useState } from 'react';
import { FmlxButton, FmlxTextBox } from 'fmlx-common-ui';
// import { HubConnectionBuilder } from '@microsoft/signalr';
import { useNavigate } from 'react-router-dom';
import { Context } from '../contexts/Context';

const Login = ({ socketConnection }) => {
  const navigate = useNavigate();

  const [uname, setUname] = useState('');
  const [pwd, setPwd] = useState('');
  const [username, setUsername] = useContext(Context);
  // const [conn, setConn] = useState('');

  const style = {
    width: '50px',
  };

  useEffect(() => {}, [socketConnection]);

  const handleLogin = async () => {
    const payload = { username: uname, password: pwd };

    socketConnection
      .invoke('login', payload)
      .then(() => {
        localStorage.setItem('currentUser', uname);
        setUsername(uname);
        navigate('/Chat');
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
