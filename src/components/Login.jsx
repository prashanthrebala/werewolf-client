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
import SendIcon from "@mui/icons-material/Send";

export const Login = ({ setId, setRoomCode }) => {
	const roomCodeRef = React.useRef();
	const nameRef = React.useRef();

	const [isRoomCodeSelected, setIsRoomCodeSelected] = React.useState(false);

	const createRoom = () => {
		fetch(`http://192.168.1.129:5000/createroom`)
			.then((response) => response.json())
			.then((data) => {
				setId(nameRef.current.value);
				setRoomCode(data.roomCode);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const joinRoom = (roomCode) => {
		fetch(
			`http://192.168.1.129:5000/checkroom?roomCode=${roomCode.toUpperCase()}`
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.exists) {
					setId(nameRef.current.value);
					setRoomCode(roomCode);
					console.log("Room exists");
				} else {
					alert("Room doesn't exist");
					console.log("Room does not exist");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
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
						id="standard-name"
						inputRef={nameRef}
						placeholder="Enter your name"
						className="h-12 w-3/4"
						sx={{ m: 3 }}
						inputProps={{ style: { textAlign: "center" } }}
					/>
					<TextField
						id="standard-name"
						className="h-12 w-3/4"
						inputRef={roomCodeRef}
						onFocus={() => {
							// setIsRoomCodeSelected(true);
							// nameRef.current.scrollIntoView();
						}}
						{...{ label: isRoomCodeSelected ? "Enter a Room Code" : "" }}
						placeholder="Join a room"
						sx={{ m: 3 }}
						inputProps={{ style: { textAlign: "center" } }}
						InputProps={{
							endAdornment: (
								<SendIcon
									color="primary"
									onClick={
										// () => alert("hello")
										() => joinRoom(roomCodeRef.current.value)
									}
								/>
							),
						}}
					/>
					{/* <TextField
						inputProps={{ style: { textAlign: "center" } }}
						className="w-3/4"
						id="player-name"
						label="Enter your name"
						variant="outlined"
						inputRef={nameRef}
					/> */}
					<Button
						className="h-12 w-3/4"
						variant="contained"
						sx={{ m: 3 }}
						onClick={() => createRoom(nameRef.current.value)}
					>
						Create New Game
					</Button>
				</FormGroup>
			</form>
		</Grid>
	);
};
