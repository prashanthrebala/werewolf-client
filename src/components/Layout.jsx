import React from "react";
import { Box, Button, Grid, Typography, Paper } from "@mui/material";

export const Layout = () => {
	const players = ["Talon", "Andy", "Kimi", "Duke", "Viking", "Prometheus"];

	return (
		<Grid
			className="min-h-screen w-screen bg-slate-950 flex justify-center items-center"
			p={4}
			direction={"column"}
		>
			<Typography className="text-zinc-200" variant="h5">
				You are a Doctor
			</Typography>
			<Typography className="text-blue-200" variant="body2">
				Choose one player to protect every night, That player cannot be killed
				that night.
			</Typography>
			<Typography className="text-blue-200" variant="body1">
				Choose a player to save:
			</Typography>
			{players.map((playerName, idx) => {
				return (
					<button
						className={`h-10 w-full m-2 \
              flex justify-center \
              items-center border \
              text-white border-zinc-50 \
              rounded-md ${idx === 3 ? "bg-slate-600" : ""}`}
						onClick={() => {}}
						key={idx}
					>
						<Grid container justifyContent={"flex-end"}>
							<Grid item xs={8} className="overflow-hidden">
								{playerName}
							</Grid>
							<Grid item xs={2}>
								{idx}
							</Grid>
						</Grid>
					</button>
				);
			})}
			{/* </Grid> */}
		</Grid>
	);
};
