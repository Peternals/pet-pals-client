import { Routes, Route, HashRouter } from "react-router-dom";
import Messenger from "./pages/Messenger";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
	useEffect(() => {}, []);
	return (
		<div className="App">
			<HashRouter>
				<Routes>
					<Route path="/messenger" element={<Messenger />} />
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
