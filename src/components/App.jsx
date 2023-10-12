import React, { useState } from 'react';
import { keys } from './../constants';
import {CountDisplay} from './CountDisplay';
import {Settings} from './Settings';
import {Timer} from './Timer';

export const TimerContext = React.createContext();

export const App = () => {
  const [sessionCount, setSession] = useState(keys.DEFAULT_SESSION);
  const [breakCount, setBreak] = useState(keys.DEFAULT_BREAK);
  const [status, setStatus] = useState(keys.PAUSE);
  const setCount = (type, count) => {
    type === keys.SESSION ? setSession(count) : setBreak(count);
  }
  const setReset = () => {
    setSession(keys.DEFAULT_SESSION);
    setBreak(keys.DEFAULT_BREAK);
    setStatus(keys.RESET);
  }
  return (<TimerContext.Provider value={{breakCount, sessionCount, setCount, status, setStatus, setReset}}>
    <main> 
      <div id="top-section">
        <CountDisplay type={keys.BREAK} />
        <CountDisplay type={keys.SESSION} />
      </div>
      <div id="middle-section">
        <Timer />
        <Settings />
      </div>
    </main>
   </TimerContext.Provider>);
}