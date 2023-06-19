import { SocketProvider } from "../contexts/SocketProvider";
import { Login } from "./Login";
import { GameLobby } from "./GameLobby";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { AppHeader } from "./AppHeader";
import { DayPhase } from "./DayPhase";
import { NightPhase } from "./NightPhase";
import { GAME_STATE } from "../utils/constants";

function App() {
	const prefixedKey = "werewolf-client-key";
	let id = sessionStorage.getItem(prefixedKey);
	if (id == null) {
		sessionStorage.setItem(prefixedKey, uuid());
	}

	const [playerName, setPlayerName] = useState();
	const [roomCode, setRoomCode] = useState(null);
	const [gameState, setGameState] = useState(GAME_STATE.LOBBY);
	// TODO replace the useState to use appropriate initial object
	const [roomDetails, setRoomDetails] = useState({ players: [] });

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
			<div className="min-h-screen flex flex-col">
				<AppHeader roomCode={roomCode} playerName={playerName} />
				{gameState === GAME_STATE.LOBBY && (
					<GameLobby
						id={id}
						roomCode={roomCode}
						roomDetails={roomDetails}
						setGameState={setGameState}
						setRoomDetails={setRoomDetails}
					/>
				)}
				{gameState === GAME_STATE.DAY && (
					<DayPhase
						id={id}
						roomDetails={roomDetails}
						setGameState={setGameState}
						setRoomDetails={setRoomDetails}
					/>
				)}
				{gameState === GAME_STATE.NIGHT && (
					<NightPhase
						id={id}
						roomDetails={roomDetails}
						setGameState={setGameState}
						setRoomDetails={setRoomDetails}
					/>
				)}
			</div>
		</SocketProvider>
	) : (
		<Login id={id} setPlayerName={setPlayerName} setRoomCode={setRoomCode} />
	);
}

export default App;
