import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSocket } from "../contexts/SocketProvider";
import { GAME_STATE } from "../utils/constants";
import { StartGameButton } from "./StartGameButton";

export const GameLobby = ({
	id,
	roomCode,
	setGameState,
	roomDetails,
	setRoomDetails,
}) => {
	// const [roomInfo, setRoomInfo] = React.useState({ playerList: [] });
	const playerIds = Object.keys(roomDetails.playerList);
	const { socket } = useSocket();
	// console.log("ROOMDATA", roomInfo);

	React.useEffect(() => {
		if (socket == null) return;

		const handlePlayerUpdate = (roomData) => {
			setRoomDetails(roomData);
		};

		const handleNightPhaseStart = (roomData) => {
			setRoomDetails(roomData);
			setGameState(GAME_STATE.NIGHT);
		};

		socket.on("playerUpdate", handlePlayerUpdate);
		socket.on("nightPhase", handleNightPhaseStart);

		// socket.on("dayPhase", (value) => {
		// 	alert(value.message);
		// 	setGameState(GAME_STATE.DAY);
		// });
		// socket.on("lynchPhase", () => {});
		console.log("Socket on mount Game Lobby", socket);

		return () => {
			socket.off("playerUpdate", handlePlayerUpdate);
			socket.off("nightPhase", handleNightPhaseStart);
			console.log("Socket Exits Game  Lobby", socket);
		};
	}, [socket, setGameState, setRoomDetails]);

	return (
		<Grid
			container
			className="min-h-screen w-screen bg-slate-950 flex justify-center items-center"
			p={4}
			direction={"column"}
		>
			<Typography variant="h5" className="text-white">
				{roomCode}
			</Typography>
			<Typography variant="body1" className="text-white">
				{`Player Count: ${Object.keys(roomDetails["playerList"]).length}`}
			</Typography>
			{playerIds.map((playerInfo, idx) => {
				return (
					<div
						className="h-10 w-full m-2 flex justify-center items-center border text-white border-zinc-50 rounded-md"
						key={idx}
					>
						<Grid container justifyContent={"flex-end"}>
							<Grid item xs={8} className="overflow-hidden text-center">
								{roomDetails["playerList"][playerInfo].playerName}
							</Grid>
							<Grid item xs={2}>
								{/* {idx} */}
							</Grid>
						</Grid>
					</div>
				);
			})}
			<StartGameButton
				isAdmin={roomDetails["admin"] === id}
				playerCount={playerIds.length}
				socket={socket}
			/>
		</Grid>
	);
};
