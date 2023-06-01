import React from "react";

export const StartGameButton = ({ isAdmin, playerCount, socket }) => {
	return isAdmin ? (
		<>
			<button
				className={`py-2 px-3 rounded-md mt-4 mb-2 ${
					playerCount >= 3
						? "bg-green-700 text-zinc-300"
						: "bg-gray-900 text-zinc-700"
				}`}
				disabled={playerCount < 3}
				onClick={() => {
					socket.emit("startGame");
				}}
			>
				Start Game
			</button>
			{playerCount < 3 && (
				<div className="text-xs text-zinc-600">(min. 3 players required)</div>
			)}
		</>
	) : (
		<div className="text-zinc-500 m-4">Wait for admin to start...</div>
	);
};
