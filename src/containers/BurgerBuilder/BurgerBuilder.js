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
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push(`price=${this.state.totalPrice}`)
    // const queryString = queryParams.join('&');
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

  // addIngredientHandler = (type) => {
  //   console.log(type);
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = updatedCount
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = priceAddition + oldPrice;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  //   this.updatePurchaseState(updatedIngredients);
  // }
  //
  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if(oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = updatedCount
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  //   this.updatePurchaseState(updatedIngredients);
  // }

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
