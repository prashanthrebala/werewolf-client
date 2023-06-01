import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSocket } from "../contexts/SocketProvider";
import { GAME_STATE } from "../utils/constants";
import { StartGameButton } from "./StartGameButton";

export const GameLobby = ({ id, roomCode, setGameState, setRoomDetails }) => {
	const [roomInfo, setRoomInfo] = React.useState({ playerList: [] });
	const playerIds = Object.keys(roomInfo.playerList);
	const { socket } = useSocket();
	console.log("ROOMDATA", roomInfo);

	React.useEffect(() => {
		if (socket == null) return;
		socket.on("playerUpdate", (roomData) => {
			setRoomInfo(roomData);
		});
		socket.on("nightPhase", (value) => {
			setRoomDetails(value);
			setGameState(GAME_STATE.NIGHT);
		});
		socket.on("dayPhase", (value) => {
			alert(value.message);
			setGameState(GAME_STATE.DAY);
		});
		socket.on("lynchPhase", () => {});
		console.log("socketUpdated", socket);
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
				{`Player Count: ${Object.keys(roomInfo["playerList"]).length}`}
			</Typography>
			{playerIds.map((playerInfo, idx) => {
				return (
					<div
						className={`h-10 w-full m-2 \
					flex justify-center \
					items-center border \
              text-white border-zinc-50 \
              rounded-md ${idx === 30 ? "bg-slate-600" : ""}`}
						key={idx}
					>
						<Grid container justifyContent={"flex-end"}>
							<Grid item xs={8} className="overflow-hidden text-center">
								{roomInfo["playerList"][playerInfo].playerObject.playerName}
							</Grid>
							<Grid item xs={2}>
								{/* {idx} */}
							</Grid>
						</Grid>
					</div>
				);
			})}
			<StartGameButton
				isAdmin={roomInfo["admin"] === id}
				playerCount={playerIds.length}
				socket={socket}
			/>
		</Grid>
	);
};
