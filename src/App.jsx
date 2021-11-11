import { Routes, Route, HashRouter } from "react-router-dom";
import Messenger from "./pages/Messenger";
import { useEffect } from "react";
import { socket } from "./socket";
import axios from "axios";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";

function App() {
	useEffect(() => {
		socket.connect();
		(async () => {
			const test = await axios.get(`${process.env.REACT_APP_SERVER_URL}/test`);
			console.log(test);
		})();
		socket.emit("addUser", { user_id: localStorage.getItem("pet") });

		return () => {
			socket.disconnect();
		};
	}, []);
	return (
		<div className="App">
			<HashRouter basename="/">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/messenger" element={<Messenger />} />
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
