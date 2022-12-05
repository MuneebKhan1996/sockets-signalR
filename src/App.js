import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import Main from './components/Main';
import Register from './components/Register';

function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Chat" element={<Chat />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
