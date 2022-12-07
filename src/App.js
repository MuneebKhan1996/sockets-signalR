import { createContext, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import Main from './components/Main';
import Register from './components/Register';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Context } from './contexts/Context';

function App() {
  const [connection, setConn] = useState();
  const [username, setUsername] = useState('');

  useEffect(() => {
    let connection = new HubConnectionBuilder().withUrl('http://localhost:5156/hub/login').build();
    console.log(connection, 'login');

    connection.start().then(() => {
      setConn(connection);
    });
  }, []);

  return (
    <Context.Provider value={[username, setUsername]}>
      <Routes>
        <Route path="/Login" element={<Login socketConnection={connection} />} />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/Chat"
          element={<Chat socketConnection={connection} currentUser={username} />}
        />
        <Route path="/" element={<Main />} />
      </Routes>
    </Context.Provider>
  );
}

export default App;
