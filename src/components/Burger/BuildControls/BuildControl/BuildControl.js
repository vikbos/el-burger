import React from 'react';
import classes from './BuildControl.module.css'

export default (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled}><span className="fas fa-minus"></span></button>
    <button
     className={classes.More}
     onClick={props.added}><span className="fas fa-plus"></span></button>
    <button disabled={props.disabled}
     onClick={props.reset}
     className={classes.ResetButton}>
      <span className="fas fa-sync-alt"></span>
    </button>
  </div>
)
