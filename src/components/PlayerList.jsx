import React from "react";
import { Box, Button, Grid, Typography, Paper } from "@mui/material";
import { useSocket } from "../contexts/SocketProvider";

export const PlayerList = () => {
	const [players, setPlayers] = React.useState([]);
	const socket = useSocket();

	React.useEffect(() => {
		if (socket == null) return;
		socket.on("playerUpdate", (playerList) => {
			setPlayers(playerList);
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
			<Typography variant="h3" className="text-white">
				{players.length}
			</Typography>
			<Button onClick={() => alert(socket.id)}>Start Game</Button>
			{players.map((item, idx) => {
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
								{item.playerName}
							</Grid>
							<Grid item xs={2}>
								{/* {idx} */}
							</Grid>
						</Grid>
					</div>
				);
			})}
		</Grid>
	);
};
