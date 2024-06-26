import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Actions } from '../actions/actions.js';
import { BootcampRoutes } from "../bootcamp/routers/bootcamproutes.js";
import { ProblemStatements } from '../hackathon/problemstatements/problemstatements.js';
import { HackthonDayRoute } from '../hackathon/router/hacthonroute.js';
import { TeamLoginForm } from '../hackathon/teams/teamlogin.js';
import { socket } from '../socket.js';
import './App.css';
import { LandingRoute } from './allroutes/landingroute.js';
function App() {
  const [start, setStart] = useState(true);
  const [team, setTeam] = useState(false)
  const [load, setLoad] = useState(false)
  const teamcode = useSelector((state) => state.user?.Teamcode)
  const teamname = useSelector((state) => state.user?.Teamname)

  const checkTeam = async (teamcode) => {
    await Actions.CheckTeam(teamcode)
      .then((res) => {
        if (res?.data?.data?.Password === teamname) {
          setTeam(true)
        }
      })
      .catch((e) => console.log(e))
  }

  const CheckHackathon = async (name) => {
    await Actions.checkHacthon(name)
      .then((res) => {
        setStart(res?.data)
        setLoad(true)
      })
      .catch((e) => console.log(e))
  }

  useEffect(()=>{
    checkTeam(teamcode)
    CheckHackathon("hackathon@gmail.com")
  },[team,start])

  return (
    <>
      {load ? <BrowserRouter>
        <Routes>
          <Route path="/*" element={start.start ? <HackthonDayRoute socket={socket}/> : <LandingRoute />} />
          <Route path="/bootcamp/*" element={start?.start ? <HackthonDayRoute  socket={socket}/> : <BootcampRoutes data={start?.data}/>} />
          <Route path='/problemstatements' element={team?<ProblemStatements />:<TeamLoginForm/>} />
        </Routes>
      </BrowserRouter> :
        <div className='ast'>AST TEAM</div>}
    </>
  );
}
export default App;
