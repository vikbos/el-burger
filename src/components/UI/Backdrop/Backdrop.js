import React from 'react';
import classes from './Backdrop.module.css';

export default (props) => (
  props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
)
