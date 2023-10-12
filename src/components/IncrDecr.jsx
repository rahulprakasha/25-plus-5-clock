import React, { useContext } from 'react';
import { TimerContext } from './App';
import { keys } from './../constants';

export const IncrDecr = (props) => {
  const { type } = props;
  const { breakCount, sessionCount, setCount } = useContext(TimerContext);
  let count = (type === keys.BREAK) ? breakCount : sessionCount;
  const changeCount = (action) => {
    if(action === keys.INCR) {
      if(count < 60) {
        setCount(type, count + 1);
      }
    } else  {
      if(count > 1) {
        setCount(type, count - 1);
      }
    } 
  }
  return(<div class="increment-decrement">
    <button id={`${props.type}-decrement`} class="arrow" onClick={(e) => changeCount(keys.DECR)}>
      <i class="fa fa-arrow-down fa-lg" aria-hidden="true"></i>
    </button>
    <span class="count" id={`${props.type}-length`}>{count}</span>
    <button id={`${props.type}-increment`} class="arrow" onClick={(e) => changeCount(keys.INCR)}>
      <i class="fa fa-arrow-up fa-lg" aria-hidden="true"></i>
    </button>
  </div>)
}