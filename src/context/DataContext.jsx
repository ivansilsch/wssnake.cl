import {createContext, useState, useEffect} from 'react';

const DataContext = createContext();


export function DataProvider(props) {

	const [logged, setLogged] = useState(false);
	const [nickname, setNickname] = useState("");
	const [gameID, setGameID] = useState(null);
	const [currentGame, setCurrentGame] = useState(null);

	return(
		<DataContext.Provider value={{
			logged, setLogged,
			nickname, setNickname,
			gameID, setGameID,
			currentGame, setCurrentGame
		}}>
			{props.children}
		</DataContext.Provider>
	);
}

export default DataContext;