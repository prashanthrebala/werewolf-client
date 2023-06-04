import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { characters } from "../utils/roles";
import { useSocket } from "../contexts/SocketProvider";
import { GAME_STATE } from "../utils/constants";
import { NightPhaseButton } from "./NightPhaseButton";

export const NightPhase = ({
	id,
	roomDetails,
	setGameState,
	setRoomDetails,
}) => {
	console.log("Details", JSON.stringify(roomDetails, null, 2));
	const roomCode = roomDetails["roomCode"];
	const playerList = roomDetails["playerList"];
	const me = playerList[id].playerObject;
	const myDetails = characters[me["role"]];
	const [selectedItem, setSelectedItem] = React.useState(-1);
	const { socket } = useSocket();

	React.useEffect(() => {
		if (socket == null) return;

		const handleDayPhaseStart = (value, roomData) => {
			alert(value.message);
			setGameState(GAME_STATE.DAY);
			setRoomDetails(roomData);
		};

		socket.on("dayPhase", handleDayPhaseStart);
		console.log("Socket on mount Night Phase", socket);

		return () => {
			socket.off("dayPhase", handleDayPhaseStart);
			console.log("Socket Exits Night Phase", socket);
		};
	}, [socket, setGameState, setRoomDetails]);

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
				.filter((playerId) => playerId !== id || !me.isAlive)
				.map((playerId, idx) => (
					<NightPhaseButton
						imAlive={me.isAlive}
						playerId={playerId}
						playerList={playerList}
						selectedItem={selectedItem}
						setSelectedItem={setSelectedItem}
						key={idx}
					/>
				))}
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
