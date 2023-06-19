import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useSocket } from "../contexts/SocketProvider";
import { GAME_STATE } from "../utils/constants";
import { PLAYER_STATUS } from "../utils/emojis";

export const DayPhase = ({ id, roomDetails, setRoomDetails, setGameState }) => {
	console.log("Details", JSON.stringify(roomDetails, null, 2));
	const roomCode = roomDetails["code"];
	const playerList = roomDetails["players"];
	const [totalVotes, setTotalVotes] = React.useState(1);
	const [lynchCount, setLynchCount] = React.useState(() => {
		const ret = {};
		Object.keys(playerList).forEach((playerId) => {
			ret[playerId] = 0;
		});
		return ret;
	});
	const me = playerList[id];
	const [selectedItem, setSelectedItem] = React.useState(-1);
	const [locked, setLocked] = React.useState(false);
	const { socket } = useSocket();

	React.useEffect(() => {
		const handleLynchUpdates = (votes) => {
			const newLynchCount = {};
			for (const playerId of Object.values(votes)) {
				newLynchCount[playerId] = (newLynchCount[playerId] || 0) + 1;
			}
			setTotalVotes(Object.keys(votes).length || 1);
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

		const handleNightPhaseStart = (roomData) => {
			setRoomDetails(roomData);
			setGameState(GAME_STATE.NIGHT);
		};

		socket.on("lynchUpdates", handleLynchUpdates);
		socket.on("nightPhase", handleNightPhaseStart);
		socket.on("lobby", backToLobby);
		console.log("Socket on mount Day Phase", socket);

		return () => {
			socket.off("lynchUpdates", handleLynchUpdates);
			socket.off("nightPhase", handleNightPhaseStart);
			socket.off("lobby", backToLobby);
			console.log("Socket Exits Day Phase", socket);
		};
	}, [socket, setGameState, setRoomDetails]);

	return (
		<Grid
			container
			className="grow w-screen bg-slate-950 flex justify-center items-center"
			p={4}
			direction={"column"}
		>
			<Typography className="text-zinc-200" variant="body1">
				{roomDetails["message"]}
			</Typography>
			<Typography className="text-blue-200" variant="body2">
				{
					"You have 2 minutes to discuss and lynch someone. Remember, an individual must have more than 50% of the votes to be lynched!"
				}
			</Typography>
			{Object.keys(playerList).map((playerId, idx) => {
				const thresh = Math.round((lynchCount[playerId] / totalVotes) * 100);
				const disabled = !me.isAlive || !playerList[playerId].isAlive;
				return (
					<button
						disabled={disabled}
						className={`h-10 w-full m-2 flex justify-center items-center border-2 rounded-md relative ${
							!disabled
								? "border-zinc-50 text-white"
								: "border-stone-700 text-stone-600"
						}`}
						onClick={() => {
							if (!locked) {
								setSelectedItem(playerId);
								socket.emit("lynchTime", me.playerId, playerId);
							}
						}}
						key={idx}
					>
						<Grid className="z-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
							<Box
								className={`h-9 rounded transition-width duration-200 ${
									playerId === selectedItem ? "bg-indigo-700" : "bg-blue-950"
								}`}
								sx={{ width: `${thresh}%` }}
							/>
						</Grid>
						<Grid container justifyContent={"flex-end"} sx={{ zIndex: 2 }}>
							<Grid item xs={8} className="overflow-hidden">
								{playerList[playerId]["playerName"]}
							</Grid>
							<Grid item xs={2}>
								{playerList[playerId].isAlive
									? lynchCount[playerId] || ""
									: PLAYER_STATUS.DEAD}
							</Grid>
						</Grid>
					</button>
				);
			})}
			{me.isAlive ? (
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
			) : (
				<div className="text-zinc-500 m-4">You are dead</div>
			)}
		</Grid>
	);
};
