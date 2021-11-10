import { Routes, Route, BrowserRouter } from "react-router-dom";
import Messenger from "./pages/Messenger";
import { useEffect } from "react";
import { socket } from "./socket";
import axios from "axios";

function App() {
	useEffect(() => {
		socket.connect();
		(async () => {
			const test = await axios.get("http://localhost:4000/test");
			console.log(test);
		})();
		socket.emit("addUser", { user_id: localStorage.getItem("pet") });

		return () => {
			socket.disconnect();
		};
	}, []);
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/messenger" element={<Messenger />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
