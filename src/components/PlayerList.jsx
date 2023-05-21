import React from "react";
import { Box, Button, Grid, Typography, Paper } from "@mui/material";
import { useSocket } from "../contexts/SocketProvider";

export const PlayerList = () => {
	const [roomInfo, setRoomInfo] = React.useState({});
	const { socket, roomCode } = useSocket();

	React.useEffect(() => {
		if (socket == null) return;
		socket.on("playerUpdate", (roomData) => {
			setRoomInfo(roomData);
		});
		console.log("socketUpdated", socket);
	}, [socket]);

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
				{`Player Count: ${Object.keys(roomInfo).length}`}
			</Typography>
			{Object.keys(roomInfo).map((playerId, idx) => {
				console.log(roomInfo[playerId]);
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
								{roomInfo[playerId].playerName}
							</Grid>
							<Grid item xs={2}>
								{/* {idx} */}
							</Grid>
						</Grid>
					</div>
				);
			})}
			<Button onClick={() => alert(socket.id)}>Start Game</Button>
		</Grid>
	);
};
