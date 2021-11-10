import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messenger from "./pages/Messenger";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route exact path="/messenger" element={<Messenger />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
