import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import axios from '../../axios-orders';


export class BurgerBuilder extends React.Component {

  state = {
    purchasing: false,
  }

  componentDidMount() {
    //console.log(this.props);
    this.props.onInitIngredients()
  }

  purchaseHandler = () => {
    if(this.props.isAuthenticated) {
      this.setState({purchasing: true})
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }

  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout');
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    })
    .reduce((sum, el) => {
      return sum + el
    }, 0);
    return sum > 0;
  }

  resetIngredient = (type) => {
    const ingredients = {
      ...this.state.ingredients
    }
    ingredients[type] = 0;
    this.setState({ingredients: ingredients})
    this.updatePurchaseState(ingredients);
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    //{salad: true, meat: false, ...}

    let orderSummary = null

     let burger = this.props.error ? <p>Application cannot be loaded</p> : <Spinner />
     if(this.props.ings) {
       burger = (
        <Aux>
         <Burger ingredients={this.props.ings} />
         <BuildControls
           ingredientAdded={this.props.onIngredientAdded}
           ingredientRemoved={this.props.onIngredientRemoved}
           disabled={disabledInfo}
           purchasable={this.updatePurchaseState(this.props.ings)}
           ordered={this.purchaseHandler}
           price={this.props.price}
           isAuth={this.props.isAuthenticated}
           reset={this.props.onResetIngredient}/>
         </Aux>
       );
       orderSummary = <OrderSummary
        ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.price}/>
     }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path)),
    onResetIngredient: (ingName) => dispatch(actionCreators.resetIngredient(ingName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
