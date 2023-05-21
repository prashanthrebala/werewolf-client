import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useSocket } from "../contexts/SocketProvider";

export const GameLobby = ({ roomCode, setIsGameRunning }) => {
	const [roomInfo, setRoomInfo] = React.useState({ playerList: [] });
	const { socket } = useSocket();
	console.log("ROOMDATA", roomInfo);

	React.useEffect(() => {
		if (socket == null) return;
		socket.on("playerUpdate", (roomData) => {
			setRoomInfo(roomData);
		});
		socket.on("gameStarted", () => {
			setIsGameRunning(true);
		});
		console.log("socketUpdated", socket);
	}, [socket, setIsGameRunning]);

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
              rounded-md ${idx === 3 ? "bg-slate-600" : ""}`}
						key={idx}
					>
						<Grid container justifyContent={"flex-end"}>
							<Grid item xs={8} className="overflow-hidden text-center">
								{playerInfo.slice(0, 8)}
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
					// alert(socket.id);
					// setIsGameRunning(true);
					socket.emit("startGame");
				}}
			>
				Start Game
			</Button>
		</Grid>
	);
};
