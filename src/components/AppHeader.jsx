import React from "react";

export const AppHeader = ({ roomCode, playerName }) => {
	return (
		<div className="h-16 bg-slate-900 flex justify-center items-center text-neutral-100">
			<div className="h-full w-1/6 overflow-hidden" />
			<div className="h-full w-2/3 flex justify-center items-center text-2xl font-semibold">
				{roomCode}
			</div>
			<div className="h-full w-1/6 overflow-hidden text-xs flex justify-center items-center">
				{playerName}
			</div>
		</div>
	);
};
