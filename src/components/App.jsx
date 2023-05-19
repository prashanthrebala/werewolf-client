import { Layout } from "./Layout";
import { Login } from "./Login";
import { PlayerList } from "./PlayerList";
import React from "react";

function App() {
	const [connection, setConnection] = React.useState(null);
	return connection == null ? (
		<Login setConnection={setConnection} />
	) : (
		<PlayerList socket={connection} />
	);
}

export default App;
