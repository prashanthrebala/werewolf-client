import React from "react";
import { MIN_REQUIRED_PLAYERS } from "../utils/constants";

export const StartGameButton = ({ isAdmin, playerCount, socket }) => {
	return isAdmin ? (
		<>
			<button
				className={`py-2 px-3 rounded-md mt-4 mb-2 ${
					playerCount < MIN_REQUIRED_PLAYERS
						? "bg-gray-900 text-zinc-700"
						: "bg-green-700 text-zinc-300"
				}`}
				disabled={playerCount < MIN_REQUIRED_PLAYERS}
				onClick={() => {
					socket.emit("startGame");
				}}
			>
				Start Game
			</button>
			{playerCount < MIN_REQUIRED_PLAYERS && (
				<div className="text-xs text-zinc-600">{`(min. ${MIN_REQUIRED_PLAYERS} players required)`}</div>
			)}
		</>
	) : (
		<div className="text-zinc-500 m-4">Wait for admin to start...</div>
	);
};
