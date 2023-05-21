import { SocketProvider } from "../contexts/SocketProvider";
import useLocalStorage from "../hooks/useLocalStorage";
// import { useSessionStorage } from "../hooks/useSessionStorage";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// import { Layout } from "./Layout";
import { Login } from "./Login";
import { PlayerList } from "./PlayerList";
import React, { useState, useEffect } from "react";

function App() {
	const [id, setId] = useLocalStorage("client-id");
	const [playerName, setPlayerName] = useState();
	const [roomCode, setRoomCode] = useState(null);

	useEffect(() => {
		fetch(`http://192.168.1.129:5000/whereami?id=${id}`)
			.then((response) => response.json())
			.then((data) => {
				setRoomCode(data.roomCode);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}, []);

	// useEffect(() => {
	// 	console.log("ADSADKLJASKLD", roomCode);
	// });

	return roomCode ? (
		<SocketProvider id={id} playerName={playerName} roomCode={roomCode}>
			<PlayerList />
		</SocketProvider>
	) : (
		<Login
			setId={setId}
			setPlayerName={setPlayerName}
			setRoomCode={setRoomCode}
		/>
	);
}

export default App;
