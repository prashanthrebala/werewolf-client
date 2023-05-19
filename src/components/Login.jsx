import React from "react";
import {
	Box,
	Button,
	Grid,
	Typography,
	Paper,
	FormGroup,
	TextField,
} from "@mui/material";
import { io } from "socket.io-client";

export const Login = ({ setConnection }) => {
	const players = ["Talon", "Andy", "Kimi", "Duke", "Viking", "Prometheus"];
	const roomCodeRef = React.useRef();
	const nameRef = React.useRef();

	const createRoom = (playerName) => {
		console.log(playerName);
		const newConnection = io("http://192.168.1.129:5000", { playerName });
		newConnection.emit("join-room", { playerName });
		console.log("Create Room", newConnection);
		setConnection(newConnection);
	};

	const joinRoom = (playerName, roomCode) => {
		const newConnection = io("http://192.168.1.129:5000", {
			playerName,
			roomCode,
		});
		console.log("Join Room", newConnection);
		setConnection(newConnection);
	};

	return (
		<Grid
			container
			className="min-h-screen w-screen bg-slate-100 flex justify-center items-center"
			p={4}
			direction={"column"}
		>
			<form className="w-full">
				<FormGroup
					sx={{ width: "100%" }}
					className="flex justify-center items-center"
				>
					<TextField
						className="w-3/4"
						id="player-name"
						label="Enter your name"
						variant="outlined"
						inputRef={nameRef}
					/>
					<Button
						className="w-3/4"
						variant="contained"
						sx={{ margin: 5 }}
						onClick={() => createRoom(nameRef.current.value)}
					>
						Create New Game
					</Button>
					<TextField
						className="w-3/4"
						id="input-room"
						inputProps={{ maxLength: 4 }}
						label="Enter existing Room ID"
						variant="outlined"
						inputRef={roomCodeRef}
					/>
					<Button
						type="submit"
						className="w-3/4"
						variant="contained"
						sx={{ margin: 5 }}
						onClick={() =>
							joinRoom(nameRef.current.value, roomCodeRef.current.value)
						}
					>
						Join Room
					</Button>
				</FormGroup>
			</form>
		</Grid>
	);
};
