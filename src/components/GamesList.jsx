import {useState, useCallback} from 'react';

import useSocket from './../context/Socket';

import GameItem from './GameItem';


const GamesList = function(props) {
	const {games} = props;
	return(
		<div className="flex justify-center text-center my-2">
			{
				games.map( (game, index) => {
					return <GameItem game={game} key={index}/>
				})
			}
		</div>
	); 
}

export default GamesList;