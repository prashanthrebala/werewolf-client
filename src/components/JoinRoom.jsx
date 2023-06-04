import React from "react";
import { TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const JoinRoom = ({ roomCodeRef, joinRoom }) => {
	const [roomCode, setRoomCode] = React.useState("");
	const [isRoomCodeSelected, setIsRoomCodeSelected] = React.useState(false);

	const handleRoomCodeChanegEvent = (event) => {
		const input = event.target.value;
		const sanitizedInput = input.replace(/[^a-zA-Z]/g, "").toUpperCase();
		const truncatedInput = sanitizedInput.slice(0, 4);
		setRoomCode(truncatedInput);
	};

	return (
		<TextField
			id="standard-name"
			className="h-12 w-3/4"
			inputRef={roomCodeRef}
			onChange={handleRoomCodeChanegEvent}
			value={roomCode}
			onFocus={() => {
				setIsRoomCodeSelected(true);
				roomCodeRef.current.scrollIntoView();
			}}
			onBlur={() => {
				setIsRoomCodeSelected(false);
			}}
			{...{ label: isRoomCodeSelected ? "Enter a Room Code" : "" }}
			placeholder="Join a room"
			sx={{ m: 3 }}
			inputProps={{ style: { textAlign: "center" } }}
			InputProps={{
				endAdornment: (
					<SendIcon
						color="primary"
						onClick={() => joinRoom(roomCodeRef.current.value)}
					/>
				),
			}}
		/>
	);
};
