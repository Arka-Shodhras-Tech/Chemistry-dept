import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HackthonRoutes } from "../hackathon/routers/hackthonroutes.js";
import './App.css';
import { RoutesofASTeam } from "./allroutes/allroutes.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<RoutesofASTeam />} />
          <Route path="/hackthon/*" element={<HackthonRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
