import { SocketProvider } from "../contexts/SocketProvider";
// import { useSessionStorage } from "../hooks/useSessionStorage";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// import { Layout } from "./Layout";
import { Login } from "./Login";
import { PlayerList } from "./PlayerList";
import React, { useState } from "react";

function App() {
	const [id, setId] = useState("hi");
	const [roomCode, setRoomCode] = useState(null);
	return roomCode ? (
		<SocketProvider id={id} roomCode={roomCode}>
			<PlayerList />
		</SocketProvider>
	) : (
		<Login setId={setId} setRoomCode={setRoomCode} />
	);
}

export default App;
