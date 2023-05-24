import React from "react";
import { Box, Button, Grid, Typography, Paper } from "@mui/material";
import { characters } from "../utils/roles";

export const NightPhase = ({ id, roomDetails }) => {
	// alert(JSON.stringify(roomDetails, null, 2));
	console.log("Details", JSON.stringify(roomDetails, null, 2));
	const roomCode = roomDetails["roomCode"];
	const playerList = roomDetails["playerList"];
	const me = playerList[id].playerObject;
	console.log("ME", JSON.stringify(me, null, 2));
	// const player = playerList[id];
	// alert(playerList);
	const myDetails = characters[me["role"]];
	console.log("myDetails", JSON.stringify(myDetails, null, 2));
	const players = ["Talon", "Andy", "Kimi", "Duke", "Viking", "Prometheus"];

	return (
		<Grid
			container
			className="min-h-screen w-screen bg-slate-950 flex justify-center items-center"
			p={4}
			direction={"column"}
		>
			<Typography className="text-zinc-200" variant="h5">
				{`You are a ${myDetails["role"]}`}
			</Typography>
			<Typography className="text-blue-200" variant="body2">
				{myDetails["displayText"]}
			</Typography>
			<Typography className="text-blue-200" variant="body1">
				{myDetails["prompt"]}
			</Typography>
			{Object.keys(playerList)
				.filter((playerId) => playerId !== id)
				.map((playerId, idx) => {
					return (
						<button
							className={`h-10 w-full m-2 \
              flex justify-center \
              items-center border \
              text-white border-zinc-50 \
              rounded-md \
							// ${idx === 3 ? "bg-slate-600" : ""}`}
							onClick={() => {}}
							key={idx}
						>
							<Grid container justifyContent={"flex-end"}>
								<Grid item xs={8} className="overflow-hidden">
									{playerList[playerId].playerObject["playerName"]}
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
