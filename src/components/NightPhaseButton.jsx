import React from "react";
import { Grid } from "@mui/material";
import { PLAYER_STATUS } from "../utils/emojis";

export const NightPhaseButton = ({
	imAlive,
	playerId,
	playerList,
	selectedItem,
	setSelectedItem,
}) => {
	const isDisabled = !imAlive || !playerList[playerId].isAlive;
	return (
		<button
			disabled={isDisabled}
			className={`h-10 w-full m-2 flex justify-center items-center border-2 rounded-md ${
				!isDisabled
					? playerId === selectedItem
						? "border-green-500 text-green-500"
						: "border-zinc-50 text-white"
					: "border-stone-700 text-stone-400"
			}`}
			onClick={() => {
				setSelectedItem(playerId);
			}}
		>
			<Grid container justifyContent={"flex-end"}>
				<Grid item xs={8} className="overflow-hidden">
					{playerList[playerId]["playerName"]}
				</Grid>
				<Grid item xs={2}>
					{playerList[playerId].isAlive
						? PLAYER_STATUS.ALIVE
						: PLAYER_STATUS.DEAD}
				</Grid>
			</Grid>
		</button>
	);
};
