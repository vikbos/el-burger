import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

export default (props) => (
  <li className={classes.NavigationItem}>
    <NavLink
    to={props.link}
    exact={props.exact}
    activeClassName={classes.active}
    >
      {props.children}
    </NavLink>
  </li>
)
