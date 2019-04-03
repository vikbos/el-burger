import * as actionTypes from './constants';
import axios from '../../axios-orders';

export const addIngredient = (type) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: type
  }
}

export const removeIngredient = (type) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: type
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://el-burger.firebaseio.com/ingredients.json')
    .then(response => {
      dispatch(setIngredients(response.data))
    })
    .catch(error => {
      dispatch(fetchIngredientsFailed())
    })
  }
}

export const resetIngredient = (type) => {
  return {
    type: actionTypes.RESET_INGREDIENT,
    ingredientName: type
  }
}
