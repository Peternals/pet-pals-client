import { Routes, Route, HashRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Step2 from "./pages/Step2";
import Step3Owner from "./pages/Step3Owner";
import Step3Carer from "./pages/Step3Carer";
import Step4 from "./pages/Step4";
import Step5 from "./pages/Step5";
import Messenger from "./pages/Messenger";
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
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/step2" element={<Step2 />} />
          <Route exact path="/step3/owner" element={<Step3Owner />} />
          <Route exact path="/step3/carer" element={<Step3Carer />} />
          <Route exact path="/step4" element={<Step4 />} />
          <Route exact path="/step5" element={<Step5 />} />
          <Route path="/messenger" element={<Messenger />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
