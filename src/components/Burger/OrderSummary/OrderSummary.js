import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'

export default class OrderSummary extends React.Component {
  //this could be a functional component
  componentDidUpdate() {
  //  console.log('OrderSummary did update')
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your order</h3>
        <p>Delicious burger with the following ingredients</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total price: {this.props.price.toFixed(2)}$</strong></p>
        <p>Continue to checkout ?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    )
  }
}
