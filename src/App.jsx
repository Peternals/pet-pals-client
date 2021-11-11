import { Routes, Route, HashRouter } from "react-router-dom";
import Messenger from "./pages/Messenger";
import Carer from "./pages/Carer";
import { useEffect } from "react";
import { socket } from "./socket";
import axios from "axios";

function App() {
	useEffect(() => {
		socket.connect();
		(async () => {
			const test = await axios.get(`${process.env.REACT_APP_SERVER_URL}/test`);
			console.log(test);
		})();

		return () => {
			socket.disconnect();
		};
	}, []);
	return (
		
		<div className="App">
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
				integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
				crossorigin="anonymous"
			/>
			<HashRouter>
				<Routes>
					<Route path="/messenger" element={<Messenger />} />
					<Route path="/carer" element={<Carer />} />
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
