import {useCallback, useContext} from 'react';

import useSocket from './../context/Socket';
import DataContext from './../context/DataContext';


const GamesItem = function(props) {

	const socket = useSocket();
  	const {nickname} = useContext(DataContext);
	const {game} = props;

	function joinGameHandler() {
		const data = { gameID: game.id, nickname }
		const payload = { method: "join", data }
		socket.send(JSON.stringify(payload));
	}

	return(
		<button
			onClick={joinGameHandler}
			className="
				mt-1 w-full p-2 border rounded flex justify-between cursor-pointer
				border-light text-light hover:border-white hover:text-white hover:bg-darker">
			<div>{game.id}</div>
			<div>Players: {game.players}</div>
		</button>
	); 
}

export default GamesItem;