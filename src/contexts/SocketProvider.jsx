import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
	return useContext(SocketContext);
}

export function SocketProvider({ id, roomCode, children }) {
	const [socket, setSocket] = useState();

	useEffect(() => {
		const connection = io("http://192.168.1.129:5000", { query: { id } });
		connection.on("connect", () => {
			connection.emit("join-room", {
				playerName: id,
				roomCode: roomCode.toUpperCase(),
			});
			console.log("joining room", roomCode);
		});
		setSocket(connection);
		return () => connection.close();
	}, [id, roomCode]);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
}
