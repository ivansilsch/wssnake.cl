import {useContext, useCallback} from 'react';

import SocketContext from './SocketContext';

function useSocket() {
	const socket = useContext(SocketContext);

	socket.onopen = useCallback(() => {
		const payload = { method: "connect" };
		socket.send(JSON.stringify(payload));
	}, []);


	return socket;
}

export default useSocket;