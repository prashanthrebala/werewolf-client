import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { characters } from "../utils/roles";
import { useSocket } from "../contexts/SocketProvider";
import { PLAYER_STATUS } from "../utils/emojis";

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

	/** CSS to remove button click animation on mobile
	 * 	* {
				-webkit-tap-highlight-color: transparent;
			}
	 */
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
              items-center border-2 \
              rounded-md \
              ${
								playerId === selectedItem
									? "border-green-500 text-green-500"
									: "border-zinc-50 text-white"
							}`}
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
									{playerList[playerId].playerObject.alive
										? PLAYER_STATUS.ALIVE
										: PLAYER_STATUS.DEAD}
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
