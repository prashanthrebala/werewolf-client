import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { characters } from "../utils/roles";
import { useSocket } from "../contexts/SocketProvider";
import { GAME_STATE } from "../utils/constants";
import { NightPhaseButton } from "./NightPhaseButton";
import { NotificationModal } from "./NotificationModal";

export const NightPhase = ({
	id,
	roomDetails,
	setGameState,
	setRoomDetails,
}) => {
	console.log("Details", JSON.stringify(roomDetails, null, 2));
	const roomCode = roomDetails["roomCode"];
	const playerList = roomDetails["playerList"];
	const me = playerList[id];
	const myDetails = characters[me["role"]];
	const [isConfirmed, setIsConfirmed] = React.useState(false);
	const [selectedItem, setSelectedItem] = React.useState(-1);
	const [shouldDisplay, setShouldDisplay] = React.useState(false);
	const [content, setContent] = React.useState(null);
	const { socket } = useSocket();

	React.useEffect(() => {
		if (socket == null) return;

		const handleDayPhaseStart = (roomData) => {
			// alert(value.message);
			setGameState(GAME_STATE.DAY);
			setRoomDetails(roomData);
		};

		const handleNightNotice = (content) => {
			setShouldDisplay(true);
			setContent(content);
		};

		socket.on("dayPhase", handleDayPhaseStart);
		console.log("Socket on mount Night Phase", socket);

		socket.on("notice", handleNightNotice);

		return () => {
			socket.off("dayPhase", handleDayPhaseStart);
			socket.off("notice", handleNightNotice);
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
			<NotificationModal
				shouldDisplay={shouldDisplay}
				setShouldDisplay={setShouldDisplay}
				content={content}
			/>
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
			{me.isAlive ? (
				<Button
					disabled={isConfirmed}
					onClick={() => {
						socket.emit(
							"playerAction",
							myDetails["action"],
							me.playerId,
							selectedItem
						);
						setIsConfirmed(true);
					}}
				>
					Confirm Choice
				</Button>
			) : (
				<div className="text-zinc-500 m-4">You are dead</div>
			)}
		</Grid>
	);
};
