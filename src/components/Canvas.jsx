import {useRef, useEffect, useContext} from 'react';

import Snake from './objects/snake';

import DataContext from './../context/DataContext';
import useSocket from './../context/Socket';


const CANVAS_SIZE = window.screen.height - 100;
const CELLS_NUMBER = 40;
const CELL_SIZE = CANVAS_SIZE / CELLS_NUMBER;

const snake = new Snake(CELLS_NUMBER/2);
snake.setupControlls();

const Canvas = function() {

  	const socket = useSocket();
  	const {nickname, gameID, currentGame} = useContext(DataContext);
	const canvas = useRef();

	snake.identify(socket, gameID, nickname);

	useEffect(()=>{
		const ctx = canvas.current.getContext("2d")
		// Every time the current game is updated from the server,
		// the properties are updated and rendered on the canvas
		if (currentGame){
			const nicknames_keys = Object.keys(currentGame.players)
			nicknames_keys.forEach(nickname_key=>{
				const player = currentGame.players[nickname_key];
				const {x, y} = player.position;

				ctx.fillStyle = "#d9d2d9";
				ctx.fillRect(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE)

			});
		}
	}, [currentGame]);

	useEffect(()=>{
		const ctx = canvas.current.getContext("2d")

		canvas.current.width = CANVAS_SIZE; 
		canvas.current.height = CANVAS_SIZE;

		function loop() {		
			ctx.fillStyle = "#090209";
			ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

			// Updates all the objects properties
			snake.position.add(snake.velocity)
			snake.updateRemotePosition();

			console.log(snake.position)

			if (!snake.bordersCollide(CELLS_NUMBER)) {
				setTimeout(()=>{	
					window.requestAnimationFrame(loop);
				}, 100);
			} else {
				alert("Game Over")
			}
		}

		window.requestAnimationFrame(loop);
	}, []);


	return(
		<div>
			<canvas ref={canvas}></canvas>
		</div>
	);
}

export default Canvas;