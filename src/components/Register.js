import React, { useEffect, useState } from 'react';
import { FmlxTextBox } from 'fmlx-common-ui';
import { FmlxButton } from 'fmlx-common-ui';
import { HubConnectionBuilder } from '@microsoft/signalr';

const Register = () => {
  const [uname, setUname] = useState('');
  const [pwd, setPwd] = useState('');
  const [conn, setConn] = useState('');

  useEffect(() => {
    let connection = new HubConnectionBuilder().withUrl('http://localhost:5156/hub/login').build();
    console.log(connection, 'Register');

    connection.start().then(() => {
      setConn(connection);
    });
  }, []);

  const handleRegister = () => {
    const payload = { username: uname, password: pwd };
    conn
      .invoke('register', payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('err :', err);
      });
  };

  const style = {
    width: '50px',
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
      <FmlxButton onClick={handleRegister} label={'Register'} />
    </>
  );
};

export default Register;
