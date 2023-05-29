import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { characters } from "../utils/roles";
import { useSocket } from "../contexts/SocketProvider";

export const NightPhase = ({ id, roomDetails }) => {
	console.log("Details", JSON.stringify(roomDetails, null, 2));
	const roomCode = roomDetails["roomCode"];
	const playerList = roomDetails["playerList"];
	const me = playerList[id].playerObject;
	const myDetails = characters[me["role"]];
	const [selectedItem, setSelectedItem] = React.useState(-1);
	const { socket } = useSocket();

	// React.useEffect(() => {
	// 	socket.on("dayPhase", (value) => {
	// 		alert(value);
	// 	});
	// }, [socket]);

	return (
		<Grid
			container
			className="min-h-screen w-screen bg-slate-950 flex justify-center items-center"
			p={4}
			direction={"column"}
		>
			<Typography className="text-zinc-200" variant="h6">
				{roomCode}
			</Typography>
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
              rounded-md ${idx === 30 ? "bg-slate-600" : ""}`}
							onClick={() => {
								setSelectedItem(playerId);
							}}
							key={idx}
						>
							<Grid container justifyContent={"flex-end"}>
								<Grid item xs={8} className="overflow-hidden">
									{playerList[playerId].playerObject["playerName"]}
								</Grid>
								<Grid item xs={2}>
									{/* {idx} */}
								</Grid>
							</Grid>
						</button>
					);
				})}
			<Button
				onClick={() => {
					socket.emit(
						"playerAction",
						myDetails["action"],
						me.playerId,
						selectedItem
					);
				}}
			>
				Confirm Choice
			</Button>
		</Grid>
	);
};
