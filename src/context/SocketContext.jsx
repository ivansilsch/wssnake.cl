import {createContext, useState, useEffect} from 'react';


const SOCKET_URL = "ws://localhost:8000";
const SOCKET_RECONNECTION_TIMEOUT = 1000;
const webSocket = new WebSocket(SOCKET_URL);

const SocketContext = createContext(webSocket);


export function SocketProvider(props) {

	const [socket, setSocket] = useState(webSocket);

	useEffect(()=>{
		const onClose = () => {
			setTimeout(
				setSocket(new WebSocket(SOCKET_URL)),
				SOCKET_RECONNECTION_TIMEOUT
			);
		}
		
		socket.addEventListener("close", onClose);

		return () => {
			socket.removeEventListener("close", onClose);
		}
	}, [socket, setSocket]);

	return(
		<SocketContext.Provider value={socket}>
			{props.children}
		</SocketContext.Provider>
	);
}

export default SocketContext;