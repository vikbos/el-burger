import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css';

export default (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={burgerLogo} alt="burgr" />
  </div>
)
