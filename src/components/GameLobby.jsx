import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useSocket } from "../contexts/SocketProvider";

export const GameLobby = ({ roomCode, setIsGameRunning, setRoomDetails }) => {
	const [roomInfo, setRoomInfo] = React.useState({ playerList: [] });
	const { socket } = useSocket();
	console.log("ROOMDATA", roomInfo);

	React.useEffect(() => {
		if (socket == null) return;
		socket.on("playerUpdate", (roomData) => {
			setRoomInfo(roomData);
		});
		socket.on("nightPhase", (value) => {
			setRoomDetails(value);
			setIsGameRunning(true);
		});
		socket.on("dayPhase", (value) => {
			alert(value.message);
			setIsGameRunning(false);
		});
		socket.on("lynchPhase", () => {});
		console.log("socketUpdated", socket);
	}, [socket, setIsGameRunning, setRoomDetails]);

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
			{Object.keys(roomInfo["playerList"]).map((playerInfo, idx) => {
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
			<Button
				onClick={() => {
					socket.emit("startGame");
				}}
			>
				Start Game
			</Button>
		</Grid>
	);
};
