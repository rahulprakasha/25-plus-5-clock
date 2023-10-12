import React, { useContext } from 'react';
import { TimerContext } from './App';
import { keys } from './../constants';

export const Settings = () => {
  const { setStatus, status, setReset } = useContext(TimerContext);
  const handleStatus = () => {
    status === keys.PLAY ? 
      setStatus(keys.PAUSE) : setStatus(keys.PLAY);
  }
  const handleReset = () => {
    setReset();
  }
  return (<div id="settings">
      <div id="start_stop">
        <span onClick={() => handleStatus()}>
          <i class="fa fa-play" aria-hidden="true"></i>
           <i class="fa fa-pause" aria-hidden="true"></i>
         </span>
      </div>
      <div id="reset" onClick={() => handleReset()}>
        <i class="fa fa-refresh" aria-hidden="true"></i>
      </div>
  </div>);
}