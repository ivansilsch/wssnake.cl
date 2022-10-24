import {useState, useCallback, useEffect, useContext} from 'react';

import LoginForm from './components/LoginForm';
import LoggedContent from './components/LoggedContent';
import Canvas from './components/Canvas';

import useSocket from './context/Socket';
import DataContext from './context/DataContext';


function AppContent() {

  const [logged, setLogged] = useState(false);
  const [joined, setJoined] = useState(false); 
  const {nickname, setGameID, setCurrentGame} = useContext(DataContext);
  const socket = useSocket();
  const [games, setGames] = useState([]);

  function handleConnectedState(data){
    console.log(data.state)
  }

  function handleLoggedState(data){
      console.log(data)
      setLogged(true);
  }

  function handleJoinedState(data) {
      console.log(data)
      setJoined(true);
      setGameID(data.gameID)
  }

  function handleGamesUpdatedState(data) {
    setGames(JSON.parse(data.games));
  }

  function handleMovedState(data){
    setCurrentGame(data.game)
  }

  useEffect(()=>{
    socket.onmessage = message => {
      const data = JSON.parse(message.data);
      switch(data.state) {
        case "connected": handleConnectedState(data); break;
        case "logged": handleLoggedState(data); break;
        case "joined": handleJoinedState(data); break;
        case "games-updated": handleGamesUpdatedState(data); break;
        case "moved": handleMovedState(data); break;
        default: console.log(data); break;
      }
    };
  }, []);

  return (
      <div className="bg-dark h-screen flex flex-col justify-center" role="main">
        { joined && <Canvas /> }
        { !logged && <LoginForm /> }
        { logged && !joined && <LoggedContent nickname={nickname} games={games}/> }
      </div>
  );
}

export default AppContent;
