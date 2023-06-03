import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { useSocket } from "../contexts/SocketProvider";
import { GAME_STATE } from "../utils/constants";

export const DayPhase = ({ id, roomDetails, setRoomDetails, setGameState }) => {
	console.log("Details", JSON.stringify(roomDetails, null, 2));
	const roomCode = roomDetails["roomCode"];
	const playerList = roomDetails["playerList"];
	const [lynchCount, setLynchCount] = React.useState(() => {
		const ret = {};
		Object.keys(playerList).forEach((playerId) => {
			ret[playerId] = 0;
		});
		return ret;
	});
	const me = playerList[id].playerObject;
	const [selectedItem, setSelectedItem] = React.useState(-1);
	const [locked, setLocked] = React.useState(false);
	const { socket } = useSocket();

	React.useEffect(() => {
		const handleLynchUpdates = (votes) => {
			const newLynchCount = {};
			for (const playerId of Object.values(votes)) {
				newLynchCount[playerId] = (newLynchCount[playerId] || 0) + 1;
			}
			setLynchCount((prevValue) => {
				const updatedValue = {};
				for (const key of Object.keys(prevValue)) {
					updatedValue[key] = 0;
				}
				return { ...updatedValue, ...newLynchCount };
			});
		};

		const backToLobby = (roomInfo) => {
			// roomInfo isn't used but the server passes it nonetheless
			setGameState(GAME_STATE.LOBBY);
		};

		socket.on("lynchUpdates", handleLynchUpdates);
		socket.on("lobby", backToLobby);
		console.log("Socket on mount Day Phase", socket);

		return () => {
			socket.off("lynchUpdates", handleLynchUpdates);
			socket.off("lobby", backToLobby);
			console.log("Socket Exits Day Phase", socket);
		};
	}, [socket, setGameState, setRoomDetails]);

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
			<Typography className="text-blue-200" variant="body2">
				{
					"You have 2 minutes to discuss and lynch someone. Remember, an individual must have more than 50% of the votes to be lynched!"
				}
			</Typography>
			{Object.keys(playerList).map((playerId, idx) => {
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
							if (!locked) {
								setSelectedItem(playerId);
								socket.emit("lynchTime", me.playerId, playerId);
							}
						}}
						key={idx}
					>
						<Grid container justifyContent={"flex-end"}>
							<Grid item xs={8} className="overflow-hidden">
								{playerList[playerId].playerObject["playerName"]}
							</Grid>
							<Grid item xs={2}>
								{lynchCount[playerId]}
							</Grid>
						</Grid>
					</button>
				);
			})}
			<Button
				onClick={() => {
					if (!locked) {
						setLocked(true);
						socket.emit("lynchConfirm");
					}
				}}
			>
				{locked ? "Waiting on other players" : "Confirm Choice"}
			</Button>
		</Grid>
	);
};
