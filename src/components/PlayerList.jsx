import React from "react";
import { Box, Button, Grid, Typography, Paper } from "@mui/material";

export const PlayerList = ({ socket }) => {
	const [players, setPlayers] = React.useState([]);

	React.useEffect(() => {
		socket.on("player-list-update", (playerList) => {
			console.log(playerList);
			const pl = [];
			Object.keys(playerList).forEach((item) => pl.push(playerList[item].name));
			console.log(pl);
			setPlayers(pl);
		});
	}, [socket]);

	return (
		<Grid
			container
			className="min-h-screen w-screen bg-slate-950 flex justify-center items-center"
			p={4}
			direction={"column"}
		>
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
							<Grid item xs={8} className="overflow-hidden">
								{item.playerName}
							</Grid>
							<Grid item xs={2}>
								{idx}
							</Grid>
						</Grid>
					</div>
				);
			})}
		</Grid>
	);
};
