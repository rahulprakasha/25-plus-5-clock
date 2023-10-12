import React from 'react';
import {IncrDecr} from './IncrDecr';

export const CountDisplay = (props) => {
  const { type } = props;
  return (<div id={type} class="count-display"> 
      <h3 id={`${type}-label`}>{type.charAt(0).toUpperCase() + type.slice(1)} Length</h3>
      <IncrDecr type={type}/>
  </div>);
}