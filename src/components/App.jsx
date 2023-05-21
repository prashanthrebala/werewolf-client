import { SocketProvider } from "../contexts/SocketProvider";
import { Login } from "./Login";
import { GameLobby } from "./GameLobby";
import { Layout } from "./Layout";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

function App() {
	const prefixedKey = "werewolf-client-key";
	let id = localStorage.getItem(prefixedKey);
	if (id == null) {
		localStorage.setItem(prefixedKey, uuid());
	}

	const [playerName, setPlayerName] = useState();
	const [roomCode, setRoomCode] = useState(null);
	const [isGameRunning, setIsGameRunning] = useState(false);

	useEffect(() => {
		fetch(`http://192.168.1.129:5000/whereami?id=${id}`)
			.then((response) => response.json())
			.then((data) => {
				setRoomCode(data?.roomCode);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}, [id]);

	return roomCode ? (
		<SocketProvider id={id} playerName={playerName} roomCode={roomCode}>
			{isGameRunning ? (
				<Layout />
			) : (
				<GameLobby roomCode={roomCode} setIsGameRunning={setIsGameRunning} />
			)}
		</SocketProvider>
	) : (
		<Login id={id} setPlayerName={setPlayerName} setRoomCode={setRoomCode} />
	);
}

export default App;
