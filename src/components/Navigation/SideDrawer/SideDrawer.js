import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

export default (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if(props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }
  return(
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Div}>
          <span className="fas fa-times-circle" onClick={props.closed}></span>
        </div>
        <Logo height="12%"/>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </Aux>
  )
}
