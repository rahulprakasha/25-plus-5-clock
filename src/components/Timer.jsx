import React, { useState, useContext, useEffect } from 'react';
import {TimerContext} from './App';
import { keys, messages } from './../constants';
import accurateInterval from 'accurate-interval';

export const Timer = () => {
  const { status, sessionCount, breakCount } = useContext(TimerContext);
  const [ intervalId, setIntervalId ] = useState();
  const [timer, setTimer] = useState(sessionCount + ":00");
  let messageIndex = 0;
  const clockify = (count) => {
    let min = Math.trunc(count / 60);
    let sec = count % 60;
    if(min === 0) {
      document.getElementById("time-left").style.color = "red";
    }
    setTimer(stringifyTime(min) + ":" + stringifyTime(sec));  
    displayMessage();
  }
  const switchTimer = () => {
    const type = document.getElementById("timer-label").innerHTML;
    document.getElementById("time-left").style.color = "black";
    let label, min;
    if(type === capitalizeString(keys.SESSION)) {
      label = capitalizeString(keys.BREAK);
      min = stringifyTime(breakCount);
    } else {
      label = capitalizeString(keys.SESSION);
      min = stringifyTime(sessionCount);
    }
    document.getElementById("timer-label").innerHTML = label;
    setTimer(min + ":00");
    return min + ":00";
  }
  const stringifyTime = (time) => {
    return (time < 10 ? "0" : "") + time;
  }
  const startTimer = (timer) => {
    let time = timer.split(":");
    let timeLength = parseInt(time[0]) * 60 + parseInt(time[1]);
    let id = accurateInterval(() => clockify(timeLength--), 1000);
    setIntervalId(id);
    setTimeout(() => {
      id.clear();
      document.getElementById("beep").play();
      startTimer(switchTimer());
    }, timeLength * 1000);
  }
  const displayMessage = () => {
    if(document.getElementById("timer-label").innerHTML === capitalizeString(keys.SESSION)) {
      if(messageIndex === messages.length) {
        messageIndex = 0;
      }
      document.getElementById("message").innerHTML = messages[messageIndex];
      ++messageIndex;
    } else {
      document.getElementById("message").innerHTML = "";
    }
  }
  useEffect(() => {
    if(status === keys.PLAY) {
      startTimer(timer);
    } else {     
      if(intervalId !== undefined) {
        intervalId.clear();  
        document.getElementById("message").innerHTML = "";
      }
      if(status === keys.RESET) {
        setTimer(keys.DEFAULT_SESSION + ":00");
        let aud = document.getElementById("beep");
        aud.pause();
        aud.currentTime = 0;
      }
    }
  }, [status]);
  useEffect(() => {
    document.getElementById("timer-label").innerHTML = capitalizeString(keys.SESSION);
  },[]);
  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  useEffect(() => {
    let min;
    if(document.getElementById("timer-label").innerHTML === capitalizeString(keys.SESSION))
      min = sessionCount;
    else
      min = breakCount;
    setTimer(stringifyTime(min) + ":00");
  }, [sessionCount, breakCount]);
  return(
    <div id="timer-content">
      <h3 id="timer-label"></h3>
      <quote id="message"></quote>
      <span id="time-left">{timer}</span>
      <audio id="beep" src="https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" />
    </div>);
}