import { Routes, Route, HashRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Step2 from "./pages/Step2";
import Step3Owner from "./pages/Step3Owner";
import Step3Carer from "./pages/Step3Carer";
import Step4 from "./pages/Step4";
import Step5 from "./pages/Step5";
import Complete from "./pages/Complete";
import Messenger from "./pages/Messenger";
import { useEffect } from "react";
import { socket } from "./socket";
import axios from "axios";
import Pet from "./pages/Pet";
import Questionnaire from "./pages/Questionnaire";
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
					<Route exact path="/signin" element={<SignIn />} />
					<Route exact path="/signup" element={<SignUp />} />
					<Route exact path="/step2" element={<Step2 />} />
					<Route exact path="/step3/owner" element={<Step3Owner />} />
					<Route exact path="/step3/carer" element={<Step3Carer />} />
					<Route exact path="/step4" element={<Step4 />} />
					<Route exact path="/step5" element={<Step5 />} />
					<Route exact path="/complete" element={<Complete />} />
					<Route path="/messenger" element={<Messenger />} />
					{/* <Route path="/carer" element={<Carer />} /> */}
					<Route path="/pet/:id" element={<Pet />} />
					<Route path="/questionnaire" element={<Questionnaire />} />
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
