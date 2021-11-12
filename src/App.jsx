import { Routes, Route, HashRouter } from "react-router-dom";
import Messenger from "./pages/Messenger";
import { useEffect } from "react";
import { socket } from "./socket";
import axios from "axios";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import PetInfo from "./components/owners/PetInfo";
import Request from "./components/owners/Request";

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
					<Route path="/" element={<Home />}>
						<Route exact path="/" element={<PetInfo />} />
						<Route exact path="/requests" element={<Request />} />
					</Route>
					<Route path="/messenger" element={<Messenger />} />
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
