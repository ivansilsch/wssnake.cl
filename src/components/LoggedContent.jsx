import GamesList from './GamesList';

import useSocket from './../context/Socket';

const LoggedContent = function(props) {
	return(
		<div className="text-light flex flex-col justify-center text-center lg:mx-64 md:mx-32 mx-16">
			<div className="flex flex-col sm:flex-row justify-between ">
				<p className="mt-2 font-extrabold">Hello!, {props.nickname}</p>
				<button className="mt-2 sm:order-last bg-amber-800 rounded px-2">New Game</button>
				<h1 className="mt-2">Available games</h1>
			</div>
			<GamesList games={props.games}/>
		</div>
	); 
}

export default LoggedContent;