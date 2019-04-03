import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

export default (props) => {
  let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      //console.log(`array index ${i} of ${igKey}`);
      return <BurgerIngredient key={igKey + i} type={igKey} />
    })
  })
  .reduce((arr, el) => {
    return arr.concat(el)
  }, [])
  if(transformedIngredients.length === 0) {
    transformedIngredients = <p>Start adding ingredients</p>
  }
  console.log('transformedIngredients', transformedIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}
